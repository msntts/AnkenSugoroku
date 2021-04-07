import { DisplayItemBase } from './display-item-base.model';

/**
 * マスの情報をまとめたクラス
 */
export class DisplayItemSquare extends DisplayItemBase {
    /** 表示内容 */
    private content: string;
    /** 幅 */
    private width: number;
    /** 高さ */
    private height: number;
    /** 色 */
    private color: string;
    /** 背景色 */
    private backgroundColor: string;

    /**
     * Getters & Setters
     */
    public get Content(): string {
        return this.content;
    }
    public get Width(): number {
        return this.width;
    }
    public get Height(): number {
        return this.height;
    }
    public get Color(): string {
        return this.color;
    }
    public get BackgroundColor(): string {
        return this.backgroundColor;
    }

    /**
     * コンストラクタ
     * @param id id
     * @param width 幅
     * @param height 高さ
     * @param content 表示内容
     * @param color 色
     * @param backgroundColor 背景色
     */
    constructor(id: number, width: number, height: number, content: string, color: string, backgroundColor: string) {
        super(id);

        this.width = width;
        this.height = height;
        this.content = content;
        this.color = color;
        this.backgroundColor = backgroundColor;
    }
}
