/**
 * ネットワーク階層の色定義
 */
export class LevelColor {
    /**
     * 階層IDから色を取得する
     * @param levelId 階層ID
     */
    public static getColor(levelId: number): string {
        let color = '';
        switch (levelId) {
            case 1:
                color = 'Lightgray';
                break;
            case 2:
                color = 'Aqua';
                break;
            case 3:
                color = 'Orange';
                break;
            case 4:
                color = 'Lightgreen';
                break;
            default:
                color = 'Black';
                break;
        }

        return color;
    }
}

/**
 * ネットワークの表示方向
 */
export enum NetworkDispMode {
    /** 水平方向 */
    Horizontal = 0,
    /** 垂直方向 */
    Vertical,
    /** 階層、ネットワークの状況により変化 */
    Complex
}

/**
 * 表示のサイズ
 */
export class DispSetting {
    /** 最大の階層数 */
    public static MaxLevelNum = 100;
    /** 1階層における最大のネットワーク数 */
    public static MaxNetworkNum = 100;
    /** 1ネットワークにおける最大のステーション数 */
    public static MaxStationNum = 100;
    /** ユニットの表示サイズ */
    public static UnitSize = 80;
    /** 小さいユニットの表示サイズの幅 */
    public static SmallUnitSizeWidth = 50;
    /** 小さいユニットの表示サイズの高さ */
    public static SmallUnitSizeHeight = 40;
    /** ユニット間のマージン */
    public static UnitMargin = DispSetting.UnitSize;
    /** ネットワーク表示する際の連結部分の円弧の表示幅 */
    public static UnitConnectionArcSize = DispSetting.UnitSize * 0.5;
    /** 階層が増えるたびに連結部分の円弧の表示幅を小さくする際のオフセット */
    public static UnitConnectionArcOffsetBase = DispSetting.UnitSize * 0.1;
    /** n+2階層の点線ネットワークにおけるY方向のサイズオフセット */
    public static DashedNetworkOffsetY = 5;
}
