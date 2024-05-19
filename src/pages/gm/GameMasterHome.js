import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreateGameModal from '../../components/gm/CreateGameModal'
import AwardModal from '../../components/gm/AwardModal'
import GMNavbar from '../../components/gm/GameMasterNavbar'

const GameMasterHome = () => {

    const ws = useRef(null);
    const navigate = useNavigate()
    const [gameCreated,setGameCreated] = React.useState(null)
    const [games,setGames] = React.useState([{}])
    const [openGameCreateForm,setOpenGameCreateForm] = React.useState(false)
    const [openAwardForm,setOpenAwardForm] = useState(false)
    const [openMenu,setOpenMenu] = React.useState(false)
    const [curPage,setCurPage] = React.useState('home')
    const [teamBooked,setTeamBooked] = React.useState(null) 
    const ws_host = process.env.REACT_APP_WS_BACKEND
    const host=process.env.REACT_APP_BACKEND
    const headers={headers:
    {
        'Authorization':localStorage.getItem('gm_token')
    }}

    useEffect(()=>{
        axios.get(host+'/gm/check_token', headers)
    .then(response => {
        console.log(response.data.message);
    })
    .catch(error => {
        toast.error('Invalid or expired token')
        navigate('/gm')
        console.error('There was an error!', error);
    });
    },[])

    useEffect(()=>{
        axios.get(host+'/gm/get_my_games', headers).then(response => {
            console.log(response.data[0])
            if (response.data.length!==0){
            setGameCreated(response.data[0])
            }
        })
        .catch(error => {
            toast.error('Invalid or expired token')
        });
    },[])

    const handleGameDelete = (event) => {
        
        const headers = {
            headers:
            {
                'Authorization':localStorage.getItem('gm_token')
            }
        }
        event.preventDefault(); 
        //.delete("/gm/delete_game/{game_name}", tags=["Game"])
        axios.delete(host+'/gm/delete_game/'+gameCreated.game_name, headers).then((res) => {
            console.log(res.data);
            toast.success('Game Deleted Successfully!');
            //refresh page
            sendMessage({
                type:'gm_delete_game',
                data:{
                    game_name:gameCreated.game_name
                }
            })
            window.location.reload();
        }).catch((err) => {
            console.log(err.response.data.message);
            toast.error('Game Deletion Failed!');
        }
        )
    }


    useEffect(()=>{
        // websocket connection
        if (gameCreated===null){
            return
        }
        ws.current = new WebSocket(`${ws_host}/booking/connect/?room_token=${localStorage.getItem('gm_token')}&team_name=${encodeURIComponent(gameCreated.game_name)}`)
        ws.current.onopen = () => {
            console.log('connected')
            sendMessage({
                type: 'ping',
                data:{}
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
                let teamBooked = null
                let found = false
                Object.keys(bookingUpdate).forEach(element => {
                    newGames.push({...bookingUpdate[element],game_name:element})
                    if (gameCreated && gameCreated.game_name === element){
                        found = true
                        if (bookingUpdate[element].booked){
                            teamBooked = bookingUpdate[element].booked
                            
                        }
                    }
                });
                if (!found && gameCreated){
                    sendMessage({
                        type:'gm_create_game',
                        data:{
                            game_name:gameCreated.game_name
                        }
                    }) 
                }
                setTeamBooked(teamBooked)
                setGames(newGames)
            }
        }
        ws.current.onclose = () => {
            // connection closed. send to landing page
            // refresh page
            // window.location.reload()
            console.log('disconnected')

        }

        return () => {
            ws.current?.close()
        }
    },[gameCreated])

    const sendMessage = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(message));
        } else {
            //refresh page
            window.location.reload()
          console.error("WebSocket is not open.");
        }
      };
    const handleKick = () => {
        if (!teamBooked){
            return
        }
        sendMessage({
            type:'gm_kick',
            data:{
                team_name:teamBooked
            }
        })
    }

    const awardPoints = (points) => {
        if (!teamBooked){
            return
        }
        sendMessage({
            type:'gm_award_points',
            data:{
                team_name:teamBooked,
                points:points
            }
        })
    }
    const handleCreate =  (game_name) => {
        console.log('hello')
        sendMessage({
            type:'gm_create_game',
            data:{
                game_name:game_name
            }
        })

        // window.location.reload();
    }



  return (
    <div className='relative'>
        <GMNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} setCurPage={setCurPage}/>
        <div className='absolute w-screen h-screen flex flex-col justify-center items-center'>
            {openGameCreateForm && <CreateGameModal handleCreate={handleCreate} setOpenGameCreateForm={setOpenGameCreateForm}/>}
            
            {openAwardForm && <AwardModal awardPoints={awardPoints} teamBooked={teamBooked} gameCreated={gameCreated}  setOpenAwardForm={setOpenAwardForm}/>}
            {
                gameCreated===null?
                <div className='bg-green-400 rounded text-4xl p-4 text-white cursor-pointer select-none' onClick={()=>{setOpenGameCreateForm(true)}}>Create Game</div>
                :<><div className='bg-blue-400 text-black w-96 h-fit rounded-t text-5xl text-center capitalize p-4'>{gameCreated.game_name}</div>
                <div className='bg-blue-200 text-black w-96 h-fit rounded-b text-5xl text-center capitalize p-4'>
                    <div className={`bg-gray-200 p-4 text-center text-xl rounded ${!!teamBooked && 'bg-green-100 border-black border-2'}`}>Booked Team:{teamBooked}</div>
                    <div className={`text-xl rounded cursor-pointer py-4 mt-2  ${!!teamBooked?'bg-green-400':'bg-gray-400 '}`} onClick={()=>{setOpenAwardForm(!!teamBooked)}}>Award Points</div>
                    <div className={`bg-green-300 text-xl rounded cursor-pointer py-4 mt-2 ${!!teamBooked?'bg-red-400':'bg-gray-400 '}`} onClick={()=>{handleKick()}}>Kick Team</div>
                    <div className='bg-red-400 text-xl rounded cursor-pointer py-2 mt-4' onClick={handleGameDelete}>delete Game</div>
                </div>
                </>
            }

        </div>
        <img className='absolute h-screen w-screen brightness-50 -z-10' src="https://plus.unsplash.com/premium_photo-1713200810940-97c3b2fefefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    </div>
  )
}

export default GameMasterHome