import React from 'react'
import { IconFilter } from '@tabler/icons-react'
import { useState } from 'react'

const CustomSelect: React.FC<{
  value: string | null
  onChange: (value: string | null) => void
  data: { label: string; value: string }[]
}> = ({ value, onChange, data }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const handleOptionClick = (itemValue: string) => {
    setDropdownOpen(false)
    onChange(itemValue)
  }

  return (
    <div className="relative flex">
      {/* <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 pr-8 border rounded-full text-gray-700 bg-gray-200	 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent "
      >
        {data.map((item) => (
          <option key={item.value} value={item.value} className='bg-black	'>
            {item.label}
          </option>
        ))}
      </select> */}
      <button
        onClick={handleButtonClick}
        id="states-button"
        data-dropdown-toggle="dropdown-states"
        className=" flex-shrink-0 z-10 inline-flex items-center py-2 px-2 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 "
        type="button"
      >
        <p>All Filters</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 20l-3 1v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v3"></path>
          <path d="M16 19h6"></path>
          <path d="M19 16v6"></path>
        </svg>
      </button>
      {isDropdownOpen && (
        <div
          id="dropdown-states"
          className="z-10 absolute right-0 mt-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          {data.map((item) => (
            // <option key={item.value} value={item.value} className='bg-black	'>
            //   {item.label}
            // </option>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="states-button"
              key={item.value}
            >
              <li>
                <button
                  onClick={() => handleOptionClick(item.value)}
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="inline-flex items-center">{item.label}</div>
                </button>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect
