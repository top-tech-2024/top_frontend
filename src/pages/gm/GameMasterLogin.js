import React from 'react'
import style from '../admin/Admin.module.scss';
import axios from 'axios'
import GameMasterForm from '../../components/gm/GameMasterForm'

const GameMasterLogin = () => {
    const [serverUp,setServerUp] = React.useState(false)
  React.useEffect(() => {
    const host = process.env.REACT_APP_BACKEND
    const checkServer = async () => {
      try {
        const response = await axios.get(host + '/')
        if (response.status === 200) {
          setServerUp(true)
          
        }
      } catch (error) {
        setServerUp(false)
        setTimeout(checkServer, 1000) 
      }
    }

    checkServer()
  }, [])
  return (
    <div className={style.Holder}>
      {serverUp===false && <div className={style.Loader}>
        <div className={style.LoadGroup}>
          <div className={style.Backdrop}/>
          <div className={style.DotGroup}>
          <div className={style.Dot}/>
          <div className={style.Dot}/>
          <div className={style.Dot}/>
          </div>
          <h3>Hang tight, waking up backend server</h3>
          <h3>(~2 minutes)</h3>
        </div>
      </div>}
        <GameMasterForm />
        <img className={style.Backdrop} src="https://plus.unsplash.com/premium_photo-1713200810940-97c3b2fefefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    </div>
  )
}

export default GameMasterLogin