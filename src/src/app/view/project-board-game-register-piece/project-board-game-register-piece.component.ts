import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../controller/image.service';
import { PieceDataService } from '../../controller/piece-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-board-game-register-piece',
  templateUrl: './project-board-game-register-piece.component.html',
  styleUrls: ['./project-board-game-register-piece.component.css']
})
export class ProjectBoardGameRegisterPieceComponent implements OnInit {

  constructor(private imageService: ImageService,
    private pieceDataService: PieceDataService,
    private dialogRef: MatDialogRef<ProjectBoardGameRegisterPieceComponent>) { }

    public projectImagesPath = Array<string>();
    public skillImagesPath = Array<string>();

    public selectedProjectImgPath = "";
    public selectedSkillImgPath = "";
    private isProjectImgSelected = false;
    private isSkillImgSelected = false;

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
        this.pieceDataService.postNewPiece("",
        this.selectedProjectImgPath, this.selectedSkillImgPath)
        .then((piece) => {
          // 選択状態を戻しておく
          this.selectedProjectImgPath = '';
          this.isProjectImgSelected = false;
          this.selectedSkillImgPath = ''
          this.isSkillImgSelected = false;

          // TODO 作成成功しました!とかいう気の利いた通知も出したいところ
        })
        .catch((error) => {
          // TODO エラー処理
        });
      }
    }

    public close() {
      this.dialogRef.close();
    }
}
