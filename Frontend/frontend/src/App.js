import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './register/Login';
import SignUp from './register/SignUp';
import Game from './components/game';
import Mode from './Mode';
import GameAuto from './components/gameAuto'
function App() {
  return (
    <Router>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path='/game' element={<Game/>} />
            <Route path='/mode' element={<Mode/>}/>
            <Route path='/gameAuto' element={<GameAuto/>}/>
          </Routes>
        </div>
      </div>

    </Router>
  );
}

export default App;
