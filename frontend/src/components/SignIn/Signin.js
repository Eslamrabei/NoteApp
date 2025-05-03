import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Signin.css";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignin = (e) => {
        e.preventDefault();
        const user = { username, password };

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/users/login`,
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        })
            .then((res) => {
                console.log("User logged in");
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/dashboard");
            })
            .catch((err) => {
                alert("Authentication failed");
                setUsername("");
                setPassword("");
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const user = { username, password };

        axios({
            method: "POST",
            url: `${process.env.REACT_APP_NOTERAPP_BACKEND}/users/`,
            headers: {
                "Content-Type": "application/json",
            },
            data: user,
        })
            .then((res) => {
                console.log("New User created");
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            })
            .catch((err) => {
                alert(err);
                setUsername("");
                setPassword("");
            });
    };

    return (
        <section className="Signin  w-full h-[100vh] flex justify-center items-center bg-fixed" 
            style={{backgroundImage:"url(../../images/3ed22d3b73876672ffc037e6a99562eb.png)"}}
        >
            <div className="container   w-[50%] h-[90%] rounded-[30%] bg-gradient-to-r from-cyan-700 to-blue-400 ">
                <h1 className="SigninHead font-semibold text-center my-4 w-full 
                absolute top-[10%] left-[0]  
                
                ">Noter</h1>
                <div className="SigninForm  absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-70%]  ">
                    <form >
                        <div className="FormUsername flex flex-col justify-start my-4">
                            <span className="FormLabel font-semibold  p-1">Username</span>
                            <input
                                type="text"
                                className="FormInput w-[287px] h-[47px] rounded-[10px] p-2  outline outline-[0]"
                                required
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                placeholder="Your name"
                            />
                        </div>
                        <div className="FormPassword flex flex-col justify-start my-4">
                            <span className="FormLabel font-semibold  p-1">Password</span>
                            <input
                                type="password"
                                className="FormInput w-[287px] h-[47px] rounded-[10px] p-2  outline outline-[0]"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                placeholder="Password"
                            />
                        </div>
                        <div className="FormBtns flex flex-col  ">
                            <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-[21px] p-2 my-2 w-[146px] h-[42px] font-semibold text-white  " onClick={handleSignin}>
                                Sign In
                            </button>
                            <button
                                className="Btns registerBtn mt-3 hover:underline  underline-offset-5"
                                onClick={handleRegister}
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Signin;