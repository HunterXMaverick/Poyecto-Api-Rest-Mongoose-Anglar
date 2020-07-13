import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';
import { FilesService } from '../../servicios/files.service';
import { DataRx } from 'src/app/modulos/data-rx';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  editUserForm: FormGroup;
  usuarioData: any;
  seeFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this._getUserData();
    this._editUserForm();
    this.seeFile = this.filesService.getFile(
      'galeria',
      this.usuarioData.profile_pic
    );
  }

  private _getUserData() {
    this.usuarioData = JSON.parse(localStorage.getItem('usuarioData'));
  }

  _editUserForm = () => {
    this.editUserForm = this.formBuilder.group({
      name: [this.usuarioData.nombre, [Validators.required]],
      lastname: [this.usuarioData.apellido, [Validators.required]],
      age: [this.usuarioData.edad, [Validators.required]],
      email: [this.usuarioData.email, [Validators.required]],
      password: [this.usuarioData.password, [Validators.required]],
      profile_pic: [this.usuarioData.img, [Validators.required]],
    });
  };

  _update(): void {
    let updateData = {
      data: {
        nombre: this.editUserForm.get('nombre').value,
        apellido: this.editUserForm.get('apellido').value,
        edad: this.editUserForm.get('edad').value,
        email: this.editUserForm.get('email').value,
        password: this.editUserForm.get('password').value,
        img: this.editUserForm.get('img').value,
      },
    };

    let updatedUser = this.crudService.patchData(
      updateData,
      'usuario',
      this.usuarioData._id
    );

    if (updatedUser !== []) {
      this.router.navigate(['/usuario']);
      localStorage.clear();
    }
  }

  sendFile(event): void {
    let pic = this.editUserForm.get('profile_pic').value;

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