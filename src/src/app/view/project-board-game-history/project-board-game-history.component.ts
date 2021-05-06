import { Component, OnInit } from '@angular/core';
import { HistoryModel } from 'src/app/model/history.model';
import { PieceDataService } from 'src/app/controller/piece-data.service';

@Component({
  selector: 'app-project-board-game-history',
  templateUrl: './project-board-game-history.component.html',
  styleUrls: ['./project-board-game-history.component.css']
})
export class ProjectBoardGameHistoryComponent implements OnInit {

  constructor(
    private pieceDataService: PieceDataService,
    ) { }

  public histories: HistoryModel[];
  public displayColumns = ["Date", "From", "To", "Comment"];

  ngOnInit(): void {
    // 駒情報が変更されたら、変更された駒情報の履歴を取得する
    this.pieceDataService.pieceSelectionChanged$.subscribe((pieceId: number)=> {
      // 一旦履歴情報を削除
      this.histories = [];
      // 履歴情報を取得
      this.pieceDataService.getPieceHistories(pieceId)
        .then((histories: Array<HistoryModel>) => {
          histories.forEach((history: HistoryModel) => {
            this.histories.push(history);
          });
        })
        .catch((error: any) => {
          // TODO:　エラー処理
        });
    });
  }
}
