import * as vscode from 'vscode';
import { getScope } from './hscopes';
import { switchInput } from './switch-koffi';
// import { switchInput } from './switch';
// import * as ffi from 'ffi-napi'

let cnLParam = vscode.workspace.getConfiguration().get("Settings.ChineseModeCode") ?? 1025
let enLParam = vscode.workspace.getConfiguration().get("Settings.EnglishModeCode") ?? 0
let getWParam = vscode.workspace.getConfiguration().get("Settings.GetParam") ?? 0x001
let setWParam = vscode.workspace.getConfiguration().get("Settings.SetParam") ?? 0x002

let currentComment = false
let previousInMath = false

export function autoShift(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(e => toggleCondition(e.textEditor.document, e.selections[0].active))
}

async function toggleCondition(document: any, position: any) {
    // console.log(`%c position `,'color:pink',position,document);
    // console.log(`%c document `,'color:red',document.lineAt(position));
    // let res = await vscode.commands.executeCommand('editor.action.inspectEditorTokens');
    let scope = getScope(document, position)
    if (!scope) return;
    // console.log('--------------------------');
    // console.log(scope.join('\n'));
    // console.log('--------------------------');
    console.log(scope.toString().includes('comment'));
    currentComment = scope.toString().includes('comment')
    if (currentComment === previousInMath) return;
    switchInput(setWParam, currentComment ? cnLParam : enLParam)
    previousInMath = currentComment;

}

