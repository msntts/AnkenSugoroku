/**
 * 駒情報をまとめたクラス
 */
 export class PieceDataModel {
    /** 駒ID */
    private pieceId: number;

    /** 駒の現在位置 */
    private position: number;

    /** 名前 */
    private name: string;

    /** 案件画像のURL */
    private projectImageUrl: string;

    /** 技術画像のURL */
    private skillImageUrl: string;

    /***
     * コンストラクタ
     * @param pieceId 駒ID
     * @param position 駒の現在位置
     * @param name 名前
     * @param projectImageUrl 案件画像のURL
     * @param skillImageUrl 技術画像のURL
     */
    constructor(pieceId: number,
      position: number,
      name: string,
      projectImageUrl: string,
      skillImageUrl: string) {
        this.pieceId = pieceId;
        this.position = position;
        this.name = name;
        this.projectImageUrl = projectImageUrl;
        this.skillImageUrl = skillImageUrl;
      }

      public get PieceId(): number {
        return this.pieceId;
      }

      public get Position(): number {
        return this.position;
      }

      public get Name(): string {
        return this.name;
      }

      public get ProjectImageUrl(): string {
        return this.projectImageUrl;
      }

      public get SkillImageUrl(): string {
        return this.skillImageUrl;
      }
}
