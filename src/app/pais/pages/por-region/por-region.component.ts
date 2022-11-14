import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button{
      margin-right: 5px;
    }
  
  `
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania']
  regionActiva: string = '';
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  
  constructor(private paisService: PaisService) { }
  buscar(termino: string) {

    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarRegion(this.termino)
      .subscribe({
        next: (paises) => {
          console.log(paises);
          this.paises = paises;
        },
        error: (err) => {
          this.hayError = true;
          this.paises = [];
        },
        complete: () => {
          console.log('Petición realizada');
        }
      })
  }

  getClaseCSS(region: string){
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }
  
  activarRegion(region: string){{
    if (region === this.regionActiva) {
      return;
    }
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarRegion(region)
    .subscribe(paises => this.paises = paises);
  }}


}
 