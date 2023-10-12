import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorPeliculaComponent } from './actor-pelicula.component';

describe('ActorPeliculaComponent', () => {
  let component: ActorPeliculaComponent;
  let fixture: ComponentFixture<ActorPeliculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActorPeliculaComponent]
    });
    fixture = TestBed.createComponent(ActorPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
