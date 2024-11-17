import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {Usuario} from '../../model/usuario';
import {UsuarioService} from '../../services/usuario.service';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {DialogoComponent} from './dialogo/dialogo.component';
import {Hucontacto} from '../../model/hucontacto';
import {ContactoService} from '../../services/contacto.service';
import {DatePipe} from '@angular/common';
import {Empresa} from '../../model/empresa';
import {EmpresaService} from '../../services/empresa.service';

@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    MatButton,
    RouterLink,
    DatePipe
  ],
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.css'
})
export class ListasComponent {
  lista: Usuario[] = [];
  //Usuarios
  displayedColumns: string[] = ['idUsuario', 'rol', 'nombreCompleto', 'nombreUsuario', 'correoElectronico', 'contrasena', 'accion01', 'accion02'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();
  usuarioService: UsuarioService = inject(UsuarioService);

  //Mensajes
  displayedColumns2: string[] = ['idContacto', 'mensaje', 'tipoMensaje', 'fechaEnvio'];
  dataSource2: MatTableDataSource<Hucontacto> = new MatTableDataSource<Hucontacto>();
  contactoService: ContactoService = inject(ContactoService);

  //Empresas
  displayedColumns3: string[] = ['idEmpresa', 'nombreEmpresa', 'contactoEmpresa', 'accion1', 'accion2'];
  dataSource3: MatTableDataSource<Empresa> = new MatTableDataSource<Empresa>();
  empresaService: EmpresaService = inject(EmpresaService);

  dialog: MatDialog = inject(MatDialog);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  router: Router = inject(Router);


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadLista();
  }

  private loadLista(): void {
    this.usuarioService.list().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (error) => console.log("Error en consulta", error),
    });

    this.contactoService.list().subscribe({
      next: (data) => this.dataSource2.data = data,
      error: (error) => console.log("Error en consulta", error),
    });

    this.empresaService.list().subscribe({
      next: (data) => this.dataSource3.data = data,
      error: (error) => console.log("Error en consulta", error),
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      } else {
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  delete(id: number) {
    this.usuarioService.delete(id).subscribe({
      next: () => {
        this.loadLista();
      },
      error: (err) => console.error("Error de eliminacion", err)
    });
  }

  //Para empresa

  openDialogEmpresa(id: number) {
    const dialogRef = this.dialog.open(DialogoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmpresa(id);
      } else {
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  deleteEmpresa(id:number){
    this.empresaService.delete(id).subscribe({
      next:()=>{
        this.loadLista();
      },
      error:(err)=>console.error("Error de eliminacion", err)
    });
  }


  onSalir() {
    this.router.navigate(['inicioadministrador']);
  }
}
