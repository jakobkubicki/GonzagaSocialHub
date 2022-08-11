/*
	@authors
		Jakob Kubicki
	@desc
		returns a nonce (number used once)
  @sources
    https://github.com/benawad/vstodo
*/

import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class message {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: message
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
    if (message
    .currentPanel) {
      message
    .currentPanel._panel.reveal(column);
      message
    .currentPanel._update();
      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      message
    .viewType,
      "message",
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

    message
.currentPanel = new message
(panel, extensionUri);
  }

  public static kill() {
    message
.currentPanel?.dispose();
    message
.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    message
.currentPanel = new message
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
    message
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
    const stylesMessageUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "media", "messagestyle.css")
      );



    // // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();


    return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="${stylesResetUri}" rel="stylesheet">
    <link href="${stylesMainUri}" rel="stylesheet">
    <link href="${stylesMessageUri}" rel="stylesheet">
    </head>
    <body>
    
    <div class="grid-container">
        <div class="item1">
            <h1 style="font-size:35px;color:white;">Messages</h1>
            <div class="tab">
                <button class="tablinks" onclick="openMessage(event,'Professor')">Professor</button>
                <button class="tablinks" onclick="openMessage(event, 'Classmate')">Classmate</button>
                <button class="tablinks" onclick="openMessage(event, 'TA')">TA</button>
            </div>
    
            <div id="Professor" class="tabcontent">
                <h3 style="font-size:35px;color:white;text-align:left;">Professor</h3>
                <p style="font-size:20px;color:white;">Student</p>
                <p style="font-size:15px;color:white;">Hey Professor! I'm struggling with figuring out how to position divs on my website, would you mind taking a look at my code?</p>
                <p style="font-size:20px;color:white;">Professor</p>
                <p style="font-size:15px;color:white;">The site looks great! Check out Chapter 3 in the book, it goes over Grid Layout which will work better for what you're trying to do. If you have anymore questions, feel free to reach out!</p>
                <div class="Message">
                   <div id="MessageBox">Message hi.</div> 
                </div>
            </div>
    
            <div id="Classmate" class="tabcontent">
                <div style="text-align=left">
                <p>Hey! Did you use Grid Layout or Flexbox for the homework assignment?</p>
                </div>
                <p>Hi! I used Grid Layout, I found it was easier than Flexbox.</p>
                <p>Okay I think I'm going to use Grid as well!</p>
                <div class="Message">
                    <form action="#">
                        <input type="text" id="message" name="message" value="Message">
                        <button style="width: 125px">Send Message</button>
                    </form>
                </div>
            </div>
    
            <div id="TA" class="tabcontent">
                <h3 style="font-size:35px;color:white;text-align:left;">TA</h3>
                <p style="font-size:15px;color:white;">Hi! I'm struggling with adding a link tag with a reference to an external website. Do you have any suggestions?</p>
                <p style="font-size:15px;color:white;">Hi! Would you be able to hop on Zoom? It'll be much easier to explain.</p>
                <div class="Message">
                    <form action="https://www.google.com">
                        <input type="text" id="message" name="message" value="Message"><br><br>
                        <input type="submit" value="Send">
                    </form>
                </div>
            </div>
        </div>
    </div>
            <script>
        function openMessage(evt, messager) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(messager).style.display = "block";
            evt.currentTarget.className += " active";
        }
        var userMessage = prompt("Enter message here:", "");
        if(userMessage!=null) {
            document.getElementById("MessageBox").innerHTML = userMessage;
        }
        </script>
    </body
    </html>
            `;
  }
}