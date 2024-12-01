/* eslint-disable no-unused-vars */
import React, { useState } from "react"

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

const SearchBar = ({
  placeholder = "Rechercher...",
  onSearch,
}: {
  placeholder?: string
  onSearch?: (value: string) => void
}) => {
  const [searchValue, setSearchValue] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue)
    }
  }

  return (
    <div className="flex items-center w-full max-w-lg bg-white shadow rounded-md overflow-hidden md:text-lg text-sm">
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="text-white sm:px-4 py-2 flex items-center transition duration-200 ease-in-out"
      >
        <SearchIcon className="md:h-5 h-3 md:w-5 w-3 sm:mr-0 mr-2" />
      </button>
    </div>
  )
}

export default SearchBar
