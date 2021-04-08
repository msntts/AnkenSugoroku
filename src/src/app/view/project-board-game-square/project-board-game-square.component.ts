import { Component, OnInit, Input } from '@angular/core';
import { DisplayItemSquare } from 'src/app/model/display-item-square.model'


@Component({
  selector: 'app-project-board-game-square',
  templateUrl: './project-board-game-square.component.html',
  styleUrls: ['./project-board-game-square.component.css']
})
export class ProjectBoardGameSquareComponent implements OnInit {

  @Input() square: DisplayItemSquare;

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

  /**
   * コンストラクタ
   */
  constructor() {}

  /**
   * 初期化処理
   */
   ngOnInit() {
    this.x = `${this.square.X}px`;
    this.y = `${this.square.Y}px`;
    this.width = `${this.square.Width}px`;
    this.height = `${this.square.Height}px`;
    this.zIndex = this.square.ZIndex;
    this.content = this.square.Content;
    this.color = this.square.Color;
    this.backgroundColor = this.square.BackgroundColor;
  }
}