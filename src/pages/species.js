import React from "react"
import { IoMdSearch } from "react-icons/io"

import Layout from "../components/layout"
import TemtemSpecies from "../components/temtem-species"
import styles from "./species.module.css"

const SpeciesPage = () => {
  const [searchValue, setSearchValue] = React.useState("")

  return (
    <Layout location="/species">
      <div className="container overflow-x-hidden mx-auto md:px-4 text-gray-900">
        <div className="flex justify-center">
          <div className="relative mt-4 mb-12">
            <div
              className={`absolute bg-black opacity-25 inset-0 mt-1 ml-1
                ${styles["button-mask-3"]}
              `}
            />
            <div className={`bg-tem-dark-gray ${styles["button-mask-3"]}`}>
              <label
                htmlFor="species-search"
                className="flex items-center h-full"
              >
                <span className="text-2xl text-gray-100 px-2 mr-1">
                  <IoMdSearch aria-label="Search" />
                </span>
                <input
                  id="species-search"
                  className="bg-transparent text-gray-100 placeholder-gray-500 outline-none"
                  name="search"
                  type="text"
                  value={searchValue}
                  placeholder="Search by name"
                  onChange={evt => setSearchValue(evt.target.value)}
                  autoComplete="off"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <TemtemSpecies searchValue={searchValue} />
        </div>
      </div>
    </Layout>
  )
}

export default SpeciesPage
