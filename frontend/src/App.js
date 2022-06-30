import React, { useEffect, useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import Albums from "./views/Albums";
import "./App.css";



const App = () => {
    
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ currentUserId, setCurrentUserId ] = useState("");
    const [ showLogin, setShowLogin ] = useState(true);
    const [token, setToken] = useState(false);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("data"));
        if (data && data.token && data.id && data.expiry){

            const tokenExpiry = new Date(data.expiry);
            const now = new Date()

            if(tokenExpiry > now){
                login(data.token, data.id);
            }else{
                logout()
            }


            login(data.token, data.id)
        }else{
            logout();
        }

    }, [])


    const login =(token, id)=>{
        setToken(token);
        setCurrentUserId(id);
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem("data")
        setToken(false);
        setCurrentUserId("");
        setIsLoggedIn(false);
        setShowLogin(true);
        
    }

    const deregister = async ()=>{
        //event.preventDefault();
    
    
        const settings = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
              },
            }
    
            const response = await fetch(process.env.REACT_APP_SERVER_URL +`/users/${currentUserId}`, settings);
            const parsedRes = await response.json();


            try{
                if(response.ok){
                    alert(parsedRes.message);
                    setIsLoggedIn(false);
                    setShowLogin(true);
                    setCurrentUserId("");
    
                }else{
                    throw new Error(parsedRes.message)
                }

            } catch (err){
                alert(err.message)
            }
            
    
        }
    



    
    if (!isLoggedIn) {
      
        if (showLogin) {
            return <Login setShowLogin={setShowLogin} login={login} />
        
        } else {
            return <Register setShowLogin={setShowLogin} //setIsLoggedIn={setIsLoggedIn} setCurrentUserId={setCurrentUserId} setToken={setToken} 
            login={login}/>
        }
    
    } else {
        return <Albums currentUserId={currentUserId} token={token} logout={logout} deregister={deregister}/>
    }
}










export default App;