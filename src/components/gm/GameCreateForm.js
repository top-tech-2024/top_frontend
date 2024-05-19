import React, { useEffect } from 'react'
import style from '../adminform/AdminForm.module.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const GameCreateForm = ({handleCreate}) => {
    const [gameName, setGameName] = React.useState('');
    const host=process.env.REACT_APP_BACKEND

    const handleRegisterSubmit = (event) => {
        const headers = {
            headers:
            {
                'Authorization':localStorage.getItem('gm_token')
            }
        }
        event.preventDefault(); 
        const payload = {
            game_name: gameName,
            game_type: "teamGame",
            facilitators: [],
            points_given: {},
            booked: null
        }
        axios.post(host+'/gm/create_game', payload,headers).then((res) => {
            handleCreate(gameName);
            console.log(res.data);
            toast.success('Game Created Successful!');
            // refresh page
        }).catch((err) => {
            console.log(err.response.data.message);
            toast.error('Game Creation Failed!');
        }
        )
    }


  return (
    <div className={` ${style.Holder} fixed  h-80 w-4 bg-white flex items-center justify-center z-[80]`}>
        
        <div className={style.Form}>
            <h1>Game registration</h1>
            <form id='loginForm' onSubmit={e=>{e.preventDefault()}}>
                <div className={style.Input}>
                    <div htmlFor="gameName"className={style.InputLabel}>Game Name: </div>
                    <input type="text" id="gameName" name="gameName" placeholder="gameName" className={style.InputBox} value={gameName} onChange={e=>setGameName(e.target.value)}/>
                </div>
                <div className={style.Submit} onClick={handleRegisterSubmit}>
                    Register
                </div>
            </form>
        </div>
        <div className={style.Backdrop}/>
    </div>
  )
}

export default GameCreateForm;