import * as vscode from "vscode";




export async function confirm(prompt: string): Promise<boolean> {
	const answer = await vscode.window.showWarningMessage(
		prompt,
		{ modal: true },
		...["Yes", "No"]
	);
	const value = (answer === "Yes")

	console.log(`< confirm: ${value}`);
	return value;
}
