import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardGameComponent } from './project-board-game.component';

describe('ProjectBoardGameComponent', () => {
  let component: ProjectBoardGameComponent;
  let fixture: ComponentFixture<ProjectBoardGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoardGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
