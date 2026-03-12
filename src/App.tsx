import "./App.css";
import { windowListener } from "./app-handling/window.ts";
import { createTray } from "./app-handling/tray.ts";
import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

function App() {
	// Grabs the current window.
	const window = getCurrentWindow();

	// Calls startup handling functions.
	useEffect(() => {
		windowListener(window);
		createTray(window);
	}, []);

	return (
		<div>
			<p>Hello</p>
		</div>
	);
}

export default App;
