import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, type TrayIconOptions } from "@tauri-apps/api/tray";
import { Window } from "@tauri-apps/api/window";

let tray: TrayIcon | null | "creating" = null;

// Creates a tray for the app.
export const createTray = async (window: Window) => {
	// If a tray already exists, return to avoid duplicate trays.
	if (tray) return;

	// Set tray to creating to avoid duplicate calls at the same time.
	tray = "creating";

	// Unhides window on call.
	const openWindow = async () => {
		await window.show();
		await window.setFocus();
	};

	// Closes window.
	const quitApp = async () => {
		await window.destroy();
	};

	// Tray menu.
	const menu = await Menu.new({
		items: [
			{
				id: "open",
				text: "Open",
				action: openWindow, // Unhides window.
			},
			{
				id: "quit",
				text: "Quit",
				action: quitApp, // Quits app.
			},
		],
	});

	// Tray options.
	const options: TrayIconOptions = {
		menu: menu,
		showMenuOnLeftClick: false,
		action: (event) => {
			if (event.type == "Click" && event.button == "Left") {
				openWindow();
			}
		},
	};

	// Create tray with options.
	tray = await TrayIcon.new(options);
};
