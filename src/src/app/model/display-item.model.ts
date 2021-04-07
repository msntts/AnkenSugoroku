import { DisplayItemSquare } from './display-item-square.model';

/**
 * 表示する情報をまとめたクラス
 */
export class DisplayItemModel {
    /** マス情報 */
    private squareList = new Array<DisplayItemSquare>();

    /**
     * マスの情報を設定する
     * @param content 設定するグループ情報
     */
    public setData(content: string) {
        this.squareList = [];

        try {
            const contentJson = JSON.parse(content);

            contentJson.squares.forEach(element => {
                const square = new DisplayItemSquare(element.id, element.width, element.height,
                    element.content, element.color, element.backgroundColor);
                square.setPosition(element.x, element.y);
                this.squareList.push(square);
            });
        } catch(error) {
            alert(`Can't read square data file: [${error}]`);
        }
    }

    /**
     * マス情報を取得する
     */
    public getSquares(): Array<DisplayItemSquare> {
        return this.squareList;
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
