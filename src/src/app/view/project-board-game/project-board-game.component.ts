import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DisplayItemService } from 'src/app/controller/display-item.service';
import { DisplayItemSquare } from 'src/app/model/display-item-square.model';

@Component({
  selector: 'app-project-board-game',
  templateUrl: './project-board-game.component.html',
  styleUrls: ['./project-board-game.component.css']
})
export class ProjectBoardGameComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas1') canvas1: ElementRef;

  /** コンテキスト */
  private context: CanvasRenderingContext2D;

  /** マス情報 */
  public squares: Array<DisplayItemSquare> = new Array<DisplayItemSquare>();

  /**
   * コンストラクタ
   * @param displayItemService 表示項目管理サービス
   */
  constructor(
    private displayItemService: DisplayItemService
  ) {
  }

  /**
   * 初期化処理
   */
  ngOnInit() {
    // サービスから取得したデータをモデルにセットする
    this.displayItemService.getData()
    .then((data) => {
      // マス情報を設定
      this.squares = data;
      // 要素をつなぐ線を描画する
      this.drawConnectors();
  })
    .catch((error) => {
      alert(`Can't read square data file: [${error}]`);
    });
  }

  /**
   * 初期化後の処理
   */
  ngAfterViewInit() {
    // ２次元描画用のレンダリングコンテキストを取得
    this.context = (this.canvas1.nativeElement).getContext('2d');
  }

  /**
   * 要素と要素の間に線を引く
   */
  private drawConnectors() {
    if (this.context == null) {
      return;
    }

    // お試し
    const square1 = this.squares[0];
    const square2 = this.displayItemService.findSquare(1);

    this.context.strokeStyle = 'Black';
    this.context.beginPath();
    this.context.moveTo(200, 125);
    this.context.lineTo(550, 375);
    this.context.closePath();
    this.context.stroke();
  }
}
