import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BoardDataModel } from '../model/board-data.model';
import { DisplayItemSquare } from '../model/display-item-square.model';
import { DisplayItemLine } from '../model/display-item-line.model';

/**
 * 盤の情報を管理するクラス
 */
@Injectable({
    providedIn: 'root',
})
export class BoardDataService {

    /** 駒が進める方向を両方向にするか、片方向とするかの制御フラグ */
    private readonly moveBidirection: boolean = true;

    /** 盤情報モデル */
    private boardDataModel: BoardDataModel = new BoardDataModel();

    /** subject生成 */
    private subject = new Subject();

    /** Getter observableを取得する */
    public get observable() {
        return this.subject.asObservable();
    }

    /**
     * コンストラクタ
     */
    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * ファイルからデータを読み込む
     * @returns データ
     */
    public fetchData() {
        // ファイルから読みこむ
        this.http.get('assets/BoardData.json', {responseType: 'text'})
        .subscribe(
            data => {
                // データをセットする
                this.boardDataModel.setData(data);
                // 購読先に通知する
                this.subject.next();
            },
            error => {
                this.subject.error(error);
            }
        );
    }

    /**
     * キャンバスの幅を取得する
     * @returns キャンバスの幅
     */
     public getCanvasWidth(): number {
        return this.boardDataModel.Width;
    }

    /**
     * キャンバスの高さを取得する
     * @returns キャンバスの高さ
     */
     public getCanvasHeight(): number {
        return this.boardDataModel.Height;
    }

    /**
     * 全てのマス情報を取得する
     * @returns マス情報
     */
     public getSquares(): Array<DisplayItemSquare> {
        return this.boardDataModel.Squares;
    }

    /**
     * 全てのマス情報から指定されたIDのマス情報を取得する
     * @param squareId マスID
     * @returns マス情報
     */
    public findSquare(squareId: number): DisplayItemSquare {
        return this.boardDataModel.findSquare(squareId);
    }

    /**
     * 全ての線情報を取得する
     * @returns 線情報
     */
     public getLines(): Array<DisplayItemLine> {
        return this.boardDataModel.Lines;
    }

    /**
     * 指定したIDが接続しているマスIDを取得する
     * @param squareId 対象のID
     */
    public getConnectedSquares(squareId: number): Array<number> {
      let connected = new Array<number>();

      this.boardDataModel.Lines.forEach(line => {
        if(line.sourceId === squareId) {
          connected.push(line.targetId);
        }
        // 両方向への移動が可能な設定の場合は、逆方向も検索する
        if(this.moveBidirection){
          // 逆方向
          if (line.targetId === squareId) {
              connected.push(line.sourceId);
          }
      }
      });

      return connected;
    }
}
