import React, { useEffect, useState } from 'react'
import style from '../home/Home.module.scss';
import axios from 'axios';

const Chats = () => {
    const [godFound,setGodFound] = useState([])
    const host=process.env.REACT_APP_BACKEND
    const headers={headers:
    {
        'Authorization':localStorage.getItem('token')
    }}
    useEffect(()=>{
        axios.post(host+'/team/get_god_done',{},headers)
        .then(response => {
            console.log(response.data)
            setGodFound(response.data)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    },[])
  return (
    <>
        <div className={style.Center}>
            <h1 className={style.Header}>completed</h1>
            <h5 className={style.SubHeader}>Scan QR codes and find the 12 gods with your team</h5>
            <div className = {style.GridHold}>
            {godFound.map((god) => {
                return <>
                <h3 className={style.SpecialH3}>{god.god}<span className={`${style.SpecialSpan} ${god.status===true?style.Green:style.Red}`}>{god.status===true?'revealed':'failed'}</span></h3>
                

                </>
            })}
            </div>
        </div>
    </>
  )
}

export default Chats