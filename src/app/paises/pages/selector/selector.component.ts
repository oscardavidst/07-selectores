import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fronteras, PaisSmall } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';
import { delay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [],
})
export class SelectorComponent implements OnInit {
  loading: boolean = false;
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
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
          this.loading = true;
        }),
        switchMap((valorContinente) =>
          this.paisesService.getPaisesByContinente(valorContinente)
        )
      )
      .subscribe((respPaises) => {
        this.paises = respPaises;
        this.loading = false;
      });

    // Cuando cambia el pais
    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.loading = true;
        }),
        delay(2000),
        switchMap((codigo) => this.paisesService.getFronterasByCode(codigo))
      )
      .subscribe((fronteras) => {
        this.fronteras = fronteras ? fronteras.borders : [];
        this.loading = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
