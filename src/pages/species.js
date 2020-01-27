import React from "react"
import { IoMdSearch } from "react-icons/io"

import Layout from "../components/layout"
import TemtemSpecies from "../components/temtem-species"

const SpeciesPage = () => {
  const [searchValue, setSearchValue] = React.useState("")

  return (
    <Layout>
      <div className="container mx-auto text-gray-900">
        <div className="w-11/12 lg:w-2/5 mx-auto bg-white shadow rounded border border-gray-400 px-4 mb-4 flex items-center">
          <div className="text-2xl text-gray-500 mr-1">
            <IoMdSearch />
          </div>
          <input
            className="p-2 flex-grow text-gray-900"
            name="search"
            type="text"
            value={searchValue}
            onChange={evt => setSearchValue(evt.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-center">
          <TemtemSpecies searchValue={searchValue} />
        </div>
      </div>
    </Layout>
  )
}

export default SpeciesPage
