import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


export const MainPage = () => {
    
    
    const auth = useContext(AuthContext)
    
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
    }
    
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>MyApp</h1>
                <div className="card grey darken-1">
                    <div className="card-content white-text">
                        <span style={{ paddingBottom: "20px" }} className="card-title">Logged in</span>
                        <div>


                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            style={{ float: "right" }}
                            className="btn grey lighten-1 black-text"
                            onClick={logoutHandler}
                        >Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}