import React from 'react'
import GameCreateForm from './GameCreateForm'

const CreateGameModal = ({handleCreate,setOpenGameCreateForm}) => {
  return (
    <div className='fixed  w-screen h-screen justify-center items-center flex z-[60]'>
        
        <GameCreateForm handleCreate={handleCreate}/>
        <div className='w-full h-full absolute top-0 left-0 bg-black opacity-90 ' onClick={()=>{setOpenGameCreateForm(false)}}></div>

    </div>
  )
}

export default CreateGameModal