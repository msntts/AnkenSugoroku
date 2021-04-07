import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardGameSquareComponent } from './project-board-game-square.component';

describe('ProjectBoardGameSquareComponent', () => {
  let component: ProjectBoardGameSquareComponent;
  let fixture: ComponentFixture<ProjectBoardGameSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoardGameSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardGameSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
