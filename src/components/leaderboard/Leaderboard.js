import axios from 'axios'
import React, { useEffect } from 'react'

const Leaderboard = () => {
    const host=process.env.REACT_APP_BACKEND
    const [teamNames, setTeamNames] = React.useState([])
    const [teamPoints,setTeamPoints] = React.useState({})


    useEffect(()=>{
        axios.get(host+'/team/get_all_team_names').then(response => {
            const teamNamesTemp = []
            response.data.forEach(team => {
                teamNamesTemp.push(team)
            })
            setTeamNames(teamNamesTemp)
        })
    },[])

    useEffect(()=>{
        // .get("/gm/get_all_games",
        // .get(path = "/team/get_all_team_names",
        if (teamNames.length===0){
            return
        }
        const team_names = []
        axios.get(host+'/team/get_all_team_names').then(response => {
            response.data.forEach(team => {
                team_names.push(team)
            })
        })
        const team_points = {}
        axios.get(host+'/gm/get_all_games').then(response => {
            response.data.forEach(game => {
                if (game.points_given){
                    Object.keys(game.points_given).forEach(team => {
                        if (team_points[team]){
                            team_points[team] += game.points_given[team]
                        }
                        else{
                            team_points[team] = game.points_given[team]
                        }
                    });
                }
            })
            teamNames.forEach(team => {
                if (!team_points[team]){
                    team_points[team] = 0
                }
            })
            console.log(teamNames)
            console.log(team_points)
            setTeamPoints(team_points)
            // setTeamNames(sortedTeamPoints)
        })
        
        
    },[teamNames])
  return (
    <div className='fixed w-full h-full flex flex-col justify-center items-center'>
        <div className='bg-slate-400 h-96 w-96 rounded'>
            <h1 className='w-full text-center text-2xl'>Leaderboard - games</h1>
            {
                Object.keys(teamPoints).sort((a,b) => teamPoints[b]-teamPoints[a]).map((teamName) => {
                    return (
                        <div className='bg-slate-300 text-xl rounded cursor-pointer p-4 select-none'>{teamName} : {teamPoints[teamName]}</div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Leaderboard