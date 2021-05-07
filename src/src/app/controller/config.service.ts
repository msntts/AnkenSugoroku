import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// コンフィグデータのインターフェース定義
export interface configData {
  fontsize: number; // 表示フォントサイズ
  moveAnimationEnable: boolean,  // 駒移動時のアニメーションを許可
  enableHtml: boolean   // HTMLタグの表示を許可
}

@Injectable({
  providedIn: 'root'
})


export class ConfigService {

  // コンフィグレーションのキー
  private readonly key = 'config';

  // コンフィグレーションを格納するデータ(初期値)
  private data: configData = {
    fontsize: 12,
    moveAnimationEnable: true,
    enableHtml: true
  };

  /** subject生成 */
  private subject = new Subject();

  constructor() {
    // データ読み込み
    this.load();
  }

  /**  ================================= Getter/Setter ================================= */

  // フォントサイズ
  public get fontSize(): number { return this.data.fontsize; }
  public set fontSize(fontsize: number) { this.data.fontsize = fontsize; this.save(); }

  // moveAnimationEnable
  public get moveAnimationEnable(): boolean { return this.data.moveAnimationEnable; }
  public set moveAnimationEnable(val: boolean) { this.data.moveAnimationEnable = val; this.save(); }

  // enableHtml
  public get enableHtml(): boolean { return this.data.enableHtml; }
  public set enableHtml(val: boolean) { this.data.enableHtml = val; this.save(); }

  /** observableを取得する */
  public get observable() {return this.subject.asObservable();}


  /**
   * localstorageにデータを保存する
   */
  public save(): boolean {
    // 回答レコードをローカルストレージに保存
    let str_json1 = JSON.stringify(this.data);
    this.setItem(this.key, str_json1);

    // 購読先に通知
    this.subject.next();
    return true;
  }

  /**
   * localstorageからデータを読みだす
   */
  public load(): boolean {
    // データをローカルストレージから読みだす
    let str_json1 = this.getItem(this.key, "")
    //console.log(str_json1);

    // 読みだしたデータをセット
    if (str_json1 != "" && str_json1 != "[]") {
      this.data = JSON.parse(str_json1)
    } else {
      console.log("ローカルストレージに コンフィグデータはありません。")
      this.save();
    }

    // 不足データの修正
    if(this.data.enableHtml==undefined){this.data.enableHtml = true;}
    if(this.data.moveAnimationEnable==undefined){this.data.moveAnimationEnable = true;}
    if(this.data.fontsize==undefined){this.data.fontsize=12};
    return true;
  }



  /**
   * ローカルストレージから指定したキーの値を取得する
   * @param key キー
   * @param defaultValue キーで指定した値が存在しない場合のデフォルトの値
   */
  private getItem(key: string, defaultValue: string): string {
    let value = localStorage.getItem(key);
    if (value == null || value.length === 0) {
      value = defaultValue;
    }
    return value;
  }

  /**
   * ローカルストレージに指定したキーで値を設定する
   * @param key キー
   * @param value 値
   */
  private setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

}
