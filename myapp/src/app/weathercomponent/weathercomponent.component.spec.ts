import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathercomponentComponent } from './weathercomponent.component';

describe('WeathercomponentComponent', () => {
  let component: WeathercomponentComponent;
  let fixture: ComponentFixture<WeathercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeathercomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeathercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
