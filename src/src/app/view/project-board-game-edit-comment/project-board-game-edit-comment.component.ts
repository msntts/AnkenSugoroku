import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-board-game-edit-comment',
  templateUrl: './project-board-game-edit-comment.component.html',
  styleUrls: ['./project-board-game-edit-comment.component.css']
})
export class ProjectBoardGameEditCommentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProjectBoardGameEditCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public comment: string) { }

  ngOnInit(): void {
  }

  /**
   * キャンセルボタン押下処理
   */
  public cancel(){
    this.dialogRef.close();
  }
}
