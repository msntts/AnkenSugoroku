import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBoardGameRegisterImageComponent } from './project-board-game-register-image.component';

describe('ProjectBoardGameRegisterImageComponent', () => {
  let component: ProjectBoardGameRegisterImageComponent;
  let fixture: ComponentFixture<ProjectBoardGameRegisterImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBoardGameRegisterImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardGameRegisterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
