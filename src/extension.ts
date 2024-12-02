import * as vscode from 'vscode';
import { NERMView } from './NERMView';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-sailpoint-nerm" is now active!');

	new NERMView(context);
}

// This method is called when your extension is deactivated
export function deactivate() {}
