import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { IoMdSwap } from "react-icons/io"

import TemtemTypeSelector from "../components/temtem-type-selector"
import TypeMatchup from "../components/type-matchup"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allTypesJson {
        edges {
          node {
            name
            effective
            ineffective
            image
          }
        }
      }
    }
  `)

  const [damageDirection, setDamageDirection] = React.useState("defence")
  const [selectedTypes, setSelectedTypes] = React.useState({
    first: "Neutral",
    second: undefined,
  })

  return (
    <Layout>
      <SEO title="Home" />
      <div className="container mx-auto text-gray-900 flex flex-wrap">
        <div className="w-full lg:w-1/2 px-8">
          <TemtemTypeSelector
            dataEdges={data.allTypesJson.edges}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            damageDirection={damageDirection}
          />
        </div>
        <div className="w-full lg:w-1/2 px-8">
          <div className="flex items-center mb-2">
            <h2 className="w-20 font-bold text-xl">
              {damageDirection === "offence" ? "Offence" : "Defence"}
            </h2>
            <button
              className="ml-4 p-1 px-4 text-gray-700 shadow rounded flex items-center bg-gray-100 hover:bg-gray-200"
              type="button"
              onClick={() =>
                setDamageDirection(
                  damageDirection === "offence" ? "defence" : "offence"
                )
              }
            >
              <div className="text-gray-600 mr-2">
                <IoMdSwap />
              </div>
              Swap
            </button>
          </div>
          <TypeMatchup
            dataEdges={data.allTypesJson.edges}
            selectedTypes={selectedTypes}
            damageDirection={damageDirection}
          />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
