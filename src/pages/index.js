import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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

  const [selectedTypes, setSelectedTypes] = React.useState({
    first: "Neutral",
    second: undefined,
  })

  return (
    <Layout>
      <SEO title="Home" />
      <div className="container mx-auto text-gray-900 flex">
        <div className="w-1/2 px-4">
          <TemtemTypeSelector
            dataEdges={data.allTypesJson.edges}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
          />
        </div>
        <div className="w-1/2 px-4">
          <TypeMatchup
            dataEdges={data.allTypesJson.edges}
            selectedTypes={selectedTypes}
          />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
