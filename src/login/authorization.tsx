// Libs
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// Components
import LoginForm from './components/authlogin.tsx';

const RegistrationForm = React.lazy(() => import('./components/authreg.tsx'));
const ErrorPage = React.lazy(() => import('./components/error.tsx'));

// ---------------------------------------------------------------------------------------

function Main() {

    const [authModLogin, setAuthModLogin] = React.useState(true);
    const [isLoginVacant, setIsLoginVacant] = React.useState(true);
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const authFormRef = React.useRef<HTMLFormElement | null>(null);
    const [switchIt, setSwitchIt] = React.useState(true); // remove tests

    const router = createBrowserRouter([
        {
            path: "/authorization/",
            element: <div>
                <h1>ReactRoutElement</h1>
                <a href={`./errrr`}>MyError link for tests</a>
            </div>,
            errorElement: <ErrorPage/>
        },
    ]);

    return <>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
        <hr/>
        <input type={'button'} onClick={()=> setSwitchIt(!switchIt)}/>
        <hr/>
        <React.Suspense fallback={<h2>Loading</h2>}>
        {switchIt
            ? <LoginForm submit={() => alert('logged')}/>
            : <RegistrationForm submit={() => alert('registered')} checkLoginVacant={() => Promise.resolve(true)}/>
        }
        </React.Suspense>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main/>);