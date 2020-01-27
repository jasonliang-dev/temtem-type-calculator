import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import queryString from "query-string"
import * as R from "ramda"

import GlobalStateContext from "../context/GlobalStateContext"

const TemtemSpecies = ({ searchValue }) => {
  const data = useStaticQuery(graphql`
    {
      allSpeciesJson {
        edges {
          node {
            name
            image
            primaryType
            secondaryType
          }
        }
      }
    }
  `)

  const { typeDictionary } = React.useContext(GlobalStateContext)
  const typeIconClasses =
    "bg-white rounded-full shadow border-2 border-gray-600 w-6 h-6 lg:w-8 lg:h-8"

  return data.allSpeciesJson.edges
    .filter(
      R.compose(
        R.startsWith(searchValue.toLowerCase()),
        R.toLower,
        R.path(["node", "name"])
      )
    )
    .map(({ node }) => (
      <Link
        key={node.name}
        className="group flex flex-col items-center m-2 md:m-4"
        to={`/?${queryString.stringify({
          primary: node.primaryType,
          secondary: node.secondaryType,
        })}`}
      >
        <img
          className="rounded-full border-4 lg:border-8 border-gray-200 group-hover:border-gray-500 shadow-lg w-20 h-20 lg:w-32 lg:h-32"
          alt=""
          src={`/images/species/${node.image}`}
        />
        {typeDictionary[node.primaryType] && (
          <div className="flex -mt-4 lg:-mt-6 -mb-2 ml-0 lg:ml-auto">
            <img
              className={typeIconClasses}
              alt={node.primaryType}
              src={`/images/types/${typeDictionary[node.primaryType].image}`}
            />
            {typeDictionary[node.secondaryType] && (
              <img
                className={`${typeIconClasses} ml-1`}
                alt={node.secondaryType}
                src={`/images/types/${
                  typeDictionary[node.secondaryType].image
                }`}
              />
            )}
          </div>
        )}
        <div className="md:text-lg font-bold mt-2">{node.name}</div>
      </Link>
    ))
}

export default TemtemSpecies
