import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDashboasrdComponent } from './my-dashboasrd.component';

describe('MyDashboasrdComponent', () => {
  let component: MyDashboasrdComponent;
  let fixture: ComponentFixture<MyDashboasrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDashboasrdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDashboasrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
