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
    this.pieceDataService.piecePositionChanged$.subscribe((piece_id: number)=> {
      this.histories = this.pieceDataService.getPieceHistories(piece_id);
    });
  }
}
