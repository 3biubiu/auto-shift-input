import {Position, Range, TextDocument, window} from 'vscode';
export function statusbarLogger(mes:string) {
  window.setStatusBarMessage(mes);
}

export function showInfo(str: string, res = 'Continue', rej = 'Exit') {
  return new Promise(function (resolve, reject) {
    window.showInformationMessage(str, res, rej).then(result => {
      (result === res) ? resolve(res) : reject(rej);
    });
  });
}

export function getCharinRange(doc: TextDocument, curPos: Position, lBound: number, rBound: number){
  let range = new Range(curPos.line, curPos.character - lBound, curPos.line, curPos.character + rBound);
  return doc.getText(range);
}