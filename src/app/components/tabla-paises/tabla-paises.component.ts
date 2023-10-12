import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from 'src/app/model/paises';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css']
})
export class TablaPaisesComponent {

  @Input() paises : Pais[] = [];
  @Input() mostrarSeleccionar : boolean = true;
  @Input() cargarPaises : boolean = false;
  @Output() eventPaisSeleccionado = new EventEmitter<Pais>();
  
  constructor(private paisesService: PaisesService,private router:Router){
  }

  async ngOnInit(){
    if(this.cargarPaises){
      this.paisesService.TraerPaises().then((respuesta)=>{
        this.paises =  respuesta;
      });
    }
  }

  seleccionar(pais : Pais){
    this.router.navigate(["actor/alta"]);
    //console.log(pais);
    this.eventPaisSeleccionado.emit(pais);
  }
}


