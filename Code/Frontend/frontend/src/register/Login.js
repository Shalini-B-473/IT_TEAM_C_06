import React, {useState} from 'react'
import "./Login.css"
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login(){

  const [userID,setuserID] = useState('')
  const [password,setpassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleChange=(e)=>{
    if(e.target.name === 'userID')
      setuserID(e.target.value)
    else if(e.target.name === 'password')
      setpassword(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()

    const data = {
      userID:userID,
      password : password
    }

    axios.post('http://localhost:5000/login', data)
    .then(response=>{
      console.log(response);
      if(response.data === "<h1>Login success</h1>"){
        navigate('/mode')
      }
      else if(response.data === "<h1>Invalid credentials</h1>"){
        document.getElementById("result").innerHTML = "Invalid credentials"
      }
      else if(response.data === "<h1>User doesn't exist</h1>"){
        document.getElementById("result").innerHTML = "User doesn't exist"
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
              <h2 className='text-center'>9x9 Board Game</h2>
                <h3 className='text-center mt-5'>Sign In</h3>
                <div className="align">
                  <label>User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter User ID"
                    name="userID"
                    onChange={handleChange}
                  />
                </div><br />
                <div className="align">
                  <label>Password</label>
                  <input
                    type={showPassword?"text":"password"}
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
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
                <div className="align">
                  {/* <div>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label className="custom-control-label rm" htmlFor="customCheck1">
                      Remember me
                    </label>
                  </div> */}
                </div><br />
                <div className="text-center">
                <button type="submit" className="btn btn-primary text-white bg-primary">
                    Submit
                  </button>
                </div><br/>
                <p className="text-center">Don't have an account? <Link to={"/sign-up"}>Sign-up</Link></p>
                {/* <p className="text-center"><Link href="#">Forgot password?</Link>
                </p> */}
                <div id="result"></div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
}