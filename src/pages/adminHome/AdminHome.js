import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './AdminHome.module.scss';
import axios from 'axios';
const AdminHome = () => {
    const navigate = useNavigate()
    const [text,setText] = useState("Response text appears here")
    const host=process.env.REACT_APP_BACKEND
    const headers={headers:
    {
        'Authorization':localStorage.getItem('token')
    }}
    useEffect(()=>{
        const token=localStorage.getItem('token')
        axios.get(host+'/admin/check_token', headers)
    .then(response => {
        console.log(response.data.message);
    })
    .catch(error => {
        toast.error('Invalid or expired token')
        navigate('/admin')
        console.error('There was an error!', error);
    });
    
    },[])

    const resetAllPoints = ()=>{
        setText('Resetting all points...')
        axios.post(host+'/admin/reset_all_points',{},headers)
        .then(response => {
            console.log(response.data)
            toast.success('Reset all points');
            setText('All points reset')
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    const getRawPoints = ()=>{
        axios.post(host+'/admin/house_raw_points',{},headers)
        .then(response => {
            console.log(response.data)
            toast.success('Print all house raw points');
            const dataString = JSON.stringify(response.data)
            setText(dataString)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    const getGodsAcquired = ()=>{
        axios.post(host+'/admin/god_allegiance',{},headers)
        .then(response => {
            console.log(response.data)
            toast.success('Print all house gods acquired');
            // make object into string
            const dataString = JSON.stringify(response.data)
            setText(dataString)
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

  return (
    <div className={style.Holder}>
        <div className={style.Center}>
            <h1 className={style.Header}>Functions</h1>
            <div className = {style.GridHold}>
            <div className = {style.Button} onClick={resetAllPoints}>Reset all points</div>
            <div className = {style.Button} onClick={getRawPoints}>Print all house raw points</div>
            <div className = {style.Button} onClick={getGodsAcquired}>Print all house gods acquired</div>
            </div>
            <h5>{text}</h5>
        </div>
        
        <img className={style.Backdrop} src={"https://plus.unsplash.com/premium_photo-1706838707667-9e3f75233938?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
    </div>
  )
}

export default AdminHome