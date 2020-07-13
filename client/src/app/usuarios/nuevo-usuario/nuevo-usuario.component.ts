import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';
import { FilesService } from '../../servicios/files.service.js';
import { DataRx } from 'src/app/modulos/data-rx';

export interface UserData {
  data: {
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    password: string;
    img: string;
  };
}

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
})

export class NuevoUsuarioComponent implements OnInit {
  createUserForm: FormGroup;
  dataUsuario: UserData;
  seeFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this._createUserForm();
  }

  _createUserForm = () => {
    this.createUserForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      img: ['', [Validators.required]],
    });
    this.seeFile = this.filesService.getFile(
      'galeria',
      '-eA01tmXbMq5RdY6S1Af-jJf.jpeg'
    );
  };

  registerUser(): void {
    this.dataUsuario = {
      data: {
        nombre: this.createUserForm.get('nombre').value,
        apellido: this.createUserForm.get('apellido').value,
        edad: this.createUserForm.get('edad').value,
        email: this.createUserForm.get('email').value,
        password: this.createUserForm.get('password').value,
        img: this.createUserForm.get('img').value,
      },
    };

    let confirmPassword = this.createUserForm.get('confirmPassword').value;

    if (this.dataUsuario.data.password === confirmPassword) {
      if (
        this.dataUsuario.data.nombre &&
        this.dataUsuario.data.apellido &&
        this.dataUsuario.data.email
      ) {
        const dataUsuario = {
          data: this.dataUsuario.data,
        };

        let savedUser = this.crudService.postData(dataUsuario, 'usuario');
        if (savedUser !== []) {
          this.router.navigate(['usuario']);
        }
      } else {
        console.log('llenar todo');
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "passwords don't match, try again",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }

  sendFile(event): void {
    let pic = this.createUserForm.get('profile_pic').value;

    if (pic !== '-eA01tmXbMq5RdY6S1Af-jJf.jpeg') {
      this.filesService.deleteFile('gallery', pic);
    }

    const file = event.target.files;
    // console.log(file);

    this.filesService.saveFile(file).subscribe((res: DataRx) => {
      // console.log(res);
      if (res.ok) {
        pic = res.data[0];
        this.seeFile = this.filesService.getFile('gallery', pic);
      }
    });
  }
}
