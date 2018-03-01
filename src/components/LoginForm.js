import React from 'react'

const LoginForm = (props) => {
    const handlePasswordChange = props.handlePasswordChange
    const handleUsernameChange = props.handleUsernameChange
    const login = props.login
    const password = props.password
    const username = props.username

    return (
        <div className="loginForm">
            <h2>log in to application</h2>
            <form onSubmit={login}>
                <div>
                    username:
                    <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password:
                    <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm