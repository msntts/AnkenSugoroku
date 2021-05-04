import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HistoryModel } from '../model/history.model'
import { PieceDataModel } from '../model/piece-data.model'

@Injectable({
  providedIn: 'root'
})
export class PieceDataService {
  /** 駒が移動したことを通知する */
  private pieceSelectionChangedSubject = new Subject<number>();

  /* 駒情報が更新されたことを通知する */
  private piecesUpdatedSubject = new Subject();

  private pieces: Array<PieceDataModel>;

  constructor(
    private http : HttpClient) {}

  public updatePieces(): void {
    // データ読み込み
    this.http.get('pieces/', {responseType: 'text'})
    .subscribe(
      resp => {
        this.pieces = new Array<PieceDataModel>();
        for(const piece of JSON.parse(resp)){
          this.pieces.push(new PieceDataModel(
            piece.id,
            piece.position,
            piece.name,
            piece.url_img_project,
            piece.url_img_skill
            ));
          }
        this.piecesUpdatedSubject.next();
        });
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
   public notifyPieceActivationChanged(piece_id: number) {
    return this.pieceSelectionChangedSubject.next(piece_id);
  }

  /**
   * 駒が移動したことを購読させるための何か
   */
   public get pieceSelectionChanged$() {
    return this.pieceSelectionChangedSubject.asObservable();
  }

  // すべての駒のステータス情報リストを取得する
  public getLatestSquareIdList(): Array<PieceDataModel>{
    return this.pieces;
  }

  /**
   *  駒のステータスを取得する
   * @param piece_id ステータスを取得したい駒のID
   * @returns 取得した駒のステータス
   */
  public getPieceStatus(piece_id: number): PieceDataModel{
      for(const piece of this.pieces) {
        if(piece.PieceId == piece_id) {
          return piece;
        }
      }
    // 見つからない場合は、nullを返す
    return null;
  }

  // 駒の位置を取得する
  public getLatestSquareId(piece_id: number): number{
    for(const piece of this.pieces) {
      if(piece.PieceId == piece_id) {
        return piece.Position;
      }
    }
    // 見つからない場合は、初期位置を返す
    return 1;
  }


  /** 駒の位置を更新する */
  public updatePiecePosition(pieceId: number, fromId: number, toId: number): boolean{
    let succeeded = true;
    this.http.put(`pieces/${pieceId}/position`,
    {
      from_id: fromId,
      to_id: toId
    })
      .subscribe(
        () => {
          // putが成功したら、戻り値は無視。イベントを発行してデータを更新
          this.pieceSelectionChangedSubject.next(pieceId);
        },
        error => {
          this.pieceSelectionChangedSubject.error(error);
          succeeded = false;
        }
      );

      return succeeded;
  }

  public getPieceHistories(piece_id: number): Array<HistoryModel> {
    let histories = new Array<HistoryModel>();

    this.http.get(`histories/${piece_id}`, {responseType: 'text'})
    .subscribe(
      hsts => {
        for(const history of JSON.parse(hsts)) {
          histories.push(new HistoryModel(
            history.history_id,
            history.date,
            history.move_from,
            history.move_to,
            history.comment));
        }
      },
      error => {
        // TODO
      });

    return histories;
  }
}
