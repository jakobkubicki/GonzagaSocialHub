import * as vscode from 'vscode';
import {profile} from "./profile"
import {forums} from "./forums"
import {challenge} from "./challenge"
import {message} from "./message"
import { SidebarProvider } from "./SidebarProvider"


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

export function deactivate() {}
