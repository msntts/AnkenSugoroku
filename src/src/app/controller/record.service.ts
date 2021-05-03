import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HistoryModel } from '../model/history.model'

// レコードデータのインターフェース定義
export interface recordData {
  moverecord: elemMoveRecord[]    // 移動履歴
  status: elemPieceStatus[]       // 駒の現在情報（ステータス）
}

export interface elemMoveRecord{
  piece_id: number    // 駒のID
  date: string,       // 移動した日時（ISO形式）
  from_id: number,    // 移動元のマスのID
  to_id: number,      // 移動先のマスのID
}

export interface elemPieceStatus{
  piece_id: number    // 駒のID
  square_id: number   // 駒の現在位置
  name: string        // 名前
  url_img_skill: string     // 技術画像のURL
  url_img_project: string  // 案件画像のURL
}


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  // レコードデータのキー
  private readonly key = 'record';

  // レコードデータを格納するデータ(初期値)
  private data: recordData = {
    moverecord: [],
    status: [
      {piece_id: 1, square_id: 1, name: "No.1", url_img_skill:"assets/car.png", url_img_project:"assets/person.png"},
      {piece_id: 2, square_id: 2, name: "No.2", url_img_skill:"assets/car2.png", url_img_project:"assets/person2.png"},
      {piece_id: 3, square_id: 3, name: "No.3", url_img_skill:"assets/car3.png", url_img_project:"assets/person3.png"},
    ]
  };


  constructor() {
    // データ読み込み
    this.load();
  }

  // 駒の数を返す
  public getNumOfPieces(){
    return this.data.status.length;
  }

  // すべての駒のステータス情報リストを取得する
  public getLatestSquareIdList(): elemPieceStatus[]{
    return this.data.status;
  }

  /**
   *  駒のステータスを取得する
   * @param piece_id ステータスを取得したい駒のID
   * @returns 取得した駒のステータス
   */
  public getPieceStatus(piece_id: number): elemPieceStatus{
    for(let i=0 ; i < this.data.status.length ; i++){
      if(this.data.status[i].piece_id == piece_id) {
        return this.data.status[i];
      }
    }
    // 見つからない場合は、nullを返す
    return null;
  }


  // 駒の位置を取得する
  public getLatestSquareId(piece_id: number){
    for(let i=0 ; i < this.data.status.length ; i++){
      if(this.data.status[i].piece_id == piece_id) {
        return this.data.status[i].square_id;
      }
    }
    // 見つからない場合は、初期位置を返す
    return 1;
  }

  // 駒の位置をセットする
  public setLatestSquareId(piece_id:number, square_id: number)
  {
    for(let i=0 ; i < this.data.status.length ; i++){
      if(this.data.status[i].piece_id == piece_id) {
        this.data.status[i].square_id = square_id;
        this.save();
        return;
      }
    }
  }

  /** 移動履歴を追加 */
  public addMoveRecord(piece_id: number, fromid: number, toid: number){
    let nowtime: string = new Date().toISOString()
    let data: elemMoveRecord = {
      piece_id: piece_id,
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

    // 暫定的なデータ補正処置 開始
    for(let i = 0 ; i < this.data.status.length ; i++){
      if(this.data.status[i].url_img_skill === "" ){
        this.data.status[i].url_img_skill = "assets/car.png";
      }
      if(this.data.status[i].url_img_project === "" ){
        this.data.status[i].url_img_project = "assets/person.png";
      }
    }
    // =======================================
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


  public getPieceHistories(piece_id: number): Array<HistoryModel> {
    let histories = new Array<HistoryModel>();

    // TODO 問い合わせをかける。IDが存在してなかったら空の配列を返す
    // TODO 開発中
    histories.push(new HistoryModel("1986/03/04", piece_id, 2, '👶'));

    return histories;
  }
}
