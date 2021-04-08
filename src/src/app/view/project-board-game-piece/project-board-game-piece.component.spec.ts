import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardGamePieceComponent } from './project-board-game-piece.component';

describe('ProjectBoardGamePieceComponent', () => {
  let component: ProjectBoardGamePieceComponent;
  let fixture: ComponentFixture<ProjectBoardGamePieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoardGamePieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardGamePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
