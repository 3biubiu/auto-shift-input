# auto-shift-input 

一个vscode插件,能够实现根据光标位置自动切换中英文输入

![Video_20231109_092940_467.gif](https://s2.loli.net/2023/11/09/IQAxUqhCFEdDHjN.gif)

## Features

获取 vscode 的 TextMate 分词引擎的词法作用域判断当前光标是否处于注释语句中,从而达到自动切换中英文输入的目的. ,目前支持win平台,默认兼容微软输入法,其他输入法如果不起作用请尝试修改 `SetParam` 字段为 `6`.

> 同时  YF-Zhao 大佬的文章对本插件开发有着非常大的助力,插件的核心功能基于大佬的方案改进而来

## Requirements

 此插件运行依赖 `HyperScopes Booster` 插件:

[HyperScopes Booster]: https://marketplace.visualstudio.com/items?itemName=yfzhao.hscopes-booster

请务必安装

## Extension Settings

```json
"Settings.ChineseModeCode": {
  "type": "number",
  "default": 1025,
  "description": "如果想实现其他的语言的自动切换 请修改此值,默认为中文(1025)"
},
"Settings.EnglishModeCode": {
  "type": "number",
  "default": 0,
  "description": "如果想实现其他的语言的自动切换 请修改此值, 默认为英文(0)"
},
"Settings.GetParam": {
  "type": "number",
  "default": 1,
  "description": "检测输入法状态,默认为微软输入法(0x001)"
},
"Settings.SetParam": {
  "type": "number",
  "default": 2,
  "description": "切换输入法状态,默认为微软输入法(2),QQ/搜狗等(6)"
}
```

## Plan

- 尝试兼容Linux

