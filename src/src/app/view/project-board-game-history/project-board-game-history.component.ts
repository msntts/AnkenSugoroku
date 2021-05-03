import { Component, OnInit } from '@angular/core';
import { HistoryModel } from 'src/app/model/history.model';
import { RecordService } from 'src/app/controller/record.service';
import { BoardDataService } from 'src/app/controller/board-data.service';

@Component({
  selector: 'app-project-board-game-history',
  templateUrl: './project-board-game-history.component.html',
  styleUrls: ['./project-board-game-history.component.css']
})
export class ProjectBoardGameHistoryComponent implements OnInit {

  constructor(
    private recordService: RecordService,
    private boardDataService: BoardDataService
  ) { }

  public histories: HistoryModel[];
  public displayColumns = ["Date", "From", "To", "Comment"];
  ngOnInit(): void {
    this.boardDataService.onActivePieceChanged.subscribe((piece_id: number)=> {
      this.histories = this.recordService.getPieceHistories(piece_id);
    });
  }
}
