import "./App.css";
import { windowListener } from "./app-handling/window.ts";
import { createTray } from "./app-handling/tray.ts";
import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { get_apps } from "./functions/get_apps.ts";

function App() {
	// App list
	const [apps, setApps] = useState<string[] | null>();

	// Grabs the current window.
	const window = getCurrentWindow();

	// Calls startup handling functions.
	useEffect(() => {
		const call_startups = async () => {
			// Window event listener.
			await windowListener(window).catch((reason) => {
				console.log("Error listening to window events:", reason);
			});

			// Tray creator.
			await createTray(window).catch((reason) => {
				console.log("Error creating tray:", reason);
			});

			// Set the applist
			const appList = await get_apps();
			setApps(appList);
		};

		call_startups();
	}, []);

	return (
		<div>
			<p>{apps}</p>
		</div>
	);
}

export default App;
