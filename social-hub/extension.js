/*
Social Hub App v0.0.1
Authors:
	Jakob Kubicki
	Daniel Olivares
	Adam L
	Katie Imhof
*/
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('social-hub.start', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('This is the Gonzaga Social Hub!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {
	vscode.window.showInformationMessage('Goodbye from the Social Hub!');
}

module.exports = {
	activate,
	deactivate
}
