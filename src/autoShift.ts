import * as vscode from 'vscode';
import { getScope } from './hscopes';
import { getIM, switchIM } from './switch-koffi';
import { getCharinRange, statusbarLogger } from './utils';

let cursorColor = vscode.workspace.getConfiguration().get("Settings.CursorColor") ?? undefined;


let currentZh = false;
let previousZh = false;
let currentEn = false;
let previousEn = false;
// let currentInMath = false;
// let previousInMath = false;

/**
 * 自动切换函数，根据当前光标所在位置的代码结构自动调整视角
 *
 * @param context 扩展上下文，用于存储和访问扩展的状态和资源
 */
export function autoShift(context: vscode.ExtensionContext) {
  let scopeText_cache = ""; // 初始化缓存

  vscode.window.onDidChangeTextEditorSelection(e => {
    const hscopes = getScope(e.textEditor.document, e.selections[0].active);
    if (!hscopes) {
      console.log('Failed to get the scope, skipping...');
      return;
    }
    let scopeText = Array.isArray(hscopes) ? hscopes.join(';') : hscopes.toString();
    debugIMEStatus(scopeText);
    if (scopeText !== scopeText_cache) {
      scopeText_cache = scopeText;
      toggleCondition(scopeText);
    }
  });
}

async function toggleCondition(scopeText: string) {

  const configuration = vscode.workspace.getConfiguration('workbench');
  let backConfig: any = configuration.get('colorCustomizations');
  // 增加识别'math'的判断
  currentZh = (scopeText.includes('comment') || scopeText.includes('text')) && !scopeText.includes('math');
  if (currentZh) {
    configuration.update('colorCustomizations', { ...backConfig, "editorCursor.foreground": cursorColor || undefined }, true);
  } else {
    configuration.update('colorCustomizations', { ...backConfig, "editorCursor.foreground": undefined }, true);
  }
  if (currentZh === previousZh) { return; }
  switchIM(currentZh);
  previousZh = currentZh || (getIM() >= 1);
}

function debugSurrondingChar(e: vscode.TextEditorSelectionChangeEvent) {
  const zhcnRegexp = /[\u4e00-\u9fa5]/;
  const spageRegexp = /\s/;
  let charSurrondingL = getCharinRange(e.textEditor.document, e.selections[0].active, 2, 0);
  let larray = charSurrondingL.split("");
  let lresult = "";
  if (larray.length > 0) {
    lresult = larray.map((char: string) => {
      let result = zhcnRegexp.test(char) ? "zh" : spageRegexp.test(char) ? "sp" : "en";
      return result;
    }).join(", ");
  } else {
    lresult = "undefined";
  }
  let charSurrondingR = getCharinRange(e.textEditor.document, e.selections[0].active, 0, 2);
  let rarray = charSurrondingR.split("");
  let rresult = "";
  if (rarray.length > 0) {
    rresult = rarray.map((char: string) => {
      let result = zhcnRegexp.test(char) ? "zh" : spageRegexp.test(char) ? "sp" : "en";
      return result;
    }).join(", ");
  } else {
    rresult = "undefined";
  }
  statusbarLogger(`${charSurrondingL.length}: ${lresult}|${charSurrondingR.length}: ${rresult}`);
}

function debugIMEStatus(scpoeText: string) {
  let imeStatus = getIM();
  let shouldZh = (scpoeText.includes('comment') || scpoeText.includes('text') ) && !scpoeText.includes('math');
  statusbarLogger(`IM: ${imeStatus ? "zh" : "en"} / SC: ${shouldZh ? "zh" : "en"}`);
}