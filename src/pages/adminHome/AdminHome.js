import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './AdminHome.module.scss';
import axios from 'axios';
import AdminNavbar from '../../components/adminhome/AdminNavbar';
import FacilModal from '../../components/adminhome/FacilModal';
import GLModal from '../../components/adminhome/GLModal';
import Leaderboard from '../../components/leaderboard/Leaderboard';
const AdminHome = () => {
    const navigate = useNavigate()
    const [text,setText] = useState("Response text appears here")
    const [rawResults,setRawResults] = useState([])
    const [results,setResults] = useState([])
    const [openMenu,setOpenMenu] = useState(false);
    const [curPage,setCurPage] = useState('admin');
    const [openFacilModal,setOpenFacilModal] = useState(false);

    const [openGLModal,setOpenGLModal] = useState(false);
    const host=process.env.REACT_APP_BACKEND
    const headers={headers:
    {
        'Authorization':localStorage.getItem('admin_token')
    }}
    useEffect(()=>{
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

    const deleteAllUsers = ()=>{
        setText('Deleting all users...')
        axios.post(host+'/admin/delete_all_users',{},headers)
        .then(response => {
            console.log(response.data)
            toast.success('Deleted all users');
            setText('All users deleted')
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    const deleteEverything = ()=>{
        setText('Deleting users and games...')
        axios.post(host+'/admin/delete_all_data',{},headers)
        .then(response => {
            console.log(response.data)
            toast.success('Deleted users and games');
            setText('Users and games deleted')
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    

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
            setText("")
            setRawResults(response.data)
            setResults([])
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
            setText("")
            setResults(response.data)
            setRawResults([])
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

  return (
    <div className={style.Holder}>
        <AdminNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} curPage={curPage} setCurPage={setCurPage}/>
        {
            openFacilModal &&
            <FacilModal setOpenFacilModal={setOpenFacilModal}/>
        }
        {
            openGLModal &&
            <GLModal setOpenGLModal={setOpenGLModal}/>
        }
        {
            curPage==='admin' &&
        
        <div className={style.Center}>
            <h1 className={style.Header}>Functions</h1>
            <div className = {style.GridHold}>

            <div className = {style.Button} onClick={()=>{setOpenGLModal(true)}}>Register GLs</div>
            <div className = {style.Button} onClick={()=>{setOpenFacilModal(true)}}>Register Facilitator</div>
            <div className = {style.Button} onClick={deleteEverything}>Delete Users and Games</div>
            <div className = {style.Button} onClick={deleteAllUsers}>Delete all users</div>
            <div className = {style.Button} onClick={resetAllPoints}>Reset all points</div>
            <div className = {style.Button} onClick={getRawPoints}>Print all house raw points</div>
            <div className = {style.Button} onClick={getGodsAcquired}>Print all house gods acquired</div>
            </div>
            <h3>{text}</h3>
            {rawResults.length>0 && <h2>Raw Points:</h2>}
            {
                rawResults.map((result)=>{
                    return <div className={style.RawResultCard}>
                    <h5>House Name:{result.house_name}</h5>
                    <h5>God Points:</h5>
                    {
                        Object.entries(result.god_points).map((god)=>{
                            return <h5>{god[0]}:{god[1]}</h5>
                        })
                    }
                    </div>
                })
            }
            {results.length>0 && <h2>Rank Score:</h2>}
            {
                results.map((result)=>{
                    return <div className={style.ResultCard}>
                    <h5>Rank:{result.rank}</h5>
                    <h5>House Name:{result.house_name}</h5>
                    <h5>Gods:{JSON.stringify(result.gods)}</h5>
                    <h5>Ally Count:{result.ally_count}</h5>
                    </div>
                })
            }
        </div>
}{
    curPage==='leaderboard' && 
    <Leaderboard/>
}
        
        <img className={style.Backdrop} src={"https://plus.unsplash.com/premium_photo-1706838707667-9e3f75233938?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}/>
    </div>
  )
}

export default AdminHome