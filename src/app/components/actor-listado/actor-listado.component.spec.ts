import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorListadoComponent } from './actor-listado.component';

describe('ActorListadoComponent', () => {
  let component: ActorListadoComponent;
  let fixture: ComponentFixture<ActorListadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActorListadoComponent]
    });
    fixture = TestBed.createComponent(ActorListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
