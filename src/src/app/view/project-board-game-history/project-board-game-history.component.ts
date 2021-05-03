import { Component, OnInit } from '@angular/core';
import { HistoryModel } from 'src/app/model/history.model';
import { RecordService } from 'src/app/controller/record.service';

@Component({
  selector: 'app-project-board-game-history',
  templateUrl: './project-board-game-history.component.html',
  styleUrls: ['./project-board-game-history.component.css']
})
export class ProjectBoardGameHistoryComponent implements OnInit {

  constructor(
    private recordService: RecordService
  ) { }

  public histories: HistoryModel[];
  public displayColumns = ["Date", "From", "To", "Comment"];
  ngOnInit(): void {
    this.histories = this.recordService.getPieceHistories();
  }
}
