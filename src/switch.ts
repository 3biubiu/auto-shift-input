// 实现一个英文切换中文的效果
// const ffi = require('ffi-napi');
// const ffi = require('@lwahonen/ffi-napi')
const ffi = require('@breush/ffi-napi');

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
