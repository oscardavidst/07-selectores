import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisSmall } from '../../interfaces/pais.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [],
})
export class SelectorComponent implements OnInit {
  miFormulario: FormGroup = this.formBuilder.group({
    continente: ['', [Validators.required]],
    pais: ['', [Validators.required]],
  });

  continentes: string[] = [];
  paises: PaisSmall[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService
  ) {}

  ngOnInit(): void {
    this.continentes = this.paisesService.continentes;

    this.miFormulario.controls['continente'].valueChanges.subscribe(
      (valorContiente) => {
        this.paisesService
          .getPaisesByContinente(valorContiente)
          .subscribe((respPaises) => {
            console.log(respPaises);
            this.paises = respPaises;
          });
      }
    );
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
