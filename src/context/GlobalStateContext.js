import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const GlobalStateContext = React.createContext({
  typeDictionary: {},
})

export const GlobalStateProvider = ({ children }) => {
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

  const typeDictionary = React.useMemo(() => {
    return data.allTypesJson.edges.reduce((dict, item) => {
      return { ...dict, [item.node.name]: item.node }
    }, {})
  }, [data.allTypesJson.edges])

  return (
    <GlobalStateContext.Provider
      value={{
        typeDictionary,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateContext
