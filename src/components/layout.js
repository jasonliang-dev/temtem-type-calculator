/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"

import SEO from "./seo"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <SEO title="Temtem Type Calculator" />
      <div className="min-h-screen">
        <header>
          <div className="flex items-center p-3 px-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link to="/">{data.site.siteMetadata.title}</Link>
            </h1>
            <Link className="ml-auto border-b-2 border-gray-400" to="/species">
              Species
            </Link>
          </div>
        </header>
        <main className="pt-4 pb-16">{children}</main>
      </div>
      <footer className="bg-gray-900 text-gray-100 text-sm">
        <div className="px-12 md:px-32 lg:px-64 py-8 md:py-16">
          <p>Temtem names and images &copy; 2020 Crema.</p>
          <p>This site is not affiliated with Crema.</p>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
