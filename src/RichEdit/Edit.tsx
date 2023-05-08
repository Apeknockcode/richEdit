import React from 'react'

import RichEdit from './RichEdit'
function EditContain() {
  const contain: React.CSSProperties = {
    width: '80vw',
    margin: '0 auto',
    background: '#F7F7F7',
  }

  const mainContain: React.CSSProperties = {
    width: '100%',
    height: 'auto',
    background: '#F7F7F7',
    boxSizing: 'border-box',
  }
  return (
    <div style={contain}>
      <div style={mainContain}>
        <RichEdit />
      </div>
    </div>
  )
}
export default EditContain
