import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindownloadsComponent } from './admindownloads.component';

describe('AdmindownloadsComponent', () => {
  let component: AdmindownloadsComponent;
  let fixture: ComponentFixture<AdmindownloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmindownloadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
