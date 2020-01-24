import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const TemtemTypeImage = ({ src }) => {
  const data = useStaticQuery(graphql`
    query TemtemTypeImageQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return null
}

TemtemTypeImage.propTypes = {
  src: PropTypes.string.isRequired,
}

export default TemtemTypeImage
