import React, { useEffect } from 'react'
import style from './AdminForm.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AdminForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const host=process.env.REACT_APP_BACKEND

    let navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault(); 
        const payload = {
            username: username,
            password: password
        }
        toast.info('Logging in...');
        axios.post(host+'/admin/login', payload).then((res) => {
            localStorage.setItem('token', 'Bearer ' + res.data.token);
            console.log(res.data);
            toast.success('Login Successful!');
            navigate('/admin_home')
        }).catch((err) => {
            toast.error('Login Failed!');
            console.log(err.response.data.message);
        }
        )
    }


  return (
    <div className={style.Holder}>
        
        <div className={style.Form}>
            <h1>Admin Login</h1>
            <form id='loginForm' onSubmit={e=>{e.preventDefault()}}>
                <div className={style.Input}>
                    <div htmlFor="username"className={style.InputLabel}>Username: </div>
                    <input type="text" id="usernmae" name="username" placeholder="Username" className={style.InputBox} value={username} onChange={e=>setUsername(e.target.value)}/>
                </div>
                <div className={style.Input}>
                    <div htmlFor="password"className={style.InputLabel}>Password: </div>
                    <input type="password" id="password" name="password" placeholder="Password" className={style.InputBox} value={password} onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div className={style.Submit} onClick={handleSubmit}>
                    Submit
                </div>
            </form>
        </div>
        <div className={style.Backdrop}/>
    </div>
  )
}

export default AdminForm;