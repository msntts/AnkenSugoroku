/**
 * 駒の移動情報をまとめたクラス
 */
 export class PiecePositionChanged {
    /** 駒ID */
    private pieceId: number;

    /** 駒の移動後の位置 */
    private toPosition: number;

    /** 駒の移動前の位置 */
    private fromPosition: number;

    constructor(pieceId: number,
      fromPosition: number, toPosition: number) {
        this.pieceId = pieceId;
        this.fromPosition = fromPosition;
        this.toPosition = toPosition;
      }

      public get PieceId(): number{
        return this.pieceId;
      }

      public get FromPosition(): number{
        return this.fromPosition;
      }

      public get ToPosition(): number{
        return this.toPosition;
      }
 }
