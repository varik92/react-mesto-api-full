import React from "react";
import { Link, withRouter } from 'react-router-dom';

function Register({ onRegister }) {

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
        onRegister(inputData)
    }
    return (
        <div className="register">
            <p className="register__title">Регистрация</p>
            <form className='register__form' onSubmit={handleSubmit}>
                <input id="email" className='register__input' required name="email" type="email" placeholder="Email"
                    onChange={handleChange} value={inputData.email} />
                <input id="password" className='register__input' required name="password" type="password" placeholder="Пароль"
                    onChange={handleChange} value={inputData.password} />
                <button type="submit" className="register__submit-button">Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="register__subtitle">Уже зарегистрированы? Войти</Link>
        </div>

    )
}

export default withRouter(Register); 