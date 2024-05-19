import React from 'react'
import GLForm from './GLForm'

const GLModal = ({setOpenGLModal}) => {
  return (
    <div className='fixed  w-screen h-screen justify-center items-center flex z-[60]'>
        
        <GLForm/>
        <div className='w-full h-full absolute top-0 left-0 bg-black opacity-90 ' onClick={()=>{setOpenGLModal(false)}}></div>

    </div>
  )
}

export default GLModal