import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardGameRegisterPieceComponent } from './project-board-game-register-piece.component';

describe('ProjectBoardGameRegisterPieceComponent', () => {
  let component: ProjectBoardGameRegisterPieceComponent;
  let fixture: ComponentFixture<ProjectBoardGameRegisterPieceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoardGameRegisterPieceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardGameRegisterPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
