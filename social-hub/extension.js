/*
Social Hub App v0.0.1
Authors:
	Jakob Kubicki
	Daniel Olivares
	Katie Imhof
*/
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('social-hub.start', () => {
		  // Create and show a new webview
		  const panel = vscode.window.createWebviewPanel(
			'socialHub', // Identifies the type of the webview. Used internally
			'Gonzaga Social Hub', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		  );
		})
	  );
}

function deactivate() {
	vscode.window.showInformationMessage('Goodbye from the Social Hub!');
}

module.exports = {
	activate,
	deactivate
}
