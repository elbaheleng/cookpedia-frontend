import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrecipesComponent } from './adminrecipes.component';

describe('AdminrecipesComponent', () => {
  let component: AdminrecipesComponent;
  let fixture: ComponentFixture<AdminrecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminrecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminrecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
