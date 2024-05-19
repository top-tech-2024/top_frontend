import React from 'react'

const GMNavbar = ({openMenu,setOpenMenu,setCurPage}) => {
    return (
        <div className='fixed left-0 top-0 z-50 flex flex-row-reverse  w-screen justify-start items-start'>
        <div className='absolute left-0 text-white flex flex-col z-50 overflow-hidden transition-all duration-500  ease-in-out grow-0 shrink-0'
        style={openMenu?
          {borderRadius:'0px',height:'100vh',width:'100vw'}:
          {borderRadius:'0px',height:'80px',width:'80px'}}
          >
            <div id="lines" className='absolute left-0 top-0 h-[80px] w-[80px] flex flex-col justify-center items-center'
            onClick={()=>{setOpenMenu(!openMenu)}}>
              <div className='absolute bg-white h-1 rounded-md w-8  transition-all duration-500  ease-in-out'
              style={openMenu?
                {transform:'rotate(-405deg)',top:'50%'}:
                {top:'40%'}
                }></div>
              <div className='absolute bg-white h-1 rounded-md w-8  transition-all duration-500  ease-in-out'
              style={openMenu?
                {transform:'rotate(405deg)',top:'50%'}:
                {top:'50%'}
                }></div>
              <div className='absolute bg-white h-1 rounded-md w-8  transition-all duration-500  ease-in-out'
              style={openMenu?
                {transform:'rotate(-405deg)',top:'50%'}:
                {top:'60%'}
                }></div>
    
            </div>
          
          <div id="content" className='flex flex-col w-screen h-screen h-full items-center justify-center'>
            <h1 id="title" className='text-6xl'>Menu</h1>
            {/* <MenuItem onClick={()=>{setCurPage('chats')}}>Chats</MenuItem>
            <MenuItem onClick={()=>{setCurPage('instructions')}}>Instructions</MenuItem>
            <MenuItem onClick={()=>{setCurPage('leaderboard')}}>Leaderboard</MenuItem> */}
            <div className='cursor-pointer bg-red-500 p-4 font-bold mt-8' onClick={()=>{
              localStorage.removeItem('gm_token')
              window.location.reload()
            }}>Logout</div>
          </div>
          <div id="background" className=' absolute bg-black w-full h-full opacity-80 -z-10'/>
        </div>
        </div>
      )
    }
    
    export default GMNavbar
    
    const MenuItem = ({children, onClick})=>{
      return (
        <div  className='text-2xl cursor-pointer my-4 bg-gray-200 w-52 text-black' onClick={onClick}>{children}</div>
      )
    }