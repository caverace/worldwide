import { Window } from "@tauri-apps/api/window";

// Listeners relating to the window.
export const windowListener = async (window: Window) => {
	// Hides the window when blurred.
	window.listen("tauri://blur", async () => {
		await window.hide().catch((reason) => {
			console.log("Error closing window:", reason);
		});
	});
};
