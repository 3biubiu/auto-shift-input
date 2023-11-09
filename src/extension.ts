
import * as vscode from 'vscode';
import { autoShift } from './autoShift';

export function activate(context: vscode.ExtensionContext) {

	console.log('插件激活');
	autoShift(context)

}

// This method is called when your extension is deactivated
export function deactivate() {}
