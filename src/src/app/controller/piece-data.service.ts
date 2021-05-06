import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subject, Subscription } from 'rxjs';
import { HistoryModel } from '../model/history.model'
import { PieceDataModel } from '../model/piece-data.model'

@Injectable({
  providedIn: 'root'
})
export class PieceDataService {
  /** 駒が移動したことを通知する */
  private pieceSelectionChangedSubject = new Subject<number>();

  /** 駒情報が更新されたことを通知する */
  private piecesUpdatedSubject = new Subject();

  /** 駒情報 */
  private pieces: Array<PieceDataModel> = new Array<PieceDataModel>();

  /** タイマー */
  private intervalSubscription: Subscription = null;

  constructor(
    private http : HttpClient) {}

  /**
   * 駒情報取得のポーリングを実施する
   */
  public startPoling() {
    // タイマーが起動されている場合はとめる
    this.stopPoling();

    // 最初にデータを取得する
    this.fetchData();

    // TODO: 更新周期を決めてください（とりあえず1分にしてます）
    const timer = interval(60000);
    this.intervalSubscription = timer.subscribe(() => {
      // タイマー間隔でデータを取得する
      this.fetchData();
    });

    return true;
  }

  /**
   * ポーリングを終了する
   */
  public stopPoling(): void {
    if (this.intervalSubscription != null) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  /**
   * データ読み込み
   */
  public fetchData(): void {
    // 現在の情報を削除
    this.pieces = [];

    // データ読み込み
    const subscription = this.http.get('pieces/', {responseType: 'text'})
    .subscribe(
      resp => {
        this.pieces = new Array<PieceDataModel>();
        for (const piece of JSON.parse(resp)) {
          this.pieces.push(new PieceDataModel(
            piece.id,
            piece.position,
            piece.name,
            piece.url_img_project,
            piece.url_img_skill
          ));
        }
        this.piecesUpdatedSubject.next();
        subscription.unsubscribe();
      }
    );
  }

  /**
   * 駒情報が更新されたことを購読させるための何か
   */
  public get piecesUpdated$() {
    return this.piecesUpdatedSubject.asObservable();
  }

  /**
   * 駒が移動されたことを通知するトリガ
   * @param piece_id 移動した駒
   * @returns void
   */
  public notifyPieceActivationChanged(pieceId: number) {
    return this.pieceSelectionChangedSubject.next(pieceId);
  }

  /**
   * 駒が移動したことを購読させるための何か
   */
   public get pieceSelectionChanged$() {
    return this.pieceSelectionChangedSubject.asObservable();
  }

  // すべての駒のステータス情報リストを取得する
  public getLatestSquareIdList(): Array<PieceDataModel> {
    return this.pieces;
  }

  /**
   * 駒のステータスを取得する
   * @param pieceId ステータスを取得したい駒のID
   * @returns 取得した駒のステータス
   */
  public getPieceStatus(pieceId: number): PieceDataModel {
    const piece = this.pieces.find((piece: PieceDataModel) => piece.PieceId === pieceId);
    if (piece != null) {
      return piece;
    }

    // 見つからない場合は、nullを返す
    return null;
  }

  /**
   * 駒の位置を取得する
   * @param pieceId ステータスを取得したい駒のID
   */
  public getLatestSquareId(pieceId: number): number {
    const piece = this.pieces.find((piece: PieceDataModel) => piece.PieceId === pieceId);
    if (piece != null) {
      return piece.Position;
    }
 
    // 見つからない場合は、初期位置を返す
    return 1;
  }


  /** 
   * 駒の位置を更新する
   * @param pieceId ステータスを更新したい駒のID
   * @param fromId 更新元マスのID
   * @param toId 更新先マスのID
   */
  public updatePiecePosition(pieceId: number, fromId: number, toId: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const params = {
        from_id: fromId,
        to_id: toId
      };

      // API発行
      this.http.put(`pieces/${pieceId}/position`, params).subscribe(
        () => {
          // putが成功したら、戻り値は無視。イベントを発行してデータを更新
          this.pieceSelectionChangedSubject.next(pieceId);
          resolve(pieceId);
        },
        error => {
          this.pieceSelectionChangedSubject.error(error);
          reject(error);
        });
    });
  }

  /**
   * 指定した駒の履歴情報を取得する
   * @param pieceId 履歴を取得する駒のID 
   * @returns 
   */
  public getPieceHistories(pieceId: number): Promise<Array<HistoryModel>> {
    return new Promise<Array<HistoryModel>>((resolve, reject) => {
      // API発行
      this.http.get(`histories/${pieceId}`, {responseType: 'text'}).subscribe(
        hsts => {
          const histories = new Array<HistoryModel>();
          for (const history of JSON.parse(hsts)) {
            histories.push(new HistoryModel(
              history.history_id,
              history.date,
              history.move_from,
              history.move_to,
              history.comment));
          }
          resolve(histories);
        },
        error => {
          reject(error);
        });
    });
  }
}
