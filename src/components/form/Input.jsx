import React from 'react'

export default function Input({sound,setSound}) {
  return (
    <>
      <input className='input-field'
        onChange={(e)=>setSound(e.target.value)}
      />
    </>
  )
}
