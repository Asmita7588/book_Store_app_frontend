import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedBooksComponent } from './ordered-books.component';

describe('OrderedBooksComponent', () => {
  let component: OrderedBooksComponent;
  let fixture: ComponentFixture<OrderedBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderedBooksComponent]
    });
    fixture = TestBed.createComponent(OrderedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
