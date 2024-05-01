import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/MainPage";
import Signup from "./components/Singup/SignupPage";
import Login from "./components/Login/LoginPage";
import Create from "./components/Create/CreatePage";
import Edit from "./components/Edit/editPage";
import UpdateForm from "./components/Update/updatePage";


function App() {
	const user = localStorage.getItem("token");

	return (
		// Routes for navigating  all pages
		<Routes>
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={< Login/>} />
			{user && <Route path="/create" exact element={<Create/>} />}
			{user && <Route path="/edit" exact element={<Edit/>} />}
			{user && <Route path="/update" exact element={<UpdateForm/>} />}
			{user && <Route path="/" exact element={< Main/>} />}
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}
export default App;
