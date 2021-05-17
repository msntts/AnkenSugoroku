import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
// Service
import { BoardDataService } from './controller/board-data.service';
import { ImageService } from './controller/image.service';
// Components
import { AppComponent } from './app.component';
import { ProjectBoardGameComponent } from './view/project-board-game/project-board-game.component';
import { ProjectBoardGameSquareComponent } from './view/project-board-game-square/project-board-game-square.component';
import { ProjectBoardGamePieceComponent } from './view/project-board-game-piece/project-board-game-piece.component';
import { ProjectBoardGameHistoryComponent } from './view/project-board-game-history/project-board-game-history.component';
import { ProjectBoardGameEditCommentComponent } from './view/project-board-game-edit-comment/project-board-game-edit-comment.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatRadioModule} from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { SettingAppComponent } from './view/setting-app/setting-app.component';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { ProjectBoardGameRegisterPieceComponent } from './view/project-board-game-register-piece/project-board-game-register-piece.component';
import { ProjectBoardGameRegisterImageComponent } from './view/project-board-game-register-image/project-board-game-register-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectBoardGameComponent,
    ProjectBoardGameSquareComponent,
    ProjectBoardGamePieceComponent,
    SettingAppComponent,
    ProjectBoardGameHistoryComponent,
    ProjectBoardGameEditCommentComponent,
    ProjectBoardGameRegisterPieceComponent,
    ProjectBoardGameRegisterImageComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  providers: [
    BoardDataService,
    ImageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
