import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, ReplaySubject, Subject, Subscription, Observable } from 'rxjs';
import { delay} from 'rxjs/operators';
import { HistoryModel } from '../model/history.model';
import { PieceDataModel } from '../model/piece-data.model';

/////////////////////////////////////////////////////////////////////////////////////////////////
// AnkenSugoroku をサーバーレスで使用すための httpclient のスタブクラスです。
// 実際のサーバーにhttpクライアントでアクセスする代わりに、localstorageを使用してデータを保管し、サーバー応答を模擬します。
// Note: 現時点では、piece-data.serviceのスタブのみとなります。
//       image.serviceには使用できませんのでご注意ください。
// 
// [使用方法]
//  1. 下記を追加してください
//     import { StubHttpClientService } from '../controller/stub-http-client.service';
//  2. コンストラクタで下記を変更してください
//      "private http : HttpClient"   ->  "private http : StubHttpClientService"
//
// [注意事項]
// 使用する場合は、environment.ts で定義されている "isMock" は、falseとしてください。
/////////////////////////////////////////////////////////////////////////////////////////////////


// コマの移動履歴
interface elemHistoryData{
  history_id: number;
  date: string;
  move_from: number;
  move_to: number;
  comment: string;
}


@Injectable({
  providedIn: 'root'
})
export class StubHttpClientService {
  //constructor(handler: any);

  /**
   * http.getのスタブ関数
   * @param url 
   * @param params 
   * @returns 
   */
  public get(url: string, params: any): Observable<string> {
    console.log("get:" + url);
    if(url.match(/pieces/)){
        // コマの情報
        return new Observable(observer => {
          // JSONを返す
          let value = localStorage.getItem(url)
          if (value == null || value.length === 0) {
            // データがない場合は、初期データを作成する
            value =  JSON.stringify([
              {
                "id": 1,
                "name": "first",
                "position": 1,
                "url_img_project": "assets/person.png",
                "url_img_skill": "assets/car.png"
              },
              {
                "id": 2,
                "name": "second2",
                "position": 1,
                "url_img_project": "assets/person2.png",
                "url_img_skill": "assets/car2.png"
              }
            ]);
            localStorage.setItem(url,value)
          }

          setTimeout(() => {
            observer.next(value);
            observer.complete();
          }, 10);

          return {unsubscribe() {}};
        })  
  
    }else if(url.match(/histories/)){
      // コマの履歴
      let tmp = url.match(/^histories\/(\d+)/);
      let pieceId = tmp[1];
      return new Observable(observer => {
        let value = localStorage.getItem(url)
        if (value == null || value.length === 0) {
          // データがない場合は初期データを作成する。
          value = "[{}]";
        }
        setTimeout(() => {
          observer.next(value);
          observer.complete();
        }, 10);
        return {unsubscribe() {}};
      })
    }else{
      // その他
      return new Observable(observer => {
        // JSONを返す
        let value = localStorage.getItem(url)
        if (value == null || value.length === 0) {
          // 空っぽのデータ
          value = "[{}]";
        }
        observer.next(value);
        observer.complete();
      })  
    }


  };

  /**
   * 
   * @param url http.putのスタブ関数
   * @param data 
   * @param data3 
   * @returns 
   */
  public put(url: string, data: any, data3?: any): Observable<string> {
    console.log("put: " + url + ":" + data);
    // console.log(JSON.stringify(data))

    if(url.match(/^pieces\/\d+\/position/)){
      // 座標の更新
      let tmp = url.match(/^pieces\/(\d+)\/position/);
      this.updatePosition(Number(tmp[1]), data.to_id, data.from_id);

    }else if(url.match(/^histories\/\d+\/\d+/)){
      // 駒の履歴の更新
      let tmp = url.match(/^histories\/(\d+)\/(\d+)/);
      this.updateHistoryData(Number(tmp[1]), Number(tmp[2]), data.comment)
    }else{
      console.log('unknown')
    }

    // ダミーデータを返す
    return new Observable(observer => {      
      observer.next("1");
      observer.complete();
    })
  }

  /**
   * 
   * @param url http.deleteのスタブ関数
   * @param params 
   * @returns 
   */
  public delete(url: string, params: any): Observable<string> {
    console.log("delete: " + url);
    if(url.match(/^pieces\/\d+\/position/)){
      // 駒の削除
      console.log('notimplemented')
    }else if(url.match(/^histories\/\d+\/\d+/)){
      // 駒の履歴情報
      let tmp = url.match(/^histories\/(\d+)\/(\d+)/);
      this.deleteHistoryData(Number(tmp[1]), Number(tmp[2]))
    }else{
      console.log('unknown')
    }

    // ダミーデータを返す
    return new Observable(observer => {
      // JSONを返す
      setTimeout(() => {
        observer.next("1");
        observer.complete();
      }, 10);

    })
  }

  /**
   * 
   * @param url http.postのスタブ関数
   * @param data 
   * @param data3 
   * @returns 
   */
  public post(url: string, data: any, data3?:any): Observable<string>{
    console.log("post: " + url)

    if(url === 'project-images/'){
      // not implemented
    }else if(url === 'skill-images/'){
      // not implemented
    }

    // ダミーデータを返す
    return new Observable(observer => {
      localStorage.setItem(url, data)
      // JSONを返す
      observer.next("1");
      observer.complete();
    })

  }

  /****************************************************************************************************/

  /**
   * 駒の位置を更新する
   * @param pieceId 
   * @param newPos 
   * @param oldPos 
   */
  private updatePosition(pieceId: number, newPos: number, oldPos: number){
    //console.log("updatePosition pieceId:" + pieceId + " , newPos:" + newPos)
    //console.log(json);

    let update = false;
    
    // コマ情報を取得
    let json = localStorage.getItem('pieces/');

    // データオブジェクトに変換
    if(json){      
      let data = JSON.parse(json);
      for(let i=0 ; i < data.length; i++){
        if(data[i].id === pieceId){
          data[i].position = newPos;
          update = true;
          break;
        }
      }
      if(update){
        localStorage.setItem('pieces/', JSON.stringify(data));
        // console.log("Update: pieces")
      }else{
        console.log("Piece is not found.")
      }  
    }

    // 移動記録を更新する
    let history_url = 'histories/' + pieceId;
    //console.log("updating history data....")
    //console.log(history_url);

    let json2 = localStorage.getItem(history_url);
    let histories = new Array<elemHistoryData>();
    let newhistoryId = 0;
    if(json2 == null || json2.length === 0) {
      // 空っぽのデータ
      json2 = "[{}]";
    }else{
      for (const history of JSON.parse(json2)) {
        histories.push({
          history_id: history.history_id,
          date: history.date,
          move_from: history.move_from,
          move_to: history.move_to,
          comment: history.comment
        })
        newhistoryId = Math.max(newhistoryId, history.history_id);          
      }
    }

    // console.log("historyId:" + (newhistoryId + 1))
    histories.push({
      history_id: newhistoryId + 1,
      date: (new Date()).toISOString(),
      move_from: oldPos,
      move_to: newPos,
      comment: ""
    })
    localStorage.setItem('histories/'+pieceId, JSON.stringify(histories))
  }

  /**
   * 駒の履歴データを更新する
   * @param pieceId 
   * @param historyId 
   * @param comment 
   */
  private updateHistoryData(pieceId: number, historyId: number, comment: string)
  {
    // console.log("history updating...")
    // console.log("pieceId: " + pieceId + ", historyId:" + historyId + ", comment: " + comment)

    // 格納先のKEYを作成
    let history_url: string;
    history_url = "histories/" + pieceId 

    // ローカルストレージのデータを読み出す。
    let json = localStorage.getItem(history_url);

    let histories = new Array<elemHistoryData>();
    if(json == null || json.length === 0) {
      // 空っぽのデータ
      json = "[{}]";
    }else{
      for (let history of JSON.parse(json)) {

        if(history.history_id == historyId){
          // コメントを更新
          history.comment = comment;
          // console.log("comment updated!")
        }

        histories.push({
          history_id: history.history_id,
          date: history.date,
          move_from: history.move_from,
          move_to: history.move_to,
          comment: history.comment
        })
      }
      // ローカルストレージを更新
      localStorage.setItem(history_url, JSON.stringify(histories))
    }
  }

  /**
   * 駒の履歴データを削除する
   * @param pieceId 
   * @param historyId 
   */
  private deleteHistoryData(pieceId: number, historyId: number)
  {
    // console.log("history updating...")
    // console.log("pieceId: " + pieceId + ", historyId:" + historyId)

    // 格納先のurlを作成
    let history_url: string;
    history_url = "histories/" + pieceId 

    // ローカルストレージのデータを読み出す。
    let json = localStorage.getItem(history_url);

    let histories = new Array<elemHistoryData>();
    if(json == null || json.length === 0) {
      // 空っぽのデータ
      json = "[{}]";
    }else{
      for (let history of JSON.parse(json)) {
        if(history.history_id == historyId){
          // 削除
          // 削除する場合は何もしない
        }else{
          histories.push({
            history_id: history.history_id,
            date: history.date,
            move_from: history.move_from,
            move_to: history.move_to,
            comment: history.comment
          })  
        }

      }
      // ローカルストレージを更新
      localStorage.setItem(history_url, JSON.stringify(histories))

    }
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

