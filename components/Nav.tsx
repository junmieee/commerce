import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

interface NavProps {
  isActive: boolean
  showNav: () => void
  isMember: string[]
  goToCart: () => void
}

const NavContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 33.33%;
  height: 100vh;
  background-color: #fff;
  z-index: 1000;
`

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const Nav: React.FC<NavProps> = ({ isActive, showNav, isMember, goToCart }) => {
  const navVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      variants={navVariants}
    >
      {isActive && (
        <NavContainer
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <CloseButton onClick={showNav}>X</CloseButton>
          {/* 메뉴 내용 */}
        </NavContainer>
      )}
    </motion.div>
  )
}

export default Nav
