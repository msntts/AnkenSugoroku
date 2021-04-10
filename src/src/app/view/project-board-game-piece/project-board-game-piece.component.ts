import { Component, Input, OnInit } from '@angular/core';
import { BoardDataService } from 'src/app/controller/board-data.service';
import { RecordService } from 'src/app/controller/record.service';

@Component({
  selector: 'app-project-board-game-piece',
  templateUrl: './project-board-game-piece.component.html',
  styleUrls: ['./project-board-game-piece.component.css']
})
export class ProjectBoardGamePieceComponent implements OnInit {

  @Input() id: number

  /** 位置座標x */
  public x: string = '0px';
  /** 位置座標y */
  public y: string = '0px';

  /* フィルタ */
  public filter: string = "";

  /* 駒の透明度 */
  public opacity: number = 1.0;

  /* 移動元の表示 */
  public fromMarkOn: boolean = false;


  /** 駒のマス内判定点までのオフセット（左上から） X方向 */
  private readonly c_offset_x: number = 50;
  
  /** 駒のマス内判定点までのオフセット（左上から） Y方向 */
  private readonly c_offset_y: number = 50;

  /**  移動アニメーション 有効/無効 */
  private readonly moveAnimationEnable = true;

  /** ドラッグ中に移動元を明示する  有効/無効 */
  private readonly showFromMark = true;


  /**
   * コンストラクタ
   * @param boardDataService 盤情報サービス
   */
  constructor(
    private boardDataService: BoardDataService,
    private recordService: RecordService,
  ) {
    this.boardDataService.observable.subscribe(() => {
      this.OnInit()
    }
    );
  }

  ngOnInit() {
    // 最後のマスの位置を取得
    this.id = this.recordService.getLatestSquareId();
  }

  OnInit(): void {
    // IDからマス情報を取得する
    let square = this.boardDataService.findSquare(this.id);
    if (square == null) {
      square = this.boardDataService.findSquare(1)
    }

    if (square != null) {
      this.x = `${square.X}px`;
      this.y = `${square.Y}px`;
    }
  }

  /**
   * ドラッグ開始時のイベント
   * @param event 
   */
  onDragStarted(event: any) {

    // ドラッグ中に移動元を表示
    if (this.showFromMark) {
      // 移動元表示マークON
      this.fromMarkOn = true;
      // ドラッグ中は半透明にする
      this.opacity = 0.5;
    }
  }


  /**
   * ドラッグ完了時のイベント
   * @param event 
   */
  async onDragEnded(event: any) {
    // ドラッグしているアイテムの位置情報を取得する
    const { offsetLeft, offsetTop } = event.source.element.nativeElement;
    // 移動距離を取得する
    const { x, y } = event.distance;
    // 新しい座標を定義する
    const newX = offsetLeft + x;
    const newY = offsetTop + y;

    // マスにいるかどうか
    // ※マスの中にいるかどうかの判定時、駒の左上座標を用いるとユーザーの操作感と不一致が生じる。
    // (駒の左上がマス内に入っていないと、	「マス内に入っていない」と判定されてしまう)
    //   このため、マスの中にいるかどうかの判定に用いる点は、左上座標からオフセット分画像の内側に入った位置を用いる
    const square = this.boardDataService.findSquareByPosition(newX + this.c_offset_x, newY + this.c_offset_y);

    if (square != null) {
      // 現在の状態から移動できるマスかどうか
      if (this.boardDataService.isMovable(this.id, square.Id)) {

        // ドラッグ中に移動元を表示する場合
        if (this.showFromMark) {
          // ドラッグ終了
          this.fromMarkOn = false;
          this.opacity = 1.0;
        }

        // 移動アニメーションをする場合
        if (this.moveAnimationEnable) {
          // 移動する
          let tox: number = parseInt(this.x);
          let toy: number = parseInt(this.y);
          let fromx: number = tox - x;
          let fromy: number = toy - y;

          for (let i = 0; i < 100; i++) {
            this.x = `${fromx + (tox - fromx) * i / 100}px`;
            this.y = `${fromy + (toy - fromy) * i / 100}px`;
            await this.sleep(10)
          }
        }
        // 移動する
        this.x = `${square.X}px`;
        this.y = `${square.Y}px`;

        // 移動履歴を記録
        this.recordService.addMoveRecord(this.id, square.Id);

        // id更新
        this.id = square.Id;

        // 最新のidを更新
        this.recordService.setLatestSquareId(this.id);

      } else {
        // 移動できない場合

        // 色を反転させるアニメーションを表示
        await this.sleep(100);
        this.filter = "invert(100%)";
        await this.sleep(100);
        this.filter = "invert(0%)";
        await this.sleep(100);
        this.filter = "invert(100%)";
        await this.sleep(100);
        this.filter = "invert(0%)";
        await this.sleep(100);
        this.filter = "invert(100%)";
        await this.sleep(100);
        this.filter = "";

        // ドラッグ中に移動元を表示する場合
        if (this.showFromMark) {
          // ドラッグ終了
          this.fromMarkOn = false;
          this.opacity = 1.0;
        }

      }


    }

    // ドラッグの状態は元に戻す
    // （位置情報をそのまま変更しているので、ドラッグ情報を削除しておかないと、その分移動されてしまう）
    event.source._dragRef.reset();
  }

  /**
 * 指定された時間、処理を中断する
 * 本処理を呼び出す場合は、awaitをつけてください。
 * @param milliseconds ミリ秒
 */
  private sleep(milliseconds: number) {
    return new Promise<void>(resolve => {
      setTimeout(() => resolve(), milliseconds);
    });
  }

}
