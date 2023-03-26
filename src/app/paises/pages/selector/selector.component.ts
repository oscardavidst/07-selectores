import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fronteras, PaisSmall } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [],
})
export class SelectorComponent implements OnInit {
  miFormulario: FormGroup = this.formBuilder.group({
    continente: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });

  continentes: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService
  ) {}

  ngOnInit(): void {
    this.continentes = this.paisesService.continentes;

    // Cuando cambia el continente
    this.miFormulario
      .get('continente')
      ?.valueChanges.pipe(
        switchMap((valorContinente) =>
          this.paisesService.getPaisesByContinente(valorContinente)
        ),
        tap((_) => this.miFormulario.get('pais')?.reset(''))
      )
      .subscribe((respPaises) => (this.paises = respPaises));

    // Cuando cambia el pais
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        switchMap((codigo) => this.paisesService.getFronterasByCode(codigo)),
        tap((_) => this.miFormulario.get('frontera')?.reset(''))
      )
      .subscribe(
        (fronteras) => (this.fronteras = fronteras ? fronteras.borders : [])
      );
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
