import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardGameEditCommentComponent } from './project-board-game-edit-comment.component';

describe('ProjectBoardGameEditCommentComponent', () => {
  let component: ProjectBoardGameEditCommentComponent;
  let fixture: ComponentFixture<ProjectBoardGameEditCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoardGameEditCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardGameEditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
