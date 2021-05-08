import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { BoardDataService } from 'src/app/controller/board-data.service';
import { PieceDataService } from 'src/app/controller/piece-data.service';
import { ConfigService} from 'src/app/controller/config.service';
import { PieceDataModel } from 'src/app/model/piece-data.model'
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription, fromEvent } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { ProjectBoardGameRegisterPieceComponent } from 'src/app/view/project-board-game-register-piece/project-board-game-register-piece.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-project-board-game-piece',
  templateUrl: './project-board-game-piece.component.html',
  styleUrls: ['./project-board-game-piece.component.css']
})
export class ProjectBoardGamePieceComponent implements OnInit {

  /** ピースのいるマスのID */
  @Input() squareId: number

  /** ピースの固有のID */
  @Input() pieceId: number

  /** 位置座標x */
  public x: string = '0px';

  /** 位置座標y */
  public y: string = '0px';

  /** 名前 */
  public name: string = "";

  /* フィルタ */
  public filter: string = "";

  /* 駒の透明度 */
  public opacity: number = 1.0;

  /* 移動元の表示 */
  public fromMarkOn: boolean = false;

  /** 駒のステータス */
  public pieceStatus: PieceDataModel;


  /** 駒のマス内判定点までのオフセット（左上から） X方向 */
  private readonly c_offset_x: number = 50;

  /** 駒のマス内判定点までのオフセット（左上から） Y方向 */
  private readonly c_offset_y: number = 50;

  /**  移動アニメーション 有効/無効 */
  private moveAnimationEnable = false;

  /** ドラッグ中に移動元を明示する  有効/無効 */
  private readonly showFromMark = true;


  /**
   * コンストラクタ
   * @param boardDataService 盤情報サービス
   */
  constructor(
    private boardDataService: BoardDataService,
    private pieceDataService: PieceDataService,
    private configService: ConfigService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    // コンフィグレーション読み込み
    this.configService.observable.subscribe(() =>{
      this.moveAnimationEnable = this.configService.moveAnimationEnable;
    })

    // ピースのステータス情報を取得する
    this.pieceStatus = this.pieceDataService.getPieceStatus(this.pieceId);

    // IDからマス情報を取得する
    let square = this.boardDataService.findSquare(this.squareId);
    if (square == null) {
      square = this.boardDataService.findSquare(1);
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

    console.log(this.squareId)
    // マスにいるかどうか
    // ※マスの中にいるかどうかの判定時、駒の左上座標を用いるとユーザーの操作感と不一致が生じる。
    // (駒の左上がマス内に入っていないと、	「マス内に入っていない」と判定されてしまう)
    //   このため、マスの中にいるかどうかの判定に用いる点は、左上座標からオフセット分画像の内側に入った位置を用いる
    const square = this.boardDataService.findSquareByPosition(newX + this.c_offset_x, newY + this.c_offset_y);

    if (square != null) {
      // 現在の状態から移動できるマスかどうか
      if (this.boardDataService.isMovable(this.squareId, square.Id)) {

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

        try {
          // 駒情報更新処理
          await this.pieceDataService.updatePiecePosition(this.pieceId, this.squareId, square.Id);
          // id更新
          this.squareId = square.Id;
        } catch(error) {
          // TODO: エラー処理…ロールバックとかする?
        }
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

  /**
   * 現在のアクティブピースを通知する
   */
  public notifyActivePiece(): void {
      this.pieceDataService.notifyPieceActivationChanged(this.pieceId);
  }


  public updatePiece(): void {
    // 駒登録ダイアログを開く。呼び出し元は結果を見ない
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      pieceId: this.pieceStatus.PieceId,
      selectedProjectImgPath: this.pieceStatus.ProjectImageUrl,
      selectedSkillImgPath: this.pieceStatus.SkillImageUrl,
    };

    this.dialog.open(ProjectBoardGameRegisterPieceComponent, dialogConfig);
  }

  public deletePiece(): void {
    if(confirm('駒を削除してもいいですか?(履歴もすべて消えます)')){
      this.pieceDataService.deletePiece(this.pieceStatus.PieceId)
      .then((message) => {
        // 削除したことを通知する気の利いた(ry
      })
      .catch((reason)=> {
        // TODO エラー処理
      });
    }

    this.closeMenu();
  }

  /** ここからは駒を右クリックしたときの処理 */

  @ViewChild('pieceContextMenu') pieceContextMenu: TemplateRef<any>;
  private overlayRef: OverlayRef | null;
  private sub: Subscription;

  public showMenu({ x, y }: MouseEvent) {
    this.closeMenu();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.pieceContextMenu, this.viewContainerRef));

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeMenu());
  }

  public closeMenu() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
