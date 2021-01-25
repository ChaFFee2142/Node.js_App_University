import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
    const { loading, error, request } = useHttp()

    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            console.log(data)
            console.log("DEBUG")
        } catch (e) {console.log(e) }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Blog</h1>
                <div className="card grey darken-1">
                    <div className="card-content white-text">
                        <span style={{ paddingBottom: "20px" }} className="card-title">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler} />
                                <label htmlFor="email" style={{ fontSize: "14px" }}>Email</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler} />
                                <label htmlFor="password" style={{ fontSize: "14px" }}>Password</label>
                            </div>


                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            disabled={loading}
                        >Login
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            style={{ float: "right" }}
                            onClick={registerHandler}
                            disabled={loading}
                        >Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}