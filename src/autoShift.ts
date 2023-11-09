import * as vscode from 'vscode';
import { getScope } from './hscopes';
import { switchInput } from './switch-koffi';

let cnLParam = vscode.workspace.getConfiguration().get("Settings.ChineseModeCode") ?? 1025
let enLParam = vscode.workspace.getConfiguration().get("Settings.EnglishModeCode") ?? 0
let getWParam = vscode.workspace.getConfiguration().get("Settings.GetParam") ?? 0x001
let setWParam = vscode.workspace.getConfiguration().get("Settings.SetParam") ?? 0x002
let cursorColor = vscode.workspace.getConfiguration().get("Settings.CursorColor") ?? undefined


let currentComment = false
let previousInMath = false

export function autoShift(context: vscode.ExtensionContext) {
    vscode.window.onDidChangeTextEditorSelection(e => toggleCondition(e.textEditor.document, e.selections[0].active))
}

async function toggleCondition(document: any, position: any) {

    let scope = getScope(document, position)
    if (!scope) return;

    console.log('comment',scope.toString().includes('comment'));
    currentComment = scope.toString().includes('comment')
    const configuration = vscode.workspace.getConfiguration('workbench');

    if (currentComment) {
        configuration.update('colorCustomizations', { "editorCursor.foreground": cursorColor || undefined }, true);
        // configuration.update('colorCustomizations', { "editorCursor.background": "#00c4da" }, true);
    } else {
        configuration.update('colorCustomizations', { "editorCursor.foreground": undefined }, true);
        // configuration.update('colorCustomizations', { "editorCursor.background": undefined }, true);

    }
    if (currentComment === previousInMath) return;
    switchInput(setWParam, currentComment ? cnLParam : enLParam)

    previousInMath = currentComment;

}

