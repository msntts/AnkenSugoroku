import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DisplayItemModel } from '../model/display-item.model';
import { DisplayItemSquare } from '../model/display-item-square.model';

/**
 * 表示項目を管理するクラス
 */
@Injectable({
    providedIn: 'root',
})
export class DisplayItemService {
    /** 表示項目モデル */
    private displayItemModel: DisplayItemModel = new DisplayItemModel();

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
     * ファイルから読み込んだ文字列データを返す
     * @returns データ
     */
    public getData(): Promise<Array<DisplayItemSquare>> {
        return new Promise<Array<DisplayItemSquare>> ((resolve, reject) => {
            // ファイルから読みこむ
            this.http.get('assets/SquareData.json', {responseType: 'text'})
            .subscribe(
                data => {
                    // データをセットする
                    this.displayItemModel.setData(data);
                    // 表示するマスの情報を返す
                    return resolve(this.displayItemModel.getSquares());
                },
                error => {
                    return reject(error);
                }
            );
        });
    }

    /**
     * 全てのマス情報から指定されたIDのマス情報を取得する
     * @param squareId マスID
     * @returns マス情報
     */
    public findSquare(squareId: number): DisplayItemSquare {
        return this.displayItemModel.findSquare(squareId);
    }
}
