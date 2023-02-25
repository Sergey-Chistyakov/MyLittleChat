// Libs
import * as React from 'react';

// Types
type TRegistrationFormProps = {
    submit: (ref: HTMLFormElement) => void;
    checkLoginVacant: (userName: string) => Promise<boolean>;
};

// Component
function RegistrationForm(props: TRegistrationFormProps): JSX.Element {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [login, setLogin] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [confirmPassword, setConfirmPassword] = React.useState<string>('');
    const loginFormRef = React.createRef<HTMLFormElement>();

    // React.useEffect(() => {
    //     if (authModLogin) return;
    //     const timeOutId = setTimeout(() => ascServer('check-vacant-login'), 500);
    //     return () => clearTimeout(timeOutId);
    // }, [login]);

    return <form ref={loginFormRef} name="login" encType="multipart/form-data"
                 onSubmit={(event) => {
                     event.preventDefault();
                     if (!(loginFormRef.current instanceof HTMLFormElement)) throw new Error('Failed to get Registration Form ref');
                     props.submit(loginFormRef.current);
                 }}>
        <h1>{"Register"}</h1>
        <input type={'text'} name={'login'} placeholder={'Username'} value={login}
               onChange={event => setLogin(event.target.value)}/>
        <label
            onClick={() => setShowPassword(!showPassword)}>{!showPassword ? "Show password" : "Hide password"}</label>
        <input type={!showPassword ? "password" : "text"} name={'password'} placeholder={'Password'}
               value={password}
               onChange={event => setPassword(event.target.value)}/>
        <input type={!showPassword ? "password" : "text"} name={'confirm'} placeholder={'Confirm password'}
               value={confirmPassword}
               onChange={event => setConfirmPassword(event.target.value)}/>
        <input type="submit" value="submit"></input>
    </form>;
}

export default RegistrationForm;