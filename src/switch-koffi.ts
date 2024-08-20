// 实现一个英文切换中文的效果
// const ffi = require('ffi-napi');
// import koffi from 'koffi';
import * as vscode from 'vscode';
const koffi = require('koffi');
const user32 = koffi.load('user32.dll')
const imm32 = koffi.load('imm32.dll')

const GetForegroundWindow = user32.stdcall("GetForegroundWindow", "int32", [])
const SendMessageW = user32.stdcall("SendMessageW", 'int32', ['long', 'int32', 'int32', 'int32'])
const ImmGetDefaultIMEWnd = imm32.stdcall("ImmGetDefaultIMEWnd", "int32", ["int32"])

let cnLParam = vscode.workspace.getConfiguration().get("Settings.ChineseModeCode") ?? 1;
let enLParam = vscode.workspace.getConfiguration().get("Settings.EnglishModeCode") ?? 0;
let getWParam = vscode.workspace.getConfiguration().get("Settings.GetParam") ?? 0x001; // 0x001
let setWParam = vscode.workspace.getConfiguration().get("Settings.SetParam") ?? 0x002; // 0x002

/**
 *
 * 0x283 - IMN_SETCONVERSIONMODE Winuser.h win32api
 * SendMessageW(ImmGetDefaultIMEWnd(GetForegroundWindow()), MSG, wParam, lParam)
 * <WinUser.h>
 * #define WM_IME_CONTROL                  0x0283
 * 由于发送了WM_IME_CONTROL消息, 因此应当使用IMN系列命令
 * @param wParam 获取输入法状态的索引值,不同输入法可能有差异
 * @param lParam 中英文状态码
 */
export function sendMsgtoIM(wParam: any, lParam: any) {
  let hwnd = GetForegroundWindow();
  let defaultIMEWnd = ImmGetDefaultIMEWnd(hwnd);
  return SendMessageW(defaultIMEWnd, 0x283, wParam, lParam);
}

/**
 * 切换输入法
 *
 * 根据当前输入法的状态，发送消息到输入法程序
 * 当前输入法状态为中文则使用中文参数，否则使用英文参数
 *
 * @param currentIM 当前输入法状态，true为英文，false为中文
 */
export function switchIM(currentIM: boolean) {
  // 调用发送消息函数，传递获取窗口参数函数和根据当前输入法状态选择的语言参数
  sendMsgtoIM(setWParam, currentIM ? cnLParam : enLParam);
}

/**
 * 从IMM获取当前输入法状态
 *
 * 发送IMN_GETCONVERSIONMODE消息到IME, 获取当前输入法状态
 * <ime_cmode.h>, <ime.h>
 * #define IME_CMODE_ALPHANUMERIC          0x0000
 * #define IME_CMODE_NATIVE                0x0001
 * #define IME_CMODE_CHINESE               IME_CMODE_NATIVE
 * #define IME_CMODE_HANGUL                IME_CMODE_NATIVE
 * #define IME_CMODE_JAPANESE              IME_CMODE_NATIVE
 * ...
 * #define IME_CMODE_SYMBOL                0x0400
 * 中文: 0x001或0x401 英文: 0
 *
 * @returns {int32} 返回sendMsgtoIM函数的执行结果
 */
export function getIM(): number {
  return 0x401 & sendMsgtoIM(getWParam, 0);
}