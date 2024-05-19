import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './Home.module.scss';
import Navbar from '../../components/home/Navbar';
import Chats from '../chats/Chats';
import Leaderboard from '../../components/leaderboard/Leaderboard';

const Home = () => {
    const [openMenu,setOpenMenu] = useState(false);
    const [curPage,setCurPage] = useState('chats');
    
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
    

  return (
    <div className={style.Holder}>
        <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} curPage={curPage} setCurPage={setCurPage}/>
        {
            curPage==='chats'&&
            <Chats/>
        }
        {
            curPage==='leaderboard'&&
            <Leaderboard/>
        }
        <img className={style.Backdrop} src={"https://plus.unsplash.com/premium_photo-1706838707667-9e3f75233938?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
    </div>
  )
}

export default Home