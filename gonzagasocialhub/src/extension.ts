// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {profile} from "./profile"
import {forums} from "./forums"
import {challenge} from "./challenge"
import {message} from "./message"
import { SidebarProvider } from "./SidebarProvider"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("gonzagasocialhub-sidebar", sidebarProvider)
	  );

	context.subscriptions.push(
		vscode.commands.registerCommand('gonzagasocialhub.forums', () => {
		profile.createOrShow(context.extensionUri);
	 })
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('gonzagasocialhub.profile', () => {
		forums.createOrShow(context.extensionUri);
	 })
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('gonzagasocialhub.challenge', () => {
		challenge.createOrShow(context.extensionUri);
	 })
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('gonzagasocialhub.message', () => {
		message.createOrShow(context.extensionUri);
	 })
	);

}

// this method is called when your extension is deactivated
export function deactivate() {}
