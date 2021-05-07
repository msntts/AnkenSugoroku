import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HistoryModel } from 'src/app/model/history.model';
import { PieceDataService } from 'src/app/controller/piece-data.service';
import { ProjectBoardGameEditCommentComponent } from 'src/app/view/project-board-game-edit-comment/project-board-game-edit-comment.component';

@Component({
  selector: 'app-project-board-game-history',
  templateUrl: './project-board-game-history.component.html',
  styleUrls: ['./project-board-game-history.component.css']
})
export class ProjectBoardGameHistoryComponent implements OnInit {

  constructor(
    private pieceDataService: PieceDataService,
    private commentEditDialog: MatDialog,
    ) { }

  public histories = new MatTableDataSource<HistoryModel>();
  public displayColumns = ["Date", "From", "To", "Comment", "EditComment", "Delete"];

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // 駒情報が変更されたら、変更された駒情報の履歴を取得する
    this.pieceDataService.pieceSelectionChanged$.subscribe((pieceId: number)=> {
      // 一旦履歴情報を削除
      this.histories = new MatTableDataSource<HistoryModel>();
      // 履歴情報を取得
      this.updateHistory(pieceId);
    });
  }

  public editComment(pieceId: number, historyId: number, comment: string): void {
    /** 設定ダイアログを開く */
    const dialogRef = this.commentEditDialog.open(ProjectBoardGameEditCommentComponent,
      { data: comment });

      /** 設定ダイアログが閉じた後の処理を登録 */
      dialogRef.afterClosed().subscribe(comment => {
        if (comment !== undefined) {
          this.pieceDataService.putHistoryComment(pieceId, historyId, comment)
          .then((history: HistoryModel) => {
            this.updateHistory(pieceId);
          })
          .catch((error: any) => {
            // TODO エラー処理
          });
        }
      });
    }

  public removeRow(pieceId: number, historyId: number, date: string): void {
    if(confirm(`履歴@${date}を削除しますか?`)) {
      this.pieceDataService.deletePieceHistory(pieceId, historyId)
      .then((pid: number) => {
        this.updateHistory(pieceId);
      })
      .catch((error: any) => {
         // TODO: エラー処理
      });
    }
  }

  private updateHistory(pieceId): void {
    this.pieceDataService.getPieceHistories(pieceId)
    .then((histories: Array<HistoryModel>) => {
      this.histories = new MatTableDataSource<HistoryModel>(histories);
      this.histories.paginator = this.paginator;
      this.table.renderRows();
    })
    .catch((error: any) => {
      // TODO: エラー処理
    });
  }
}
