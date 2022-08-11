/*
	@authors
		Jakob Kubicki
	@desc
		forums module
  @sources
    https://github.com/benawad/vstodo
*/

import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class forums {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: forums
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
    if (forums
    .currentPanel) {
      forums
    .currentPanel._panel.reveal(column);
      forums
    .currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      forums
    .viewType,
      "Forums",
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

    forums
.currentPanel = new forums
(panel, extensionUri);
  }

  public static kill() {
    forums
.currentPanel?.dispose();
    forums
.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    forums
.currentPanel = new forums
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
    forums
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
    const stylesforumsUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "media", "forumsstyle.css")
      );



    // // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();


    return `
    <!DOCTYPE html>
    <html>
    <head>
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
        <link href="${stylesforumsUri}" rel="stylesheet">
        <script nonce="${nonce}">
        </script>
    </head>
    <body>
    <div class="grid-container">
        <div class="item1">
            <h1>Announcements</h1>
            <p>Dr. Olivares: There is a new coding challenge added that is due at 11:59pm tomorrow. Let me know if you have any questions!</p>
            <p>Dr. Olivares: Also just wanted to note that there is a bonus question attached to it. Good luck!</p>
            <p>Dr. Sprint: Don't forget the career fair is on Tuesday at 1:00pm. I hope to see you there.</p>
    </div>
    
    <script>
        function officeFunction() {
              var dots = document.getElementById("dots");
              var moreText = document.getElementById("more");
              var btnText = document.getElementById("myBtn");
    
              if (dots.style.display === "none") {
                    dots.style.display = "inline";
                    btnText.innerHTML = "View more"; 
                    moreText.style.display = "none";
              } else {
                    dots.style.display = "none";
                    btnText.innerHTML = "View less"; 
                    moreText.style.display = "inline";
              }
        }
    </script>
    
    </body>
    </html>
            `;
  }
}