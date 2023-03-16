// Libs
import * as React from 'react';
import {Form} from "react-router-dom";
// Styles
import style from './authreg.tsx.module.scss';

// Action Loader
export async function loader() {
    return null;
};

export async function action() {
    return null;
};


// Component
export function Component(): JSX.Element {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const loginFormRef = React.createRef<HTMLFormElement>();

    // React.useEffect(() => {
    //     if (authModLogin) return;
    //     const timeOutId = setTimeout(() => ascServer('check-vacant-authorization'), 500);
    //     return () => clearTimeout(timeOutId);
    // }, [authorization]);

    return <>
        <Form ref={loginFormRef} method={'post'} name="login" encType="multipart/form-data" className={style.component}>
            <h1>{"Register"}</h1>
            <input type={'text'} name={'authorization'} placeholder={'Username'} value={login} required minLength={3}
                   onChange={event => setLogin(event.target.value)}/>
            <label className={style.switch}
                   onClick={() => setShowPassword(!showPassword)}>{!showPassword ? "Show password" : "Hide password"}</label>
            <input type={!showPassword ? "password" : "text"} name={'password'} placeholder={'Password'}
                   value={password}
                   onChange={event => setPassword(event.target.value)}/>
            <input type={!showPassword ? "password" : "text"} name={'confirm'} placeholder={'Confirm password'}
                   value={confirmPassword}
                   onChange={event => setConfirmPassword(event.target.value)}/>
            <input type="submit" value="submit"></input>
        </Form>
    </>;
}

Component.displayName = "RegistrationForm";