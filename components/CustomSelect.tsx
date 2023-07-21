import React from 'react'
import { IconFilter } from '@tabler/icons-react'

const CustomSelect: React.FC<{
  value: string | null
  onChange: (value: string | null) => void
  data: { label: string; value: string }[]
}> = ({ value, onChange, data }) => {
  return (
    <div className="relative">
      {/* <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 pr-8 border rounded-full text-gray-700 bg-gray-200	 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent "
      >
        <IconFilter />
        {data.map((item) => (
          <option key={item.value} value={item.value} className='bg-black	'>
            {item.label}
          </option>
        ))}
      </select> */}
    </div>
  )
}

export default CustomSelect
