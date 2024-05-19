import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import GLNavbar from '../../components/gl/GLNavbar'
import Leaderboard from '../../components/leaderboard/Leaderboard'

const GLHome = () => {
    const ws = useRef(null);
    const [games,setGames] = React.useState([{}])
    const [selectedGame,setSelectedGame] = React.useState(null)
    const [isDiconnected,setIsDisconnected] = React.useState(false)
    const [openMenu,setOpenMenu] = React.useState(false)
    const [curPage,setCurPage] = React.useState('booking')
    const team_name = localStorage.getItem('gl_team_name')
    const navigate = useNavigate()
    const ws_host = process.env.REACT_APP_WS_BACKEND
    const host=process.env.REACT_APP_BACKEND
    const headers={headers:
    {
        'Authorization':localStorage.getItem('gl_token')
    }}
    useEffect(()=>{
        axios.get(host+'/gl/check_token', headers)
    .then(response => {
        console.log(response.data.message);
    })
    .catch(error => {
        toast.error('Invalid or expired token')
        navigate('/gl')
        console.error('There was an error!', error);
    });
    
    },[])


    useEffect(()=>{
        // websocket connection
        ws.current = new WebSocket(`${ws_host}/booking/connect/?room_token=${localStorage.getItem('gl_token')}&team_name=${encodeURIComponent(localStorage.getItem('gl_team_name'))}`)
        ws.current.onopen = () => {
            console.log('connected')
            setIsDisconnected(false)
            sendMessage({
                type: 'ping',
                data: {}
            })
        }
        ws.current.onmessage = (e) => {
            const data = JSON.parse(e.data)
            console.log(data)
            if (data.type==='team_update'){
                console.log(data.data)
                const teamUpdate = data.data 
            }
            else if (data.type==='booking_update'){
                const bookingUpdate = data.data.bookings
                const newGames = []
                setSelectedGame(null)
                Object.keys(bookingUpdate).forEach(element => {
                    newGames.push({...bookingUpdate[element],game_name:element})
                    if (bookingUpdate[element].booked === team_name){
                        setSelectedGame(element)
                    }
                });
                setGames(newGames)
            }
        }
        ws.current.onclose = () => {
            // connection closed. send to landing page
            setIsDisconnected(true)
            // refresh page
            // window.location.reload()
            console.log('disconnected')
        }

        return () => {
            ws.current?.close()
        }
    },[])

    const sendMessage = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(message));
        } else {
            //refresh page
            window.location.reload()
          console.error("WebSocket is not open.");
        }
      };

    const handleBooking = (game) => {
        if (!game.points_given) return;
        if (Object.keys(game.points_given).includes(team_name)===true)return;
        sendMessage({
            type: 'booking_update',
            data: {
                game_name: game.game_name
            }
        })
    }

  return (
    <div className='fixed h-screen w-screen'>
        <GLNavbar curPage={curPage} openMenu={openMenu} setOpenMenu={setOpenMenu} setCurPage={setCurPage}/>
        {curPage==='booking' && <div className='absolute w-full h-full flex flex-col justify-center items-center'>
            <div className='w-96 h-fit rounded-md relative overflow-hidden p-4'>
                <div className='text-white text-center w-full z-20 text-2xl'>Book</div>
                <div className='flex flex-row w-full justify-between'>
                    <div className='px-2 select-none' style={{backgroundColor:'#50C878'}}>Yours</div>
                    <div className='px-2 text-white select-none' style={{backgroundColor:'black'}}>Others</div>
                    <div className='px-2 select-none' style={{backgroundColor:'white'}}>Vacant</div>
                    <div className='px-2 bg-gray-700 text-white select-none'>Scored</div>
                </div>
                <div className='grid grid-cols-2 p-4 gap-2 overflow-auto h-fit'>
                    {
                        games.map((game) => {
                            return (
                                <div className='w-full h-12 rounded h-12 text-center flex justify-center items-center select-none cursor-pointer'
                                style={{
                                    backgroundColor: game.points_given && Object.keys(game.points_given).includes(team_name)===true?'#374151':game.booked===team_name?'#50C878':game.booked===null?'white':'black',
                                    color:game.points_given && Object.keys(game.points_given).includes(team_name)===true?'white':game.booked===team_name?'black':game.booked===null?'black':'white'}}
                                onClick={()=>{handleBooking(game)}}>{game.game_name}</div>
                            )
                        })
                    }
                </div>

                <div className='absolute left-0 top-0 w-full h-full  bg-black opacity-50 rounded-md -z-10'/>
            </div>
        </div>}{
            curPage==='leaderboard' && <Leaderboard/>
        }
        <img className='absolute h-full w-full brightness-50 -z-20' src="https://plus.unsplash.com/premium_photo-1713029179473-1603c7e4e609?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    </div>
  )
}

export default GLHome