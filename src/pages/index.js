import React from "react"
import { Link } from "gatsby"
import queryString from "query-string"

import TemtemTypeSelector from "../components/temtem-type-selector"
import TypeMatchup from "../components/type-matchup"
import Layout from "../components/layout"
import AttackDirectionButton from "../components/attack-direction-button"
import GlobalStateContext from "../context/GlobalStateContext"
import { attackDirection as attackDirectionEnum } from "../constants"

const IndexPage = () => {
  const { typeDictionary } = React.useContext(GlobalStateContext)
  const [attackDirection, setDamageDirection] = React.useState(
    attackDirectionEnum.DEFENCE
  )
  const [selectedTypes, setSelectedTypes] = React.useState({
    first: "Neutral",
    second: undefined,
  })

  React.useEffect(() => {
    const { primary, secondary } = queryString.parse(window.location.search)

    if (!typeDictionary[primary]) {
      return
    }

    setDamageDirection(attackDirectionEnum.DEFENCE)
    setSelectedTypes({
      first: primary,
      second: secondary,
    })
  }, [typeDictionary])

  return (
    <Layout>
      <div className="container mx-auto text-gray-900 flex flex-wrap">
        <div className="w-full flex justify-center mt-2 mb-8 px-4">
          <div className="flex rounded-lg shadow">
            <AttackDirectionButton
              additionalClasses="rounded-l-lg"
              attackDirection={attackDirection}
              variant={attackDirectionEnum.OFFENCE}
              onClick={() => setDamageDirection(attackDirectionEnum.OFFENCE)}
            />
            <AttackDirectionButton
              additionalClasses="rounded-r-lg"
              attackDirection={attackDirection}
              variant={attackDirectionEnum.DEFENCE}
              onClick={() => setDamageDirection(attackDirectionEnum.DEFENCE)}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <TemtemTypeSelector
            typeDictionary={typeDictionary}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            attackDirection={attackDirection}
          />
        </div>
        <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
          <TypeMatchup
            selectedTypes={selectedTypes}
            attackDirection={attackDirection}
          />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
