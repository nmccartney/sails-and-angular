import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupiesViewComponent } from './groupies-view.component';

describe('GroupiesViewComponent', () => {
  let component: GroupiesViewComponent;
  let fixture: ComponentFixture<GroupiesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupiesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
