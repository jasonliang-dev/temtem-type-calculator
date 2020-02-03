import React from "react"
import queryString from "query-string"
import { GiBroadsword, GiBorderedShield } from "react-icons/gi"

import TemtemTypeSelector from "../components/temtem-type-selector"
import TypeMatchup from "../components/type-matchup"
import Layout from "../components/layout"
import AttackDirectionButton from "../components/attack-direction-button"
import GlobalStateContext from "../context/GlobalStateContext"
import { attackDirection as attackDirectionEnum } from "../constants"

const TypeSelected = ({ typeDictionary, name }) => (
  <div className="flex items-center">
    {typeDictionary[name] && (
      <img
        className="w-12 h-12"
        alt=""
        src={`/images/types/${typeDictionary[name].image}`}
      />
    )}
    <div className="text-3xl font-bold ml-2">{name}</div>
  </div>
)

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
    <Layout location="/">
      <div className="container mx-auto text-gray-900 flex flex-wrap">
        <div className="w-full flex flex-wrap justify-center mt-4 mb-8 px-4">
          <AttackDirectionButton
            onClick={() => setDamageDirection(attackDirectionEnum.OFFENCE)}
            mask="button-mask-1"
            variant={
              attackDirection === attackDirectionEnum.OFFENCE ? "selected" : ""
            }
          >
            <GiBroadsword />
            <span className="ml-4">Offence</span>
          </AttackDirectionButton>
          <AttackDirectionButton
            onClick={() => setDamageDirection(attackDirectionEnum.DEFENCE)}
            mask="button-mask-2"
            variant={
              attackDirection === attackDirectionEnum.DEFENCE ? "selected" : ""
            }
          >
            <GiBorderedShield />
            <span className="ml-4">Defence</span>
          </AttackDirectionButton>
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
          <div className="flex justify-center mb-6">
            <TypeSelected
              typeDictionary={typeDictionary}
              name={selectedTypes.first}
            />
            {attackDirection === attackDirectionEnum.DEFENCE &&
              selectedTypes.second && (
                <div className="flex items-center">
                  <span className="text-3xl mx-4">+</span>
                  <TypeSelected
                    typeDictionary={typeDictionary}
                    name={selectedTypes.second}
                  />
                </div>
              )}
          </div>
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
