import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import queryString from "query-string"
import * as R from "ramda"

import temtemBorder from "../assets/temtem-border-1.svg"
import temtemSelect from "../assets/temtem-border-1-select.svg"
import GlobalStateContext from "../context/GlobalStateContext"
import styles from "./temtem-species.module.css"

const TemtemSpeciesTypeIcon = ({ typeName }) => {
  const { typeDictionary } = React.useContext(GlobalStateContext)

  return (
    <div
      className={`rounded border-2 md:border-4 border-tem-dark-gray bg-gray-200
        ${styles["temtem-species-type"]}
      `}
    >
      <img
        className={`w-6 h-6 lg:w-8 lg:h-8 temtem-species-type__icon
          ${styles["temtem-species-type__icon"]}
        `}
        alt={typeName}
        src={`/images/types/${typeDictionary[typeName].image}`}
      />
    </div>
  )
}

TemtemSpeciesTypeIcon.propTypes = {
  typeName: PropTypes.string.isRequired,
}

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
  const shouldShowSpecies = React.useCallback(
    R.o(R.startsWith(searchValue.toLowerCase()), R.toLower),
    [searchValue]
  )

  return data.allSpeciesJson.edges.map(({ node }) => (
    <Link
      key={node.name}
      className={`text-center m-2 md:m-4
        ${styles["temtem-species"]}
        ${shouldShowSpecies(node.name) ? "" : "hidden"}
      `}
      to={`/?${queryString.stringify({
        primary: node.primaryType,
        secondary: node.secondaryType,
      })}`}
    >
      <div className="relative">
        <div className="absolute z-30 inset-x-0 flex justify-center md:justify-end -mt-2">
          {typeDictionary[node.primaryType] && (
            <TemtemSpeciesTypeIcon typeName={node.primaryType} />
          )}
          {typeDictionary[node.secondaryType] && (
            <TemtemSpeciesTypeIcon typeName={node.secondaryType} />
          )}
        </div>
        <img className="absolute z-20" alt="" src={temtemBorder} />
        <img
          className={`absolute z-0 ${styles["temtem-species__select-background"]}`}
          alt=""
          src={temtemSelect}
        />
        <div
          className={`bg-tem-dark-blue
            ${styles["temtem-species__inner-background"]}
          `}
        >
          <img
            className="lazyload relative z-10 w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"
            alt=""
            data-src={`/images/species/${node.image}`}
          />
        </div>
      </div>
      <div className="md:text-lg lg:text-xl font-bold mt-2">{node.name}</div>
    </Link>
  ))
}

export default TemtemSpecies
