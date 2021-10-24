import React from 'react';

function Login(props) {
    return (
        <section className="start-page">
            <h2 className="start-page__title">Вход</h2>
            <form className="form" name="login" onSubmit={props.onSubmit}>
                <div className="form__section">
                    <label htmlFor="email" className="form__label"></label>
                    <input type="email" className="form__item form__item_type_start-page form__item_type_email" id="email" name="email"
                           placeholder="Email" required minLength="2" maxLength="40"
                    />
                    <span className="form__input-error" id="email-error"></span>
                </div>
                <div className="form__section">
                    <label htmlFor="password" className="form__label"></label>
                    <input type="text" className="form__item form__item_type_start-page form__item_type_password" id="password" name="password"
                           placeholder="Пароль" required minLength="2" maxLength="200"
                    />
                    <span className="form__input-error" id="password-error"></span>
                </div>
                <button type="submit" className="form__save form__save_type_start-page">Войти</button>
            </form>

        </section>
    );
}

export default Login;