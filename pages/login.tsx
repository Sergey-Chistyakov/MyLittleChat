import React from 'react';
import * as ReactDOM from 'react-dom/client';

// ---------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------

function FormCmp() {
    const [authModLogin, setAuthModLogin] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoginVacant, setIsLoginVacant] = React.useState(true);
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const authFormRef = React.useRef(null);

    React.useEffect(() => {
        if (authModLogin) return;
        const timeOutId = setTimeout(() => ascServer('check-vacant-login'), 500);
        return () => clearTimeout(timeOutId);
    }, [login]);


    async function ascServer(mlcRequestType: 'check-vacant-login' | 'login' | 'register'): Promise<void> {
        let response = await fetch('/', {
            method: 'POST', headers: {
                'MLC-request-type': 'check-vacant-login',
            },
            body: new FormData(authFormRef.current),
        });
        let result = await response.json();
        setIsLoginVacant(result.isLoginVacant);
    }

    return <form name="authentication" encType="multipart/form-data" className={authModLogin ? 'login' : 'registration'}
                 // onSubmit=todo register / login
                 ref={authFormRef}>
        <h1>{authModLogin ? "Login" : "Registration"}</h1>
        <label onClick={() => setAuthModLogin(!authModLogin)}>or {!authModLogin ? "login" : "register"}</label>
        {!authModLogin && !isLoginVacant && <label>This login is unavailable</label>}
        <input type={'text'} name={'login'} placeholder={'Username'} value={login} onChange={event => setLogin(event.target.value) }/>
        <label onClick={() => setShowPassword(!showPassword)}>{!showPassword ? "Show password" : "Hide password"}</label>
        <input type={!showPassword ? "password" : "text"} name={'password'} placeholder={'Password'} value={password} onChange={event=>setPassword(event.target.value)}/>
        {!authModLogin && <>
        {password !== passwordConfirm && <label>Password does not match</label>}
		<input type={!showPassword ? "password" : "text"} name={'password-rep'} placeholder={'Confirm password'} value={passwordConfirm} onChange={event=>setPasswordConfirm(event.target.value)}/>
        </>}
        <input type="checkbox" name="remember-me" value="true"/>
        <label htmlFor="remember-me">Remember me</label>
        <input type="submit" value="submit"></input>
    </form>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FormCmp/>);

// ---------------------------------------------------------------------------------------