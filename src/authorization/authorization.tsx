// Libs
import React, {Suspense} from 'react';
import * as ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
    Link,
    Outlet,
} from "react-router-dom";

// Components
import LoginForm, {action as logAction, loader as logLoader} from './components/authlogin.tsx';
import ErrorPage from "./components/errorpage.tsx";

const lazyRegForm = () => import('./components/authreg.tsx');

// ---------------------------------------------------------------------------------------

function Main() {
    const router = createBrowserRouter([
        {
            element: <Outlet/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path:"/",
                    element: <Navigate to={'/log'}/>,
                },
                {
                    path: "/log",
                    action: logAction,
                    loader: logLoader,
                    element: <>
                        <LoginForm/>
                        <hr/>
                        <Link to={'/reg'}>Go to reg</Link>
                        <hr/>
                        <Link to={'/err'}>Error test link</Link>
                    </>,
                    errorElement: <ErrorPage/>
                },
                {
                    path: '/reg',
                    lazy: lazyRegForm,
                },
            ],
        }
    ]);

    return <>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main/>);