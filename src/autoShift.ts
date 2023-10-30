import * as vscode from 'vscode';
import { getScope } from './hscopes';
// import * as ffi from 'ffi-napi'

let cnLParam  = vscode.workspace.getConfiguration().get("Settings.ChineseModeCode") ?? 1025
let enLParam  = vscode.workspace.getConfiguration().get("Settings.EnglishModeCode") ?? 0
let getWParam = vscode.workspace.getConfiguration().get("Settings.GetParam") ?? 0x001
let setWParam = vscode.workspace.getConfiguration().get("Settings.SetParam") ?? 0x002

let currentInMath = false
let previousInMath = false

export function autoShift(context : vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(e => toggleCondition(e.textEditor.document, e.selections[0].active))
}

async function toggleCondition(document: any,position: any) {
    console.log(`%c position `,'color:pink',position,document);
    console.log(`%c document `,'color:red',document.lineAt(position));
    // let res = await vscode.commands.executeCommand('editor.action.inspectEditorTokens');
    let scope = getScope(document,position)
    console.log(`%c  scope `,'color:blue', scope);
}

