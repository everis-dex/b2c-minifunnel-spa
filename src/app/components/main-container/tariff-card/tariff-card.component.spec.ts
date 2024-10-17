import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffCardComponent } from './tariff-card.component';

describe('TariffCardComponent', () => {
  let component: TariffCardComponent;
  let fixture: ComponentFixture<TariffCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TariffCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
