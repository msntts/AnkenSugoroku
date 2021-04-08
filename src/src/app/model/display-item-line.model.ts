/**
 * 接続座標種別
 */
 export enum ConnectPointType {
    /** 上 */
    Top = 0,
    /** 左 */
    Left,
    /** 右 */
    Right,
    /** 下 */
    Bottom
}

/**
 * 接続線種別
 */
export enum ConnectLineType {
    /** 直線 */
    Direct = 0,
    /** 曲線 */
    Curve
}

/**
 * 接続情報
 */
export class DisplayItemLine {
    /** 接続元ID */
    public sourceId: number;
    /** 接続元の座標の種別 */
    public sourcePointType: ConnectPointType;
    /** 接続先ID */
    public targetId: number;
    /** 接続先の座標の種別 */
    public targetPointType: ConnectPointType;
    /** 接続線種別コード */
    public connectLineType: ConnectLineType;

    /**
     * コンストラクタ
     * @param sourceId 接続元ID
     * @param sourcePoint 接続元座標種別文字列
     * @param targetId 接続先ID
     * @param targetPoint 接続先座標種別文字列
     * @param connectType 接続線種別文字列
     */
    constructor(sourceId: number, sourcePoint: string, targetId: number, targetPoint: string, connectType: string) {
        // 接続元情報
        this.sourceId = sourceId;
        this.sourcePointType = this.convertConnectPointType(sourcePoint);
        // 接続先情報
        this.targetId = targetId;
        this.targetPointType = this.convertConnectPointType(targetPoint);

        switch (connectType.toLowerCase()) {
            case 'curve': 
                this.connectLineType = ConnectLineType.Curve;
                break;
            default:
                this.connectLineType = ConnectLineType.Direct;
                break;
        }
    }

    /**
     * 接続種別文字列からコードへ変換する
     * @param from 変換対象文字列
     * @returns 接続種別
     */
    private convertConnectPointType(from: string): ConnectPointType {
        switch (from.toLowerCase()) {
            case 'top':
                return ConnectPointType.Top
            case 'left':
                return ConnectPointType.Left;
            case 'bottom':
                return ConnectPointType.Bottom;
        }

        return ConnectPointType.Right;
    }
}