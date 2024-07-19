import React, { useState } from "react";

const AwardModal = ({
  awardPoints,
  teamBooked,
  gameCreated,
  setOpenAwardForm,
}) => {
  const [teamNames, setTeamNames] = React.useState([teamBooked]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [openAwardTeamModal, setOpenAwardTeamModal] = useState(false);
  const host = process.env.REACT_APP_BACKEND;
  const headers = {
    headers: {
      Authorization: localStorage.getItem("gm_token"),
    },
  };
  return (
    <div className="fixed  w-screen h-screen justify-center items-center flex z-[60]">
      {openAwardTeamModal && (
        <AwardTeamModal
          awardPoints={awardPoints}
          gameCreated={gameCreated}
          setOpenAwardTeamModal={setOpenAwardTeamModal}
          teamName={selectedTeam}
        />
      )}
      <div className="z-20 bg-gray-200 rounded p-4">
        {teamNames.map((teamName) => {
          return (
            <div
              className="bg-orange-400 text-xl rounded cursor-pointer p-4 mt-2 select-none"
              onClick={() => {
                setOpenAwardTeamModal(true);
                setSelectedTeam(teamName);
              }}
            >
              {teamName}
            </div>
          );
        })}
      </div>
      <div
        className="w-full h-full absolute top-0 left-0 bg-black opacity-90 "
        onClick={() => {
          setOpenAwardForm(false);
        }}
      ></div>
    </div>
  );
};

export default AwardModal;

const AwardTeamModal = ({
  awardPoints,
  gameCreated,
  setOpenAwardTeamModal,
  teamName,
}) => {
  const [points, setPoints] = useState(0);
  const host = process.env.REACT_APP_BACKEND;
  const handleSave = () => {
    //.put("/gm/set_game_points/{game_name}/{points}/{entity_name}"
    awardPoints(points);
    // const headers = {
    //     headers:
    //     {
    //         'Authorization':localStorage.getItem('gm_token')
    //     }
    // }
    // const payload = {
    //     points: points,
    //     entity_name: teamName
    // }
    // axios.put(host+'/gm/set_game_points/'+gameCreated.game_name+'/'+points+'/'+teamName, payload,headers).then((res) => {
    //     console.log(res.data);
    //     toast.success('Points Awarded Successfully!');
    // }).catch((err) => {
    //     console.log(err.response.data.message);
    //     toast.error('Points Award Failed!');
    // }
    // )
  };
  return (
    <div className="fixed w-screen h-screen z-[70] flex flex-col justify-center items-center">
      <div className="z-20 bg-gray-200 rounded p-4 ">
        <h1>{teamName}</h1>
        <form
          id="loginForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <div htmlFor="number">Set Points: {points} </div>
            <input
              className="w-60"
              type="range"
              id="number"
              name="number"
              min="0"
              max="100"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>
        </form>
        <div
          className="bg-green-400 text-xl rounded cursor-pointer p-4 mt-2 text-center z-[80]"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </div>
      </div>

      <div
        className="w-full h-full absolute top-0 left-0 bg-black opacity-90 -z-10"
        onClick={() => {
          setOpenAwardTeamModal(false);
        }}
      ></div>
    </div>
  );
};
