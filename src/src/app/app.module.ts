import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
// Service
import { BoardDataService } from './controller/board-data.service';
// Components
import { AppComponent } from './app.component';
import { ProjectBoardGameComponent } from './view/project-board-game/project-board-game.component';
import { ProjectBoardGameSquareComponent } from './view/project-board-game-square/project-board-game-square.component';
import { ProjectBoardGamePieceComponent } from './view/project-board-game-piece/project-board-game-piece.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProjectBoardGameComponent,
    ProjectBoardGameSquareComponent,
    ProjectBoardGamePieceComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    NoopAnimationsModule
  ],
  providers: [
    BoardDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
