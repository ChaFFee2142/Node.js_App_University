import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>MyApp</h1>
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
                            className="btn orange darken-4"
                            onClick={loginHandler}
                            disabled={loading}
                        >Login
                        </button>
                        <button
                            style={{ float: "right" }}
                            className="btn grey lighten-1 black-text"
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