import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register(){

    const [user , setUser] = React.useState({
        name:'',
        email:'',
        password:''
    })
    const onChangeInput=(e)=>{
        const {name , value } = e.target
        setUser({...user , [name]:value})
    }

    const registerSubmit = async (e)=>{
        e.preventDefault();
        try {
            await axios.post("/user/register" , {...user})
            localStorage.setItem("firstLogin" , true)
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }

    }
    
    return (
        <div className="login-page" >
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" placeholder="Enter name" value={user.name} name="name"
                required  onChange={onChangeInput}/>
                <input type="email" placeholder="Enter email address" value={user.email} name="email"
                required onChange={onChangeInput} />
                <input type="password" placeholder="Enter Password" value={user.password} name="password"
                required autoComplete="on" onChange={onChangeInput} />
                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}