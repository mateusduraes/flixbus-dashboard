import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerComponent } from './pager.component';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PagerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#goPage() should call emit #pagerChange event', () => {
    const spy = spyOn(component.pagerChange, 'next');
    component.totalPages = 2;
    component.goPage(2);
    expect(spy).toHaveBeenCalled();
  });

  it('#goPage() should change the #currentPage value', () => {
    component.totalPages = 3;
    component.goPage(2);
    expect(component.currentPage).toBe(2);
  });

  it('#goNextPage() should call #goPage() with the expected value', () => {
    const spy = spyOn(component, 'goPage');
    component.totalPages = 3;
    component.currentPage = 1;
    component.goNextPage();
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('#goNextPage() should not call #goPage() if there is no next page', () => {
    const spy = spyOn(component, 'goPage');
    component.totalPages = 2;
    component.currentPage = 2;
    component.goNextPage();
    expect(spy).not.toHaveBeenCalled();
  });

  it('#goPreviousPage() should call #goPage() with the expected value', () => {
    const spy = spyOn(component, 'goPage');
    component.totalPages = 3;
    component.currentPage = 2;
    component.goPreviousPage();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('#goPreviousPage() should not call #goPage() if there is no previous page', () => {
    const spy = spyOn(component, 'goPage');
    component.totalPages = 2;
    component.currentPage = 1;
    component.goPreviousPage();
    expect(spy).not.toHaveBeenCalled();
  });
});
