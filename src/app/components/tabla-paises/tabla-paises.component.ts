import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from 'src/app/model/paises';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css']
})
export class TablaPaisesComponent {

  paises : Array<Pais> = [];
  mostrarSeleccionar : boolean = true;
  @Output() eventPaisSeleccionado = new EventEmitter<Pais>();
  
  constructor(private paisesService: PaisesService,private router:Router){
    this.paisesService.TraerPaises().subscribe((respuesta :any) => {
      for (let index = 0; index < 10; index++) {
        let element = respuesta[index];
        let pais  = new Pais();
        pais.bandera = element.flags.png;
        pais.nombre = element.name.common
        pais.capital = element.capital[0]
        this.paises.push(pais);
      }
    })
  }

  seleccionar(pais : Pais){
    this.router.navigate(["actor/alta"]);
    //console.log(pais);
    this.eventPaisSeleccionado.emit(pais);
  }
}
