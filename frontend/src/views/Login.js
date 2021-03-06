import React, { useState } from "react";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to update the value of an input
  const updateData = event => {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  }

  // Function to attempt to log the current user in
  const attemptLogin = async event => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password
    }

    const settings = {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials:"include"
    }

    const response = await fetch(process.env.REACT_APP_SERVER_URL + "/login", settings);
    const parsedRes = await response.json();

    try {
      // If the request was successful
      if (response.ok) {
        const now = new Date();
        

        props.login(parsedRes.token, parsedRes.id ) 
      } else {
        throw new Error(parsedRes.message);
      }
    } catch (err) {
      alert(err.message)
      setUsername("");
      setPassword("");
    }
  }

  // Function to update the "showLogin" state variable in App.js
  const updateShowLogin = () => {
    props.setShowLogin(false);
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={attemptLogin}>
        <div>
          <label>Username</label>
          <input name="username" onChange={updateData} value={username} />
        </div>
        <div>
          <label>Password</label>
          <input name="password" onChange={updateData} value={password} />
        </div>

        <button>Sign In</button>
      </form>

      <button onClick={updateShowLogin}>Not registered yet? Register for an account!</button>
    </div>
  )
}

export default Login;