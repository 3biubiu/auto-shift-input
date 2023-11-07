// 实现一个英文切换中文的效果
// const ffi = require('ffi-napi');
// import koffi from 'koffi';
const koffi = require('koffi/indirect');
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
/**
 * LRESULT SendMessageW (
    HWND hWnd,
    UINT Msg,      // 0x283 信息代表的是 WM_IME_CONTROL ，即“控制输入法”
    WPARAM wParam, // 0x001 检测输入法状态,此时LPARAM可以不给 0x002是微软的IMC_SETCONVERSIONMODE(控制中英文状态), 0x006是搜狗和QQ输入法切换的IMC_SETCONVERSIONMODE
    LPARAM IParam
    )
 */
// var hwnd = GetForegroundWindow()
// var defaultIMEWnd = ImmGetDefaultIMEWnd(hwnd)
// // 1025 代表中文状态 0 代表英文
// SendMessageW(defaultIMEWnd, 0x283, 0x002, 1025);

// setTimeout(() => {
//     SendMessageW(defaultIMEWnd, 0x283, 0x002, 0);
// }, 2000)
// console.log(SendMessageW(defaultIMEWnd, 0x283, 0x001, 0));