import styles from "./styles.module.css";
//this method logout user by removing the token
const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location="/login";
	};

	return (
		<div className={styles.main_container}>
			{/* This is nav bar */}
			<nav className={styles.navbar}>
				<h1>FOOD ZONE</h1>
				{/* On clicking this button user will logout */}
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>

	);
};

export default Main;
