import React from 'react'
import { PacmanLoader } from 'react-spinners'

const override = {
  display: 'flex',
  height: '100vh',
  borderColor: '#36d7b7',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
}

const Loading = ({ loading }) => {
  return (
    <div style={override}>
      <PacmanLoader color="#36d7b7" loading={loading} size={25} margin={2} />
    </div>
  )
}

export default Loading
