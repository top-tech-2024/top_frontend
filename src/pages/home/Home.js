import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './Home.module.scss';
import axios from 'axios';

const Home = () => {
    const [godFound,setGodFound] = useState([])
    const navigate = useNavigate()
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
    <div className={style.Holder}>
        <div className={style.Center}>
            <h1 className={style.Header}>completed</h1>
            <h5 className={style.SubHeader}>Scan QR codes and find the 12 gods with your team</h5>
            <div className = {style.GridHold}>
            {godFound.map((god) => {
                return <h1>{god}</h1>
            })}
            </div>
        </div>
        <img className={style.Backdrop} src={"https://plus.unsplash.com/premium_photo-1706838707667-9e3f75233938?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
    </div>
  )
}

export default Home