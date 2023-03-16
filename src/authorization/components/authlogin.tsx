// Libs
import React from 'react';
import {useActionData, Form} from "react-router-dom";

// Styles
import style from "./authlogin.tsx.module.scss";

// Action, Loader
export async function action({request, params}) {
    const formData = await request.formData();
    let formDataResult = new FormData();
    const login = formData.get('login');
    const password = formData.get('password');
    const forbiddenSymbols = /[(){}[\]|`¬¦! "£$%^&*"<>:;#~_\-+=,@.]/;

    if (!(login?.length < 3))
        formDataResult.set('login-warning', '"Username" field must contain 3 characters or more');
    else (forbiddenSymbols.test(login))
    formDataResult.set('login-warning', 'Invalid symbols in "Username" field');
    if (!(password?.length < 8))
        formDataResult.set('password-warning', '"Password" field must contain 8 characters of more');
    else (forbiddenSymbols.test(password))
    formDataResult.set('password-warning', 'Invalid symbols in "Password" field');

    console.log(formDataResult);
    console.log(!!Array.from(formDataResult.keys())?.length);

    if (Array.from(formDataResult.keys())?.length)
        return new Response(formDataResult, {
            status: 200,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

    const json = JSON.stringify(Object.fromEntries(formData));
    //todo server request
}

export async function loader({request, params}) {
    return null;
}

// Component
export default function LoginForm(): JSX.Element {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const formData = useActionData();

    return <Form method={"post"} name="login" className={style.component}>
        <h1>{"Login"}</h1>
        {formData?.['login-warning'] &&
            <label htmlFor={'login'}> {formData['login-warning']} </label>}
        <input
            id={'login'}
            name={'login'}
            type={'text'}
            value={login}
            placeholder={'Username'}
            required
            minLength={3}
            onChange={event => setLogin(event.target.value)}
        />
        <label
            htmlFor={'password'}
            className={style.switch}
            onClick={() => setShowPassword(!showPassword)}
        >{!showPassword ? "Show password" : "Hide password"}</label>
        {formData?.['password-warning'] &&
            <label htmlFor={'password'}>{formData['password-warning']}</label>}
        <input
            id={'password'}
            name={'password'}
            type={!showPassword ? "password" : "text"}
            value={password}
            placeholder={'Password'}
            required
            minLength={8}
            onChange={event => setPassword(event.target.value)}
        />
        <label className={style.switch}>
            <input type="checkbox" name={'remember'} value="true"/>Remember me</label>
        <input type="submit" value="submit"></input>
    </Form>;
}