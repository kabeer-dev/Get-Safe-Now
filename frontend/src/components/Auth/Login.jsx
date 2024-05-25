import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState()
  async function submit(){
    setError('')

    const items = {email, password}
    let result = await fetch('http://localhost:5000/api/v1/auth/login', {method: 'POST',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(items)
    });
    result = await result.json()
    console.log(result);

    if(result.success === true){
      navigate('/')
    }
    else if(result.validationErrors !== null){
      result.validationErrors.map(element => {
        setError(<span>{element.message}</span>)
      });
    }else{
      setError(result.message)
    }
  }
  
  return (
    <div className="Signup container-fluid">
      <div className="row">
        <div className="image-set col-lg-4">
          <img
            src={require("../../assets/images/bg-img.png")}
            alt="img"
            className="img-style img-fluid"
          />
        </div>

        <div className="col-lg-4 offset-lg-2">
          <div className="auth-form">
            <div className="container">
              <h4 className="welcome-txt">Welcome Back!</h4>
              <p className="create-txt">
                Login <br />
                Login to your account
              </p>

              <div className="row mt-3">
                <div className="col-lg-12">
                  <span className="input-txt">Email Address</span>
                  <br />
                  <input className="input-style" type="email" name='email' onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-12">
                  <span className="input-txt">Password</span>
                  <input className="input-style" type="password" name='password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-lg-12 remember-parent-div">
                  <div>
                    <input type="checkbox" />
                    <span className="remember-txt">Remember Password</span>
                  </div>
                  <div>
                    <span className="forget-txt">Forget Password?</span>
                  </div>
                </div>
              </div>

              <span>{error}</span>
              <div className="row mt-4">
                <div className="col-lg-12">
                  <button className="btn-style" type="submit" onClick={submit}>
                    Login
                  </button>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-4 left-line-set">
                  <hr />
                </div>
                <div className="col-lg-4 signup-with-txt-set">
                  <span className="signup-with-txt">Log in with </span>
                </div>
                <div className="col-lg-4 right-line-set">
                  <hr />
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-4 offset-lg-4 icon-set">
                  <span className="apple-google-icon btn">
                    <FcGoogle />
                  </span>
                  <span className="apple-google-icon btn">
                    <BsApple />
                  </span>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-12 already-txt-set">
                  <p className="already-txt">
                    Don't have an account?{" "}
                    <span onClick={() => navigate('/signup')} className="login-txt">Sign up</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
