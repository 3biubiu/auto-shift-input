// 实现一个英文切换中文的效果
// const ffi = require('ffi-napi');
// import koffi from 'koffi';
const koffi = require('koffi');
const user32 = koffi.load('user32.dll')
const imm32 = koffi.load('imm32.dll')

const GetForegroundWindow = user32.stdcall("GetForegroundWindow", "int32", [])
const SendMessageW = user32.stdcall("SendMessageW", 'int32', ['long', 'int32', 'int32', 'int32'])
const ImmGetDefaultIMEWnd = imm32.stdcall("ImmGetDefaultIMEWnd", "int32", ["int32"])

/**
 * 
 * @param wParam 获取输入法状态的索引值,不同输入法可能有差异
 * @param lParam 中英文状态码
 */
export function switchInput(wParam: any, lParam: any) {
    let hwnd = GetForegroundWindow()
    let defaultIMEWnd = ImmGetDefaultIMEWnd(hwnd)
    return SendMessageW(defaultIMEWnd, 0x283, wParam, lParam);
}