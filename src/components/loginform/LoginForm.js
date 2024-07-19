import React, { useEffect } from "react";
import style from "./LoginForm.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [teamNames, setTeamNames] = React.useState([]); //['Hercules', 'Perceus', 'Zagreus'
  const [team, setTeam] = React.useState("");
  const host = process.env.REACT_APP_BACKEND;

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(host + "/team/get_all_team_names")
      .then((res) => {
        // sort res.data then set
        res.data.sort();
        console.log(res.data);
        setTeamNames(res.data);
        setTeam(res.data[0]);
      })
      .catch((err) => {
        toast.error("Failed to get team names");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username: username,
      password: password,
      team_name: team,
    };
    toast.info("Logging in...");
    axios
      .post(host + "/user/login", payload)
      .then((res) => {
        localStorage.setItem("token", "Bearer " + res.data.token);
        console.log(res.data);
        toast.success("Login Successful!");
        navigate("/home");
      })
      .catch((err) => {
        toast.error("Login Failed!");
      });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const payload = {
      username: username,
      password: password,
      team_name: team,
    };
    axios
      .post(host + "/user/register", payload)
      .then((res) => {
        console.log(res.data);
        toast.success("Registration Successful!");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error("Registration Failed!");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(host + "/user/check_token", headers)
      .then((response) => {
        console.log(response.data.message);
        navigate("/home");
      })
      .catch((error) => {
        console.log("Invalid or expired token");
      });
  }, []);

  return (
    <div className={style.Holder}>
      <div className={style.Form}>
        <h1>Login</h1>
        <form
          id="loginForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={style.Input}>
            <div htmlFor="username" className={style.InputLabel}>
              Username:{" "}
            </div>
            <input
              type="text"
              id="usernmae"
              name="username"
              placeholder="Username"
              className={style.InputBox}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={style.Input}>
            <div htmlFor="password" className={style.InputLabel}>
              Password:{" "}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={style.InputBox}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={style.Input}>
            <div htmlFor="team" className={style.InputLabel}>
              Team:{" "}
            </div>
            <select
              id="team"
              name="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className={style.InputBox}
            >
              {teamNames.map((team, index) => {
                return (
                  <option key={index} value={team}>
                    {team}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={style.Submit} onClick={handleSubmit}>
            Submit
          </div>
        </form>
      </div>
      <div className={style.Backdrop} />
    </div>
  );
};

export default LoginForm;
