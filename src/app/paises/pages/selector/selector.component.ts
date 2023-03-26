import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [],
})
export class SelectorComponent implements OnInit {
  miFormulario: FormGroup = this.formBuilder.group({
    continente: ['', [Validators.required]],
  });

  continentes: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService
  ) {}

  ngOnInit(): void {
    this.continentes = this.paisesService.continentes;
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
