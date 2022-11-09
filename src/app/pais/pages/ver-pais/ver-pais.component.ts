import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  @Input() pais!: Country
  // pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {

    // this.activatedRoute.params
    //   .pipe<Country, Country>(
    //     switchMap(({ id }) =>
    //       this.paisService.getPaisPorAlpha(id) ),
    //       tap(console.log)
    //       )
    //   .subscribe( pais => this.pais = pais );

    //Alternativa a switch map ->
    this.activatedRoute.params
      .subscribe(({ id }) => {
        console.log(id);

        this.paisService.getPaisPorAlpha(id)
        .subscribe( pais => this.pais = pais);
      });


  }

}
