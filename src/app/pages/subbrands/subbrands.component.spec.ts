import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubbrandsComponent } from './subbrands.component';

describe('SubbrandsComponent', () => {
  let component: SubbrandsComponent;
  let fixture: ComponentFixture<SubbrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubbrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
