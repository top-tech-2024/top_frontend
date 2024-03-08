import React, { useEffect, useRef, useState } from 'react'
import style from './GodRoom.module.scss'
import { toast } from 'react-toastify'
import { VscDebugStart } from 'react-icons/vsc'
import { FaExchangeAlt } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import CountdownCircle from '../../components/countdown/Countdown'

const GodRoom = () => {
    const navigate = useNavigate()
    const [notStarted,setNotStarted] = useState(false);
    const [messages, setMessages] = useState([
        
    ])

    const [choices, setChoices] = useState([
    ])
    const [roomImage,setRoomImage] = useState('')
    
    const [roomToken,setRoomToken] = useState(null)
    const [done,setDone] = useState(false);
    const [showResult,setShowResult] = useState(false)
    const [result,setResult] = useState({
        1:1,
        2:2
    })
    const [connectCount,setConnectCount] = useState(0)
    const [timeLeft,setTimeLeft] = useState(0)
    const [totalTime,setTotalTime] = useState(15000)
    const ws = useRef(null);
    const ws_host=process.env.REACT_APP_WS_BACKEND
    const host=process.env.REACT_APP_BACKEND
    const headers={headers:
    {
        'Authorization':localStorage.getItem('token')
    }}
    

    useEffect(()=>{
        const token=localStorage.getItem('token')
        axiosInstance.get(host+'/user/check_token', headers)
    .then(response => {
        console.log(response.data.message);
    })
    .catch(error => {
        toast.error('Invalid or expired token')
        navigate('/')
        console.error('There was an error!', error);
    });
    },[])

    useEffect(()=>{
      const pathname = window.location.hash;
      const parts = pathname.split('/'); 
      const cipherText=parts.pop() || '';
      console.log(parts)
        const payload={
          cipher_text:cipherText
        }
        const get_token = async () => {
          try{
            const response = await axiosInstance.post(host+'/talk/get_token',payload,{headers:{
              'Authorization':localStorage.getItem('token')
          }})
          if (response.status === 200) {
            setRoomToken('Bearer ' + response.data.token);
            console.log(response.data)
            setRoomImage(response.data.room_image)
            console.log('Success: Room token set')
          }
        }
        catch (error) {
          toast.error('Invalid or expired token')
        }
    
      }
      get_token()
      },[])

      useEffect(()=>{
        if (roomToken===null) return
        try {
          ws.current = new WebSocket(ws_host+`/talk/connect/?room_token=${roomToken}`);
          ws.current.onopen = () => {
              console.log("Connected to WebSocket");
                sendPing()
          };
          ws.current.onmessage = (event) => {
              const data = JSON.parse(event.data);
              if (data.type==='pong' || data.type=='start_room'){
                setNotStarted(false);
                    setConnectCount(data.user_count);
                    setTotalTime(data.total_time);
                    setMessages(data.history);
                    setChoices(data.choices);
                    if (data.status==='done') setDone(true);
                    else setDone(false);
            }
            else if (data.type ==='room_not_started'){
              setConnectCount(data.user_count);
              setNotStarted(true);
            }
            else if (data.type==='show_vote'){
                setConnectCount(data.user_count);
                setResult(data.choice_count);
                setShowResult(true);
                setTimeout(()=>{
                    setMessages(data.history.splice(0,data.history.length-1));
                    setChoices([]);
                    setShowResult(false);
                },1000)
                
                console.log(data.choice_count)
            }
            else if(data.type==='user_update'){
                setConnectCount(data.user_count);
            }
            else if (data.type==='next_room'){
              const next_room = data.next_room;
              if (data.next_room === 'home') navigate('/home');
              else navigate('/god_room/'+next_room);
              // force page refresh

              ws.current.close();
              window.location.reload();
            }
              if ('time_left' in data) setTimeLeft(data.time_left); 
                console.log(data)
          };
    
          ws.current.onerror = (error) => {
              console.error("WebSocket Error: ", error);
          };
    
          ws.current.onclose = () => {
            toast.error('WebSocket connection closed')
    
          };
    
          return () => {
            if (ws.current) {
              ws.current.close();
              ws.current = null;
            }
          };
      } catch (error) {
          console.error("Error connecting to WebSocket: ", error);
      }
      },[roomToken])

      useEffect(()=>{

        if (!ws.current && ws.current?.readyState !== WebSocket.OPEN) {
            console.log('bug')
            return;
        }
      },[ws.current])

      //function that sends a message after timeleft
      const sendPing = async () => {
        const payload = {
            type: 'ping',
            stage:Math.floor(messages.length/2)
        };
        sendMessage(payload);
        };

      const sendMessage = (message) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(message));
        } else {
          console.error("WebSocket is not open.");
        }
      };
    
    
    const switchState = async () => {
        navigate('/aphrodite_disguised')
    }
  return (
    <div className={style.Holder}>
        <CountdownCircle milliseconds={timeLeft} totalTime={totalTime} sendPing={sendPing} setChoices={{}}/>
        <h2 className={style.UserCount}>Users:{connectCount}</h2>
        <div className={style.ConversationHolder}>
            <div className={style.ConversationBackdrop}/>
            {messages.map((message, index) => {
                return (
                    <div key={index} className={`${style.Message} ${style[message.role]}`}>
                        
                        <div >{message.message}</div>
                    </div>
                )
            })}
            
        </div>
        <div className={style.ChoiceHolder}>
        {choices.map((choice, index) => {
                return (
                    <div key={index} className={style.Choice}>
                    {showResult && <div className={style.ResultCircle}>{result[choice.choice_key]||0}</div>}
                        <div className={style.ChoiceText} onClick={e=>{sendMessage({
                            type:'choice',
                            choice:choice.choice_key,
                            stage:Math.floor(messages.length/2)
                        })}}>{choice.description}</div>
                    </div>
                )
            })}
            </div>
            {done===true && <div className={style.Restart} onClick={e=>{
                sendMessage({
                    type:'next_room'
                })

            }}>
            <VscDebugStart  color='white' size={28} />
            </div>}
            {notStarted===true && <div className={style.Restart} onClick={e=>{
              if (connectCount>1)sendMessage({
                    type:'start_room'
                })

            }}>
            <VscDebugStart  color='white' size={28} />
            </div>}
        <img className={style.Backdrop} src={roomImage}/>
    </div>
  )
}

export default GodRoom