import { useState } from "react";
import lockIcon from '../public/img/lock.svg';
import Image from "next/image";
import logo from '../public/img/logo.svg';
import Head from "next/head";

const LoginPage = ({ onSubmit }) => {

    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(password);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <>
            <Head>
                <title>Password</title>
                <meta name="description" content="Введите пароль для входа" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="password">
                <Image
                    className='logo'
                    src={logo}
                    alt="Logo Leon"
                />
                <form className="form" onSubmit={handleSubmit}>
                    <div className="passWrapper">
                        <input
                            className="passInput"
                            type="password"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Image
                            className='lockIcon'
                            src={lockIcon}
                            alt="lock"
                        />
                    </div>
                    <button
                        className="passButton"
                        type="submit"
                    >
                        Войти
                    </button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;