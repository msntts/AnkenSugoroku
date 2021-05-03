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
import { ProjectBoardGameHistoryComponent } from './view/project-board-game-history/project-board-game-history.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';


import { SettingAppComponent } from './view/setting-app/setting-app.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    ProjectBoardGameComponent,
    ProjectBoardGameSquareComponent,
    ProjectBoardGamePieceComponent,
    SettingAppComponent,
    ProjectBoardGameHistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DragDropModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
  ],
  providers: [
    BoardDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
