// 实现一个英文切换中文的效果
const ffi = require('ffi-napi');

const user32 = new ffi.Library("user32", {
    "SendMessageW": ['int32', ['long', 'int32', 'int32', 'int32']],
    "GetForegroundWindow": ["int32", []]
});

const imm = new ffi.Library("imm32", {
    "ImmGetDefaultIMEWnd": ["int32", ["int32"]]
});
/**
 * 
 * @param wParam 获取输入法状态的索引值,不同输入法可能有差异
 * @param lParam 中英文状态码
 */
export function switchInput(wParam: any, lParam: any) {
    let hwnd = user32.GetForegroundWindow()
    let defaultIMEWnd = imm.ImmGetDefaultIMEWnd(hwnd)
    return user32.SendMessageW(defaultIMEWnd, 0x283, wParam, lParam);
}
/**
 * LRESULT SendMessageW (
    HWND hWnd,
    UINT Msg,      // 0x283 信息代表的是 WM_IME_CONTROL ，即“控制输入法”
    WPARAM wParam, // 0x001 检测输入法状态,此时LPARAM可以不给 0x002是微软的IMC_SETCONVERSIONMODE(控制中英文状态), 0x006是搜狗和QQ输入法切换的IMC_SETCONVERSIONMODE
    LPARAM IParam
    )
 */
// var hwnd = user32.GetForegroundWindow()
// var defaultIMEWnd = imm.ImmGetDefaultIMEWnd(hwnd)
// // 1025 代表中文状态 0 代表英文
// user32.SendMessageW(defaultIMEWnd, 0x283, 0x002, 1025);

// setTimeout(() => {
//     user32.SendMessageW(defaultIMEWnd, 0x283, 0x002, 0);
// }, 2000)
// console.log(user32.SendMessageW(defaultIMEWnd, 0x283, 0x001, 0));