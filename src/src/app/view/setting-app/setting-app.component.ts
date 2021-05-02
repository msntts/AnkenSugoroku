import { Component, OnInit } from '@angular/core';
import { ConfigService} from 'src/app/controller/config.service'

@Component({
  selector: 'app-setting-app',
  templateUrl: './setting-app.component.html',
  styleUrls: ['./setting-app.component.css']
})
export class SettingAppComponent implements OnInit {

  public moveAnimationEnable: boolean   // アニメーションの有効/無効
  public enableHtml: boolean            // HTMLタグの有効/無効
  public fontsize: number               // フォントサイズ


  constructor(private configservice: ConfigService) { }
  

  /** 初期化時の処理 */
  ngOnInit(): void {

    /** configserviceから現在の設定内容を読みだす */
    this.moveAnimationEnable = this.configservice.moveAnimationEnable;
    this.enableHtml = this.configservice.enableHtml;
    this.fontsize = this.configservice.fontSize;

  }

  /** 保存ボタンを押した際の処理 */
  public save(event:any){
    /** 内容をconfigserviceに設定する */
    this.configservice.enableHtml = this.enableHtml
    this.configservice.moveAnimationEnable = this.moveAnimationEnable
    this.configservice.fontSize = this.fontsize
  }

  /** キャンセルボタンを押した際の処理 */
  public cancel(event:any){
    /** いまのところ何もしない */
  }

}
