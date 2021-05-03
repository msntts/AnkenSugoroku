import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardGameHistoryComponent } from './project-board-game-history.component';

describe('ProjectBoardGameHistoryComponent', () => {
  let component: ProjectBoardGameHistoryComponent;
  let fixture: ComponentFixture<ProjectBoardGameHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoardGameHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardGameHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
