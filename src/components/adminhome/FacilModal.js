import React from 'react'
import FacilForm from './FacilForm'

const FacilModal = ({setOpenFacilModal}) => {
  return (
    <div className='fixed  w-screen h-screen justify-center items-center flex z-[60]'>
        
        <FacilForm/>
        <div className='w-full h-full absolute top-0 left-0 bg-black opacity-90 ' onClick={()=>{setOpenFacilModal(false)}}></div>

    </div>
  )
}

export default FacilModal