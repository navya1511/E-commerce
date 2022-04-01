import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Login(){

    const [user , setUser] = React.useState({
        email:'',
        password:''
    })
    const onChangeInput=(e)=>{
        const {name , value } = e.target
        // console.log(e.target.name)
        setUser({...user , [name]:value})
    }

    const loginSubmit = async (e)=>{
        e.preventDefault();
        try {
            await axios.post("/user/login" , {...user})
            localStorage.setItem("firstLogin" , true)
            
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }

    }
    // console.log(user);
    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" placeholder="Enter email address" value={user.email} name="email"
                required onChange={onChangeInput}/>
                <input type="password" placeholder="Enter Password" value={user.password} name="password"
                required autoComplete="on" onChange={onChangeInput} />
                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}