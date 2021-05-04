export class PieceDataModel {
    private pieceId: number;        // 駒のID

    private position: number;       // 駒の現在位置

    private name: string;           // 名前

    private projectImageUrl: string; // 案件画像のURL

    private skillImageurl: string;  // 技術画像のURL

    constructor(pieceId: number,
      position: number,
      name: string,
      projectImageUrl: string,
      skillImageUrl: string){
        this.pieceId = pieceId;
        this.position = position;
        this.name = name;
        this.projectImageUrl = projectImageUrl;
        this.skillImageurl = skillImageUrl;
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
        return this.skillImageurl;
      }
}
