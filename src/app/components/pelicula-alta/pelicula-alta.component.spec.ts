import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaAltaComponent } from './pelicula-alta.component';

describe('PeliculaAltaComponent', () => {
  let component: PeliculaAltaComponent;
  let fixture: ComponentFixture<PeliculaAltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeliculaAltaComponent]
    });
    fixture = TestBed.createComponent(PeliculaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
