import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';

export interface CursoData {
  data: {
    titulo: string;
    profesor: string;
    description: number;
    tema: string;
  };
}


@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.scss']
})
export class NuevoCursoComponent implements OnInit {

  createCourseForm: FormGroup;
  dataCourse: CursoData

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._createCourseForm();
  }

  _createCourseForm = () => {
    this.createCourseForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      profesor: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tema: ['', [Validators.required]],
    });
  };

  registerCourse(): void {
    this.dataCourse = {
      data: {
        titulo: this.createCourseForm.get('titulo').value,
        profesor: this.createCourseForm.get('profesor').value,
        description: this.createCourseForm.get('description').value,
        tema: this.createCourseForm.get('tema').value,
      },
    };

    let savedCourse = this.crudService.postData(this.dataCourse, 'course');
    if (savedCourse !== []) {
      this.router.navigate(['/courses']);
    }
  }
}
