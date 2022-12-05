import React from "react";
import { withRouter } from 'react-router-dom';

function Login({ onLogin }) {

    const defaultData = {
        email: '',
        password: '',
    }

    const [inputData, setInputData] = React.useState(defaultData);

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputData(inputData => ({
            ...inputData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!inputData.password || !inputData.email) {
            return;
        }

        onLogin(inputData)
    }

    return (
        <div className="login" onSubmit={handleSubmit}>
            <p className="login__title">Вход</p>
            <form className='login__form'>
                <input id="email" className='login__input' required name="email" type="email" placeholder="Email"
                    onChange={handleChange} value={inputData.email} />
                <input id="password" className='login__input' required name="password" type="password" placeholder="Пароль"
                    onChange={handleChange} value={inputData.password} />
                <button type="submit" className="login__submit-button">Войти</button>
            </form>
        </div>
    )
}

export default withRouter(Login); 