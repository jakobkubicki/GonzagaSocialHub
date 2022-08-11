/*
	@authors
		Jakob Kubicki
	@desc
		sidebar module
*/
import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage(async (data) => {
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
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );
    const styleIndexUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "media", "indexstyle.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Homepage</title>
        <link href="${styleResetUri}" rel="stylesheet">
        <link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleIndexUri}" rel="stylesheet">
        <script nonce="${nonce}">
        </script>
    </head>
    <body>
       <div class="grid-container">
            <div class="grid-item-1">
                <div class="header"> 
                    <div class="header-container">    
                        <h1 class="class-title">Class Name</h1>
                        <a href="settings.html"><img class="settings" src="https://icons-for-free.com/download-icon-settings-131964753254455707_512.png"></a>
                    </div>  
                </div> 
            </div>
            <div class="grid-item-2">
                <div class="links">
                    <div class="forums">
                        <h2>Forums</h2>
                        <div class="sub-links">
                            <h4><a href="#">Coding Questions</a></h4>
                            <h4><a href="#">Office Hours</a></h4>
                        </div>
                    </div>
                    <div class="challenges">
                        <h2>Challenges</h2>
                        <div class="sub-links">
                            <h4><a href="#">Challenge #2 (2 hours remaining)</a></h4>
                            <h4><a href="#">Challenge #1 </a></h4>
                        </div>
                    </div>
                    <div class="chat">
                        <h2>Group Chat</h2>
                        <div class="sub-links">
                            <h4><a href="#">General</a></h4>
                            <h4><a href="#">Homework Help</a></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid-item-3">
                <div class="professor">
                    <h3>Professors</h3>
                    <div class="chat-link">
                        <div class="chat-container">  
                            <a href="profile.html"><img class="settings" src="https://www.hecmsenior.com/wp-content/uploads/2021/06/Profile-Pic-Icon.png"></a>
                            <h4 class="name"><a href="message.html">Professor</a></h4>
                        </div> 
                    </div>
                </div>
                <div class="assistants">
                    <h3>Teacher's Assistants</h3>
                    <div class="chat-link">
                        <div class="chat-container">  
                            <a href="profile.html"><img class="settings" src="https://www.hecmsenior.com/wp-content/uploads/2021/06/Profile-Pic-Icon.png"></a>
                            <h4 class="name"><a href="message.html">TA</a></h4>
                        </div> 
                    </div>
                </div>
                <div class="students">
                    <h3>Students</h3>
                    <div class="chat-link">
                        <div class="chat-container">  
                            <a href="profile.html"><img class="settings" src="https://www.hecmsenior.com/wp-content/uploads/2021/06/Profile-Pic-Icon.png"></a>
                            <h4 class="name"><a href="message.html">Student 1</a></h4>
                        </div> 
                    </div>
                    <div class="chat-link">
                        <div class="chat-container">  
                            <a href="profile.html"><img class="settings" src="https://www.hecmsenior.com/wp-content/uploads/2021/06/Profile-Pic-Icon.png"></a>
                            <h4 class="name"><a href="message.html">Student 2</a></h4>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
  }
}