import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteForumComponent } from './delete-forum.component';

describe('DeleteForumComponent', () => {
  let component: DeleteForumComponent;
  let fixture: ComponentFixture<DeleteForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
