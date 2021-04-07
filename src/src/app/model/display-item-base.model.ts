/**
 * 表示するコンポーネントのベースクラス
 */
export class DisplayItemBase {
    /** 識別子 */
    private id: number;
    // 表示位置のx座標
    private x: number;
    // 表示位置のy座標
    private y: number;
    // Zインデックス
    private zIndex: number;

    /**
     * Getters
     */
    public get Id(): number {
        return this.id;
    }
    public get X(): number {
        return this.x;
    }
    public get Y(): number {
        return this.y;
    }
    public get ZIndex(): number {
        return this.zIndex;
    }
    /**
     * Setters
     */
    public set ZIndex(value: number) {
        this.zIndex = value;
    }

    /**
     * コンストラクタ
     * @param id 識別子
     */
    constructor(id: number) {
        this.id = id;

        this.setPosition(0, 0);
    }

    /**
     * 表示位置を設定する
     * @param x x座標
     * @param y y座標
     */
    public setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
