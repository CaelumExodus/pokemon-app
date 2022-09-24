import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionPageComponent } from './evolution-page.component';

describe('EvolutionPageComponent', () => {
  let component: EvolutionPageComponent;
  let fixture: ComponentFixture<EvolutionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvolutionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvolutionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
