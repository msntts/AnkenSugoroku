/**
 * 履歴情報をまとめたクラス
 */
export class HistoryModel {
    /** 駒ID */
    private pieceId: number;

    /** 履歴ID */
    private historyId: number;

    /** 作成日時 */
    private date: string;

    /** 移動元マスID */
    private from: number;

    /** 移動先マスID */
    private to: number;

    /** コメント */
    private comment: string;

    /**
     * コンストラクタ
     * @param pieceId 駒ID
     * @param historyId 履歴ID
     * @param date 作成日時
     * @param from 移動元マスID
     * @param to 移動先マスID
     * @param comment コメント
     */
    constructor(
        pieceId: number,
        historyId: number,
        date: string,
        from: number, to: number,
        comment: string) {
        this.pieceId = pieceId;
        this.historyId = historyId;
        this.date = date;
        this.from = from;
        this.to = to;
        this.comment = comment;
    }

    public get PieceId(): number {
      return this.pieceId;
    }

    public get HistoryId(): number {
       return this.historyId;
    }

    public get Date(): string {
        return this.date;
    }

    public get From(): number {
        return this.from;
    }

    public get To(): number {
        return this.to;
    }

    public get Comment(): string {
        return this.comment;
    }
}
