import { Component, Input } from '@angular/core';
import { Actor } from 'src/app/model/actor';

@Component({
  selector: 'app-detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.css']
})
export class DetalleActorComponent {
  @Input() actor?: Actor;
}
