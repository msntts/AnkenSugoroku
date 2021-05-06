/**
 * 履歴情報をまとめたクラス
 */
export class HistoryModel {
    /** ID */
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
     * @param historyId ID
     * @param date 作成日時
     * @param from 移動元マスID
     * @param to 移動先マスID
     * @param comment コメント
     */
    constructor(historyId: number,
        date: string,
        from: number, to: number,
        comment: string) {
        this.historyId = historyId;
        this.date = date;
        this.from = from;
        this. to = to;
        this.comment = comment;
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
