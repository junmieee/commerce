import { useState } from 'react'

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelectOption = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '200px',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
    >
      <span>{options.find((option) => option.value === value)?.label}</span>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1,
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              style={{
                padding: '8px',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectOption(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
