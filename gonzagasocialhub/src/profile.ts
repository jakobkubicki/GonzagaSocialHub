/*
	@authors
		Jakob Kubicki
	@desc
		profile module
  @sources
    https://github.com/benawad/vstodo
*/

import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class profile {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: profile
 | undefined;

  public static readonly viewType = "main";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    // If we already have a panel, show it.
    if (profile
    .currentPanel) {
      profile
    .currentPanel._panel.reveal(column);
      profile
    .currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      profile
    .viewType,
      "Profile",
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],
      }
    );

    profile
.currentPanel = new profile
(panel, extensionUri);
  }

  public static kill() {
    profile
.currentPanel?.dispose();
    profile
.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    profile
.currentPanel = new profile
(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // // Handle messages from the webview
    // this._panel.webview.onDidReceiveMessage(
    //   (message) => {
    //     switch (message.command) {
    //       case "alert":
    //         vscode.window.showErrorMessage(message.text);
    //         return;
    //     }
    //   },
    //   null,
    //   this._disposables
    // );
  }

  public dispose() {
    profile
.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "onInfo": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case "onError": {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
        // case "tokens": {
        //   await Util.globalState.update(accessTokenKey, data.accessToken);
        //   await Util.globalState.update(refreshTokenKey, data.refreshToken);
        //   break;
        // }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {

    // Uri to load styles into webview
    const stylesResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const stylesMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    const stylesProfileUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "media", "profilestyle.css")
      );



    // // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();


    return `
    <!DOCTYPE html>
        <html>
        <head>
        <title>Profile</title>
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
        <link href="${stylesProfileUri}" rel="stylesheet">
        <script nonce="${nonce}">
        </script>
        </head>
        <body>
    <div class="grid-container">
        <div class="item1">
            <h1>Student Name</h1>
            <p>Bio where students can describe themselves and their goals</p>
        </div>
        <div class="item2">
            <h1>Badges 4</h1>
            <p>
                <p>Novice Developer</p>
                <p>Advanced Developer</p>
                <p>Bug Squasher</p>
                <p>HTML Wizard</p>
            </span>
            </p>
            <button style="width: 150px">View more</button>
        </div>
        <div class="item3">
            <h1">Projects 4</h1>
              <p>
                <p"><a href="https://github.com">https://github.com/Student/project</a></p>
                <p"><a href="https://github.com">https://github.com/Student/project2</a></p>
                <p"><a href="https://github.com">https://github.com/Student/project3</a></p>
                <p"><a href="https://github.com">https://github.com/Student/project4</a></p>
            </span>
            <button style="width: 150px">View more</button>
        </div>
    </div>
    </html>
            `;
  }
}