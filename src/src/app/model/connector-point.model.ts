/**
 * 座標クラス
 */
export class Point {
    /** x */
    public x: number;
    /** y */
    public y: number;

    /**
     * コンストラクタ
     * @param x x座標
     * @param y y座標
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

/**
 * 接続点クラス
 */
export class ConnectorPoint {
    /** 上 */
    public top: Point;
    /** 左 */
    public left: Point;
    /** 右 */
    public right: Point;
    /** 下 */
    public bottom: Point;

    /**
     * コンストラクタ
     * @param x 矩形の左上のx座標
     * @param y 矩形の左上のy座標
     * @param width 矩形の幅
     * @param height 矩形の高さ
     */
    constructor(x: number, y: number, width: number, height: number) {
        // 各々の中点を求める
        const middleX = x + width / 2;
        const middleY = y + height / 2;

        this.top = new Point(middleX, y);
        this.left = new Point(x, middleY);
        this.right = new Point(x + width, middleY);
        this.bottom = new Point(middleX, y + height);
    }
}