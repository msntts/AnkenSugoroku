import { DisplayItemLine } from './display-item-line.model';
import { DisplayItemSquare } from './display-item-square.model';

/**
 * 盤に表示する情報をまとめたクラス
 */
export class BoardDataModel {
    /** 幅 */
    private width: number;
    /** 高さ */
    private height: number;
    /** マス情報 */
    private squareList = new Array<DisplayItemSquare>();
    /** 線情報 */
    private lineList = new Array<DisplayItemLine>();

    /**
     * Getters
     */
    public get Width(): number {
        return this.width;
    }
    public get Height(): number {
        return this.height;
    }
    public get Squares(): Array<DisplayItemSquare> {
        return this.squareList;
    }
    public get Lines(): Array<DisplayItemLine> {
        return this.lineList;
    }

    /**
     * マスの情報を設定する
     * @param content 設定するグループ情報
     */
    public setData(content: string) {
        this.squareList = [];
        this.lineList = [];

        try {
            const contentJson = JSON.parse(content);

            // 幅と高さを設定
            this.width = contentJson.board.width;
            this.height = contentJson.board.height;

            // マス情報を設定
            contentJson.squares.forEach(element => {
                // 基本情報を設定
                const square = new DisplayItemSquare(element.id, element.width, element.height,
                    element.content, element.color, element.backgroundColor);
                // 位置情報を設定
                square.setPosition(element.x, element.y);
                // リストに追加
                this.squareList.push(square);
            });

            // 線情報を設定
            contentJson.lines.forEach(element => {
                // 基本情報を設定
                const line = new DisplayItemLine(element.sourceId, element.sourcePoint,
                    element.targetId, element.targetPoint, element.connectType);
                // リストに追加
                this.lineList.push(line);
            });
        } catch(error) {
            alert(`Can't read square data file: [${error}]`);
        }
    }

    /**
     * 全てのマス情報から指定されたIDのマス情報を取得する
     * @param squareId マスID
     * @returns マス情報
     */
    public findSquare(squareId: number): DisplayItemSquare {
        let square: DisplayItemSquare = null;
        // 全階層情報からネットワーク情報を取得し、ネットワーク情報からステーション情報を取得する
        this.squareList.some((item) => {
            if (item.Id === squareId) {
                square = item;
                return true;
            }
        });

        return square;
    }
}
