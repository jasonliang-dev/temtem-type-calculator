/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import { FaGithub } from "react-icons/fa"

import SEO from "./seo"
import styles from "./layout.module.css"

const navLinkLocations = {
  "Type Calculator": "/",
  "All Species": "/species",
}

const Layout = ({ location, children }) => {
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
          <div className="bg-tem-dark-gray pt-4 pb-2 px-8">
            <div className="container mx-auto flex flex-wrap items-center">
              <div className="w-full md:w-1/2 mb-2 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-100 text-center md:text-left">
                  <Link to="/">{data.site.siteMetadata.title}</Link>
                </h1>
              </div>
              <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                {Object.entries(navLinkLocations).map(([name, link]) => (
                  <Link
                    className={`mx-3 border-b-2 border-transparent
                    ${
                      location === link
                        ? "text-gray-200 border-gray-400 hover:border-gray-300"
                        : "text-gray-400 hover:border-gray-600"
                    }
                  `}
                    to={link}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className={`bg-tem-dark-gray ${styles["hr-img"]}`} />
        </header>
        <main className="pt-4">{children}</main>
      </div>
      <footer className="bg-tem-dark-gray text-gray-100 text-sm">
        <div
          className={`bg-white ${styles["hr-img"]} ${styles["hr-shifted"]}`}
        />
        <div className="container mx-auto py-12 px-12">
          <p>Temtem names, images, and icons &copy; 2020 Crema.</p>
          <p>This site is not affiliated with Crema.</p>
          <div className="mt-6">
            <a
              className="text-gray-500 hover:text-gray-200 inline-flex items-center"
              href="https://github.com/jasonliang-dev/temtem-type-calculator"
            >
              <div className="text-2xl mr-2">
                <FaGithub aria-label="GitHub" />
              </div>
              View source
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

Layout.propTypes = {
  location: PropTypes.oneOf(["/", "/species", "*"]).isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
