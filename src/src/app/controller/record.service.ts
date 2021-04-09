import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

// コンフィグデータのインターフェース定義
export interface recordData {
  moverecord: elemMoveRecord[]    // 移動履歴
  latest_square_id: number  // 最後にいたマスのID
}

export interface elemMoveRecord{
  date: string,       // 移動した日時（ISO形式）
  from_id: number,    // 移動元のマスのID
  to_id: number,      // 移動先のマスのID
}


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  // コンフィグレーションのキー
  private readonly key = 'record';

  // コンフィグレーションを格納するデータ(初期値)
  private data: recordData = {
    moverecord: [], 
    latest_square_id: 1
  };


  constructor() { 
    // データ読み込み
    this.load();
  }

  // Getter/Setter
  public getLatestSquareId(){if(this.data.latest_square_id) {return this.data.latest_square_id;}else{ return 1;}}
  public setLatestSquareId(id: number){this.data.latest_square_id = id; this.save();}

  /** 移動履歴を追加 */
  public addMoveRecord(fromid: number, toid: number){
    let nowtime: string = new Date().toISOString()
    let data: elemMoveRecord = {
      date: nowtime,
      from_id: fromid,
      to_id: toid,
    }
    this.data.moverecord.push(data)    
    this.save();
  }

  /**
   * 暫定としてlocalstorageにデータを保存する
   */
   public save(): boolean {
    // 回答レコードをローカルストレージに保存
    let str_json1 = JSON.stringify(this.data);
    this.setItem(this.key, str_json1);
    return true;
  }

  /**
   * 暫定としてlocalstorageからデータを読みだす
   */
  public load(): boolean {
    // データをローカルストレージから読みだす
    let str_json1 = this.getItem(this.key, "")
    //console.log(str_json1);  

    // 読みだしたデータをセット
    if (str_json1 != "" && str_json1 != "[]") {
      this.data = JSON.parse(str_json1)
    } else {
      console.log("ローカルストレージに レコードはありません。")
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
