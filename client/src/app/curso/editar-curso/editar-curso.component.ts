import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../../servicios/crud.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.scss']
})
export class EditarCursoComponent implements OnInit {

  editCourseForm: FormGroup;
  courseData: any;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCourseData();
    this._editCourseForm();
  }

  private _getCourseData() {
    this.courseData = JSON.parse(localStorage.getItem('cursoData'));
  }

  _editCourseForm = () => {
    this.editCourseForm = this.formBuilder.group({
      title: [this.courseData.title, [Validators.required]],
      professor: [this.courseData.professor, [Validators.required]],
      description: [this.courseData.description, [Validators.required]],
      topic: [this.courseData.topic, [Validators.required]],
    });
  };

  update(): void {
    let updateData = {
      data: {
        titulo: this.editCourseForm.get('title').value,
        profesor: this.editCourseForm.get('professor').value,
        description: this.editCourseForm.get('description').value,
        tema: this.editCourseForm.get('topic').value,
      },
    };

    let updatedCourse = this.crudService.patchData(
      updateData,
      'curso',
      this.courseData._id
    );

    if (updatedCourse !== []) {
      this.router.navigate(['/curso']);
      localStorage.clear();
    }
  }

}
