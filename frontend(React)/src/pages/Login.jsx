import React, {useState} from 'react'
import '../styles/Login.css'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

export default function Login() {

    const[action, setAction] = useState("Sign Up");


    return (
        <div className="login-container">
            <div className="login-header">
                <div className="login-text">{action}</div>
                <div className="login-underline"></div>
            </div>
            <div className="login-inputs">
                {action === "Login" ? <div></div>:<div className="login-input">
                    <PersonIcon className="login-icon"/>
                    <input type="text" placeholder="Username" />
                </div>}
                <div className="login-input">
                    <EmailIcon className="login-icon"/>
                    <input type="email" placeholder="Email" />
                </div>
                <div className="login-input">
                    <PasswordIcon className="login-icon"/>
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="login-forgot-password">Forgot Password? <span>Click Here</span></div>}
            <div className="login-submit-container">
                <div className={action === "Login" ? "login-submit gray":"login-submit"} onClick={() => {setAction("Sign Up")}}>Sign Up</div>
                <div className={action === "Sign Up" ? "login-submit gray":"login-submit"} onClick={() => {setAction("Login")}}>Login</div>
            </div>
        </div>
    )
}