/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.profile = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
class profile {
    constructor(panel, extensionUri) {
        this._disposables = [];
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
    static createOrShow(extensionUri) {
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
        const panel = vscode.window.createWebviewPanel(profile
            .viewType, "Profile", column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "media"),
                vscode.Uri.joinPath(extensionUri, "out/compiled"),
            ],
        });
        profile
            .currentPanel = new profile(panel, extensionUri);
    }
    static kill() {
        profile
            .currentPanel?.dispose();
        profile
            .currentPanel = undefined;
    }
    static revive(panel, extensionUri) {
        profile
            .currentPanel = new profile(panel, extensionUri);
    }
    dispose() {
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
    async _update() {
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
    _getHtmlForWebview(webview) {
        // Uri to load styles into webview
        const stylesResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const stylesProfileUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "profilestyle.css"));
        // // Use a nonce to only allow specific scripts to be run
        const nonce = (0, getNonce_1.getNonce)();
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
exports.profile = profile;
profile.viewType = "main";


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNonce = void 0;
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.getNonce = getNonce;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.forums = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
class forums {
    constructor(panel, extensionUri) {
        this._disposables = [];
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
    static createOrShow(extensionUri) {
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
        const panel = vscode.window.createWebviewPanel(forums
            .viewType, "Forums", column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "media"),
                vscode.Uri.joinPath(extensionUri, "out/compiled"),
            ],
        });
        forums
            .currentPanel = new forums(panel, extensionUri);
    }
    static kill() {
        forums
            .currentPanel?.dispose();
        forums
            .currentPanel = undefined;
    }
    static revive(panel, extensionUri) {
        forums
            .currentPanel = new forums(panel, extensionUri);
    }
    dispose() {
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
    async _update() {
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
    _getHtmlForWebview(webview) {
        // Uri to load styles into webview
        const stylesResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const stylesforumsUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "forumsstyle.css"));
        // // Use a nonce to only allow specific scripts to be run
        const nonce = (0, getNonce_1.getNonce)();
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
exports.forums = forums;
forums.viewType = "main";


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.challenge = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
class challenge {
    constructor(panel, extensionUri) {
        this._disposables = [];
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
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (challenge
            .currentPanel) {
            challenge
                .currentPanel._panel.reveal(column);
            challenge
                .currentPanel._update();
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(challenge
            .viewType, "challenge", column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "media"),
                vscode.Uri.joinPath(extensionUri, "out/compiled"),
            ],
        });
        challenge
            .currentPanel = new challenge(panel, extensionUri);
    }
    static kill() {
        challenge
            .currentPanel?.dispose();
        challenge
            .currentPanel = undefined;
    }
    static revive(panel, extensionUri) {
        challenge
            .currentPanel = new challenge(panel, extensionUri);
    }
    dispose() {
        challenge
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
    async _update() {
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
    _getHtmlForWebview(webview) {
        // Uri to load styles into webview
        const stylesResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const styleschallengeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "challengestyle.css"));
        // // Use a nonce to only allow specific scripts to be run
        const nonce = (0, getNonce_1.getNonce)();
        return `
    <!DOCTYPE html>
    <html>
    <head>
        <link href="${stylesResetUri}" rel="stylesheet">
        <link href="${stylesMainUri}" rel="stylesheet">
        <link href="${styleschallengeUri}" rel="stylesheet">
        <script nonce="${nonce}">
        </script>
    </head>
    <body>
    <div class="grid-container">
        <div class="item1">
            <h1>Coding Challenge #2</h1>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
            <label for="vehicle1">Change the page title to your name plus the class name</label><br>
            <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
            <label for="vehicle2">Modify the Header 1 tag</label><br>
            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
            <label for="vehicle3">Add a link tag to an external website</label><br>
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
exports.challenge = challenge;
challenge.viewType = "main";


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.message = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
class message {
    constructor(panel, extensionUri) {
        this._disposables = [];
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
    static createOrShow(extensionUri) {
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
        const panel = vscode.window.createWebviewPanel(message
            .viewType, "message", column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "media"),
                vscode.Uri.joinPath(extensionUri, "out/compiled"),
            ],
        });
        message
            .currentPanel = new message(panel, extensionUri);
    }
    static kill() {
        message
            .currentPanel?.dispose();
        message
            .currentPanel = undefined;
    }
    static revive(panel, extensionUri) {
        message
            .currentPanel = new message(panel, extensionUri);
    }
    dispose() {
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
    async _update() {
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
    _getHtmlForWebview(webview) {
        // Uri to load styles into webview
        const stylesResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const stylesMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const stylesMessageUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "messagestyle.css"));
        // // Use a nonce to only allow specific scripts to be run
        const nonce = (0, getNonce_1.getNonce)();
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
exports.message = message;
message.viewType = "main";


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SidebarProvider = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
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
    revive(panel) {
        this._view = panel;
    }
    _getHtmlForWebview(webview) {
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const styleIndexUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "indexstyle.css"));
        // Use a nonce to only allow a specific script to be run.
        const nonce = (0, getNonce_1.getNonce)();
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
exports.SidebarProvider = SidebarProvider;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const profile_1 = __webpack_require__(2);
const forums_1 = __webpack_require__(4);
const challenge_1 = __webpack_require__(5);
const message_1 = __webpack_require__(6);
const SidebarProvider_1 = __webpack_require__(7);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("gonzagasocialhub-sidebar", sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('gonzagasocialhub.forums', () => {
        profile_1.profile.createOrShow(context.extensionUri);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('gonzagasocialhub.profile', () => {
        forums_1.forums.createOrShow(context.extensionUri);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('gonzagasocialhub.challenge', () => {
        challenge_1.challenge.createOrShow(context.extensionUri);
    }));
    context.subscriptions.push(vscode.commands.registerCommand('gonzagasocialhub.message', () => {
        message_1.message.createOrShow(context.extensionUri);
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map