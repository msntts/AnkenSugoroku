import { Component, OnInit, Input } from '@angular/core';
import { DisplayItemSquare } from 'src/app/model/display-item-square.model'
import { ConfigService} from 'src/app/controller/config.service'
import { PieceDataModel } from 'src/app/model/piece-data.model'
import { PiecePositionChanged } from 'src/app/model/piece-position-changed.model';
import { PieceDataService } from 'src/app/controller/piece-data.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardDataService } from 'src/app/controller/board-data.service';

@Component({
  selector: 'app-project-board-game-square',
  templateUrl: './project-board-game-square.component.html',
  styleUrls: ['./project-board-game-square.component.css']
})
export class ProjectBoardGameSquareComponent implements OnInit {

  @Input() square: DisplayItemSquare;

  /** マスID */
  public id = 0;
  /** 表示位置のx座標 */
  public x = '0px';
  /** 表示位置のy座標 */
  public y = '0px';
  /** 表示幅 */
  public width = '0px';
  /** 表示高さ */
  public height = '0px';
  /** 表示順 */
  public zIndex = -1;
  /** 表示内容 */
  public content = '';
  /** 色 */
  public color = '';
  /** 背景色 */
  public backgroundColor = '';
  /** フォントサイズ */
  public fontsize:string = '';

  public pieces = new Array<PieceDataModel>();

  /* JSONファイル内のHTMLを許可する */
  public enableHtml:boolean = true;

  public connectedTo = new Array<string>();

  /**
   * コンストラクタ
   */
   constructor(private configservice: ConfigService,
    private boardDataService: BoardDataService,
    private pieceDataService: PieceDataService ) {}

  /**
   * 初期化処理
   */
   ngOnInit() {
    this.id = this.square.Id;
    this.x = `${this.square.X}px`;
    this.y = `${this.square.Y}px`;
    this.width = `${this.square.Width}px`;
    this.height = `${this.square.Height}px`;
    this.zIndex = this.square.ZIndex;
    this.content = this.square.Content;
    this.color = this.square.Color;
    this.backgroundColor = this.square.BackgroundColor;
    this.fontsize = `${this.configservice.fontSize}px`;
    this.enableHtml = this.configservice.enableHtml;

    /** configserviceから設定内容を読み込む */
    this.configservice.observable.subscribe(() => {
      this.fontsize = this.configservice.fontSize.toString() + "px";
      this.enableHtml = this.configservice.enableHtml;
    });

    for (const id of this.boardDataService.getConnectedSquares(this.id)){
      this.connectedTo.push('square-' + id.toString());
    }

    // 駒情報更新処理
    this.pieceDataService.piecesUpdated$.subscribe(()=> {
      this.pieces = [];
      const list = this.pieceDataService.getLatestSquareIdList().filter((piece: PieceDataModel) => this.id === piece.Position);
      if (list) {
        this.pieces = list;
      }
    });

    this.pieceDataService.piecePositionChanged$.subscribe((positionChangeArg: PiecePositionChanged) => {
      if(positionChangeArg.FromPosition === this.id) {
        // 駒を消す
        this.pieces = this.pieces.filter((piece: PieceDataModel) => piece.PieceId !== positionChangeArg.PieceId);
      }
      else if(positionChangeArg.ToPosition === this.id) {
        // 駒を追加する
        let piece = this.pieceDataService.getLatestSquareIdList().find((piece: PieceDataModel) => positionChangeArg.PieceId === piece.PieceId);
        if (piece) {
          this.pieces.push();
        }
      }
    });
  }

  // *ngForのTrack用処理関数
  public trackByItem(index: number, piece: PieceDataModel): string {
    // trackbyでは1つの要素しか見れなさそうだから、変更を監視したいものを全部文字列化する
    return `${piece.Position}${piece.Name}${piece.ProjectImageUrl}${piece.SkillImageUrl}`;
  }

  public async drop(event: CdkDragDrop<PieceDataModel[]>) {
    /**  駒の移動元と移動先が異なる場合 */
    if (event.previousContainer !== event.container) {
      const piece = event.previousContainer.data[event.previousIndex];
      const from = piece.Position; // 移動元は今のpieceのposition
      const to   = this.id; // あて先は自分自身
      // 全部ちゃんと取れたらやる
      if(piece && from && to) {
        await this.pieceDataService.updatePiecePosition(piece.PieceId, from, to);
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      }
    }
  }
}
