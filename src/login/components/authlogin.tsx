// Libs
import * as React from 'react';

// Types
type TLoginFormProps = {
    submit: (ref: HTMLFormElement) => void;
};

// Component
function LoginForm(props: TLoginFormProps): JSX.Element {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const loginFormRef = React.createRef<HTMLFormElement>();


    return <form ref={loginFormRef} name="login" encType="multipart/form-data"
                 onSubmit={(event) => {
                     event.preventDefault();
                     if (!(loginFormRef.current instanceof HTMLFormElement)) throw new Error('Failed to get Login Form ref');
                     props.submit(loginFormRef.current);
                 }}>
        <h1>{"Login"}</h1>
        <input type={'text'} name={'login'} placeholder={'Username'} value={login}
               onChange={event => setLogin(event.target.value)}/>
        <label
            onClick={() => setShowPassword(!showPassword)}>{!showPassword ? "Show password" : "Hide password"}</label>
        <input type={!showPassword ? "password" : "text"} name={'password'} placeholder={'Password'}
               value={password}
               onChange={event => setPassword(event.target.value)}/>
        <input type="checkbox" name="remember" value="true"/>
        <label htmlFor="remember">Remember me</label>
        <input type="submit" value="submit"></input>
    </form>;
}

export default LoginForm;