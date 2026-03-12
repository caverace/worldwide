import { invoke } from "@tauri-apps/api/core";

export const get_apps = async (): Promise<string[] | null> => {
	// Get application list by invoking the rust function.
	const apps: string[] | null = await invoke<string[]>("get_apps").catch(
		(reason) => {
			console.log("Error fetching apps:", reason);

			return null;
		},
	);

	return apps;
};
