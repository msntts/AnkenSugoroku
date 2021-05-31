import { Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ImageService } from '../../controller/image.service';
import { PieceDataService } from '../../controller/piece-data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-board-game-register-piece',
  templateUrl: './project-board-game-register-piece.component.html',
  styleUrls: ['./project-board-game-register-piece.component.css']
})
export class ProjectBoardGameRegisterPieceComponent implements OnInit {
  /** ProjectBoardGameRegisterImageComponentと共通化しておけばよかった。。。(◞‸◟) */
  constructor(private imageService: ImageService,
    private pieceDataService: PieceDataService,
    private dialogRef: MatDialogRef<ProjectBoardGameRegisterPieceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data != undefined){
        // 駒の更新の時はこっち
        this.pieceId = this.data['pieceId'];
        this.selectedProjectImgPath = this.data['selectedProjectImgPath'];
        this.selectedSkillImgPath = this.data['selectedSkillImgPath'];
        this.pieceName = this.data['pieceName'];
        this.isProjectImgSelected = true;
        this.isSkillImgSelected = true;
        this.asUpdate = true;
      }
    }

    public projectImagesPath = Array<string>();
    public skillImagesPath = Array<string>();

    public selectedProjectImgPath = "";
    public selectedSkillImgPath = "";
    public pieceName = "";
    private isProjectImgSelected = false;
    private isSkillImgSelected = false;
    public asUpdate = false;
    private pieceId = -1;

    ngOnInit(): void {
      this.getProjectImages();
      this.getSkillImages();
    }

    private getProjectImages() {
      this.imageService.getProjectImagesUrl()
      .then((imgsPath: string[]) => {
        this.projectImagesPath = imgsPath;
      })
      .catch((reason: any) => {
        // TODO エラー処理
      });
    }

    private getSkillImages() {
      this.imageService.getSkillImagesUrl()
      .then((imgsPath: string[]) => {
        this.skillImagesPath = imgsPath;
      })
      .catch((reason: any) => {
        // TODO エラー処理
      });
    }

    public onProjectImgSelected(path: string): void {
      this.selectedProjectImgPath = path;
      this.isProjectImgSelected = true;
    }

    public onSkillImgSelected(path: string): void {
      this.selectedSkillImgPath = path;
      this.isSkillImgSelected = true;
    }

    public get isImagesSelected(): boolean {
      return !(this.isProjectImgSelected && this.isSkillImgSelected);
    }

    public register() {
      {
        this.pieceDataService.postNewPiece(this.pieceName,
        this.selectedProjectImgPath, this.selectedSkillImgPath)
        .then((piece) => {
          // 選択状態を戻しておく
          this.selectedProjectImgPath = '';
          this.isProjectImgSelected = false;
          this.selectedSkillImgPath = ''
          this.isSkillImgSelected = false;

          // 名前も初期値に
          this.pieceName = "";
          // TODO 作成成功しました!とかいう気の利いた通知も出したいところ
        })
        .catch((error) => {
          // TODO エラー処理
        });
      }
    }

    public update() {
      this.pieceDataService.putPiece(this.pieceId,
      this.pieceName,
      this.selectedProjectImgPath, this.selectedSkillImgPath)
      .then((piece) => {
        // TODO 作成成功しました!とかいう気の利いた通知も出したいところ
      })
      .catch((error) => {
        // TODO エラー処理
      });
      this.dialogRef.close();
    }

    public close() {
      this.dialogRef.close();
    }
}
