import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { BoardDataModel } from '../model/board-data.model';
import { DisplayItemSquare } from '../model/display-item-square.model';
import { DisplayItemLine } from '../model/display-item-line.model';
import { stringify } from '@angular/compiler/src/util';

/**
 * プロジェクト画像、スキル画像を管理するクラス
 */
@Injectable({
    providedIn: 'root',
})

export class ImageService {
  constructor(private http: HttpClient){}

  public getProjectImagesUrl(): Promise<Array<string>> {
    return this.getImagesUrl('project-images/');
  }

  public getSkillImagesUrl(): Promise<Array<string>> {
      return this.getImagesUrl('skill-images/');
  }

  private getImagesUrl(url: string): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => {
      this.http.get(url, { responseType: 'text' }).subscribe(
        resp => {
          let imagesPath = new Array<string>();

          for (const path of JSON.parse(resp)) {
            imagesPath.push(path);
          }
          resolve(imagesPath);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public postProjectImage(data: FormData): Promise<string> {
    return this.postImage("project-images/", data);
  }

  public postSkillImage(data: FormData): Promise<string> {
    return this.postImage("skill-images/", data);
  }

  private postImage(url: string, data: FormData): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post(url, data).subscribe(
        resp => {
          resolve(JSON.stringify(resp));
        },
        error => {
          reject(error);
        }
      );
    });
  }
}
