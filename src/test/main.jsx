import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root.jsx";
import * as ErrorPage from "./routes/error-page.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <ErrorPage />,
	},
	{ path: "*", element:<ErrorPage />}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);