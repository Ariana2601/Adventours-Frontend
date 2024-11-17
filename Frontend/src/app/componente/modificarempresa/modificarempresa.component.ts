import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Usuario} from '../../model/usuario';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {EmpresaService} from '../../services/empresa.service';
import {Empresa} from '../../model/empresa';

@Component({
  selector: 'app-modificarempresa',
  standalone: true,
    imports: [
      MatCard,
      MatCardTitle,
      MatFormField,
      MatDatepickerToggle,
      MatDatepicker,
      ReactiveFormsModule,
      MatDatepickerInput,
      MatCardContent, MatLabel, MatHint, //add
      MatDatepickerModule,//add
      MatNativeDateModule, //add
      MatInputModule, MatButton, MatSelect, MatOption, NgForOf, //add
    ],
  templateUrl: './modificarempresa.component.html',
  styleUrl: './modificarempresa.component.css'
})
export class ModificarempresaComponent {
  empresamodForm: FormGroup;
  fb = inject(FormBuilder);
  empresaService: EmpresaService = inject(EmpresaService);
  router: Router = inject(Router);
  //edicion
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  id: number = 0

  constructor() {
    console.log("Constructor CreacioncuentaComponent")
    this.empresamodForm = this.fb.group({
      idEmpresa: [''],
      nombreEmpresa: ['', Validators.required],
      contactoEmpresa: ['', Validators.required],

    })
  }
  //edicion
  ngOnInit(): void { //sólo una vez luego del constructor
    this.route.params.subscribe((data: Params) => {
      console.log("ngOnInit de ModificarempresaComponent")
      console.log(data);
      this.id = data['id']; //capturando el id del listado
      this.edicion = data['id'] != null;//true, false
      this.cargaForm();
    });
  }

  cargaForm() {
    if (this.edicion) {
      this.empresaService.empresaporid(this.id).subscribe((data: Empresa) => {
        console.log(data);
        this.empresamodForm.patchValue({
          nombreEmpresa: data.nombreEmpresa,
          contactoEmpresa: data.contactoEmpresa,
        });
      });
    } //del if
  } // de cargaForm

  onSubmit2() {
    if (this.empresamodForm.valid) {
      const empresa: Empresa = new Empresa();
      empresa.idEmpresa = this.id;
      empresa.nombreEmpresa = this.empresamodForm.value.nombreEmpresa;
      empresa.contactoEmpresa = this.empresamodForm.value.contactoEmpresa;
      this.empresaService.update(empresa).subscribe((data: Object): void => {
        this.empresaService.list().subscribe(data => {
          this.empresaService.setList(data);
        });
      });
      alert(`Empresa registrada!`);
      this.router.navigate(['listas']);
    } else {
      console.log("Formulario no válido");
    }
  }

  onExit() {
    this.router.navigate(['listas']);
  }
}
