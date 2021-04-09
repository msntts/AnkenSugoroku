import { Injectable } from '@angular/core';


// コンフィグデータのインターフェース定義
export interface configData {
  fontsize: number; // 表示フォントサイズ
}

@Injectable({
  providedIn: 'root'
})


export class ConfigService {

  // コンフィグレーションのキー
  private readonly key = 'config';

  // コンフィグレーションを格納するデータ(初期値)
  private data: configData = {
    fontsize: 16
  };

  constructor() {
    // データ読み込み
    this.load();
  }

  // Getter/Setter

  // フォントサイズ
  public getFontSize(): number { console.log(this.data.fontsize); return this.data.fontsize; }
  public setFontSize(fontsize: number) { this.data.fontsize = fontsize; this.save(); }

  /**
   * localstorageにデータを保存する
   */
  public save(): boolean {
    // 回答レコードをローカルストレージに保存
    let str_json1 = JSON.stringify(this.data);
    this.setItem(this.key, str_json1);
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
