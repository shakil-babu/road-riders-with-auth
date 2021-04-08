import React, { useContext, useState } from "react";
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, initializeLoginFramework, signInWithEmailAndPassword, signInWithGoogle } from "./firebaseManager";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
const Login = () => {
  const [erros, setErros] = useState({name:"", email:"",password:""})
  const [signUp, setSignUp] = useState(false);
  //userInfo
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  initializeLoginFramework();


  // from context
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  console.log('from login: ',loggedInUser);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // sign in with google
  const googleSignIn = () => {
    signInWithGoogle().then((res) => {
      setUserInfo(res);
      setLoggedInUser(res);
      history.replace(from);
    });

  };


  // blurHandler
  const blurHandler = (e) => {

    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }else{
      setErros({...erros, name:"Must use name!"})
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }else{
      setErros({...erros, password:"Password is not valid!"})
    }
    if(isFieldValid){
      const newUserInfo = {...userInfo};
      newUserInfo[e.target.name] = e.target.value;
      setUserInfo(newUserInfo);
    }else{
      setErros({...erros, email:"Email is not Valid!"})
    }
  };
  // submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    if(signUp && userInfo.email && userInfo.password){
      createUserWithEmailAndPassword(userInfo.name, userInfo.email, userInfo.password)
      .then(res => {
        setUserInfo(res);
      setLoggedInUser(res);
      history.replace(from);
      })
    }

    
    if(!signUp && userInfo.email && userInfo.password){
      signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(res => {
        setUserInfo(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }
  };


  return (
    <section className="login-area">
      <form onSubmit={submitHandler}>
        <h4>{signUp ? "Create an account" : "Login"}</h4>
        {signUp && (
         <div className="">
            <input
            onBlur={blurHandler}
            type="text"
            className="input"
            name="name"
            placeholder="Name"
          />
          <p style={{color:'red'}}>{erros.name}</p>
         </div>
        )}
        <input
          onBlur={blurHandler}
          className="input"
          type="email"
          name="email"
          placeholder="Email"
        />
         <p style={{color:'red'}}>{erros.email}</p>
        <br />
        <input
          onBlur={blurHandler}
          className="input"
          type="password"
          name="password"
          placeholder="Password"
        />
         <p style={{color:'red'}}>{erros.password}</p>
        {signUp && (
          <input
            onBlur={blurHandler}
            type="password"
            className="input"
            name="confirmPassword"
            placeholder="Confirm password"
          />
        )}
        {!signUp && (
          <div className="display-flex">
            <div className="flex">
              <input type="checkbox" name="remember" /> <p>Remember me</p>
            </div>
            <a href="#">forgot password</a> <br />
          </div>
        )}
        <button className="submit-btn" type="submit">
          {signUp ? "Create an account" : "login"}
        </button>
        {signUp ? (
          <div className="info">
            <p>Already have an account ? </p>{" "}
            <a onClick={() => setSignUp(false)} href="#">
              login
            </a>
          </div>
        ) : (
          <div className="info">
            <p>Don't have any account ? </p>{" "}
            <a onClick={() => setSignUp(true)} href="#">
              Create an account
            </a>
          </div>
        )}
      </form>

      <div className="underline-flex">
        <div className="underline"></div> <p>or</p>
        <div className="underline"></div>
      </div>
      <button onClick={googleSignIn} className="icon-flex">
        <FcGoogle className="icon" />
        <p>Continue with google</p>
      </button>
    </section>
  );
};

export default Login;
