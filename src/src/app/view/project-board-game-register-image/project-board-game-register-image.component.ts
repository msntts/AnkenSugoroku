import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../controller/image.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-board-game-register-image',
  templateUrl: './project-board-game-register-image.component.html',
  styleUrls: ['./project-board-game-register-image.component.css']
})
export class ProjectBoardGameRegisterImageComponent implements OnInit {

  constructor(private imageService: ImageService,
    private dialogRef: MatDialogRef<ProjectBoardGameRegisterImageComponent>) { }

  public projectImagesPath = Array<string>();
  public skillImagesPath = Array<string>();

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

  public uploadProjectImage(files: any) {
    if (files.length > 0) {
      let file = files[0];

      let data = new FormData();
      data.append("project", file, file.name);

      this.imageService.postProjectImage(data).then((msg: string) => {
        // 画像リストを更新
        this.getProjectImages();
      })
      .catch((reason: any) => {
        // TODO エラー処理
      })
    }
  }

  public uploadSkillImage(files: any) {
    if (files.length > 0) {
      let file = files[0];

      let data = new FormData();
      data.append("skill", file, file.name);
      this.imageService.postSkillImage(data).then((msg: string) => {
        // 画像リストを更新
        this.getSkillImages();
      })
      .catch((reason: any) => {
        // TODO エラー処理
      })
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
