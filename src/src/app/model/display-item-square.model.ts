import { Point, ConnectorPoint } from './connector-point.model';
import { DisplayItemBase } from './display-item-base.model';
import { ConnectPointType } from './display-item-line.model';

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

    /**
     * 接続情報を追加する
     * @param targetId 接続先ID
     * @param sourcePoint 接続元座標種別文字列
     * @param targetPoint 接続先座標種別文字列
     * @param connectType 接続線種別文字列
     */
/*    public appendConnectInfo(targetId: number, sourcePoint: string, targetPoint: string, connectType: string): void {
        const connectInfo = new ConnectInfo(targetId, sourcePoint, targetPoint, connectType);
        this.connectInfo.push(connectInfo);
    }
*/
    /**
     * 接続先の位置情報を取得する
     * @param pointType ポイント種別
     * @returns 位置座標
     */
    public getConnectorPoint(pointType: ConnectPointType): Point {
        const connectorPoint = new ConnectorPoint(this.X, this.Y, this.Width, this.Height);
        switch (pointType) {
            case ConnectPointType.Top:
                return connectorPoint.top;
            case ConnectPointType.Left:
                return connectorPoint.left;
            case ConnectPointType.Bottom:
                return connectorPoint.bottom;
        }

        return connectorPoint.right;
    }
}
