/**
 * 一个能够识别分词的工具插件
 * 分词相关定义: https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
 * 语法高亮引擎涉及到的名词定义,用于判断用户光标指向位置的分词作用域
 * 
 */
import * as vscode from "vscode"
// 引入大佬二次开发的插件,用于获取分词信息
const hscopes = vscode.extensions.getExtension('yfzhao.hscopes-booster');

/**
 * get TextMate Scope Array
 * @param {vscode.TextDocument} document 
 * @param {vscode.Position} position 
 * @returns {string[] | undefined}
 */
export function getScope(document: any, position: any) {
    if (!hscopes || !document || !position) {
        console.log(`function "getScope" causes error.`)
        return undefined
    }
    else {
        return hscopes?.exports?.getScopeAt(document, position)?.scopes;
    }
}
