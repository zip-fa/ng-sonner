import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgSonnerComponent } from './ng-sonner.component';

describe('NgSonnerComponent', () => {
  let component: NgSonnerComponent;
  let fixture: ComponentFixture<NgSonnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgSonnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgSonnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
