import * as React from 'react'
import {useRouteError} from "react-router-dom";

export default function ErrorPage() {
    let error = useRouteError() as Error;
    return (
        <>
            <h1>Uh oh, something went terribly wrong 😩</h1>
            <pre>{error.message || JSON.stringify(error)}</pre>
            <button onClick={() => (window.location.href = "/")}>
                To main page
            </button>
        </>
    );
}