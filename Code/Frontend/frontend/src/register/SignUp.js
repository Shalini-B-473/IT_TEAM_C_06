import React, { useState } from 'react'
import "./SignUp.css"
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
export default function SignUp(){
  const [uname,setuname] = useState('')
  const [userID,setuserID] = useState('')
  const [email,setemail] = useState('')
  const [password,setpassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)
  const navigate=useNavigate()
  const handleChange = (e) => {
    if(e.target.name === 'uname')
      setuname(e.target.value)
    else if(e.target.name === 'userID'){
        var reg_val = /^[0-9]+$/
        if(!(reg_val.test(e.target.value))){
            document.getElementById("result").innerHTML = "Should contain only digits"
        }
        else{
            setuserID(e.target.value)
            document.getElementById("result").innerHTML = ""
        }

    }
    else if(e.target.name === 'email')
      setemail(e.target.value)
    else if(e.target.name === 'password')
      setpassword(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    const data={
      uname:uname,
      userID:userID,
      email:email,
      password:password
    }
    axios.post('http://localhost:5000/signup',data)
    .then(response=>{
      console.log(response)
      if(response.data === '<h1>User ID_taken</h1>'){
        document.getElementById("result").innerHTML = "User ID already taken"
      }
      else if(response.data === '<h1>success</h1>'){
        navigate('/sign-in')
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }
    return (
      <>
        <div className='container'>
          <div className="row">
            <div className='col-sm-4-offset-4'>
              <form className='border border-primary' onSubmit={handleSubmit}>
                <h3 className='text-center mt-5'>Sign Up</h3><br/>
                <div className="align">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name = "uname"
                    onChange={handleChange}
                  />
                </div><br/>
                <div className="align">
                  <label>User ID</label>
                  <input type="text" className="form-control" placeholder="User ID" name="userID" onChange={handleChange}/>
                </div><br/>
                <div className="align">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name= "email"
                    onChange={handleChange}
                  />
                </div><br/>
                <div className="align">
                  <label>Password</label>
                  <input
                    type={showPassword?"text":"password"}
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                  <label htmlFor="check">Show Password</label>
                <input
                    style = {{margin : "3% 1% -5% 1%"}}
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() =>
                        setShowPassword((prev) => !prev)
                    }
                />
                </div><br/>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary text-white bg-primary">
                    Sign Up
                  </button>
                  <div id="result"> </div>
                </div><br/>
                <p className="text-center">Already registered? <Link to={"/sign-in"}>Sign in</Link></p>
                
              </form>
            </div>
          </div>
        </div>
      </>
    )
}