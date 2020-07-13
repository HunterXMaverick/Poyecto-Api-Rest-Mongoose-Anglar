import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../servicios/crud.service';
import { WebServiceService } from '../servicios/web-service.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
  private url: String;
  cursoData = [];

  constructor(
    private crudService: CrudService,
    private server: WebServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.url = this.server.getUrl();
  }

  ngOnInit(): void {
    this.getCursos
  }

  getCursos(): void {
    this.http
      .get(`${this.url}cursos`, this.server.getHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.cursoData.push(element);
        });
      });
  }

  delete(_id) {
    this.crudService.deleteData('cursos', _id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/cursos']);
    });
  }

  edit(courseData): void {
    localStorage.setItem('cursoData', JSON.stringify(this.cursoData));
    this.router.navigate(['/cursos/editar']);
  }

  goCreateCourse() {
    this.router.navigate(['/cursos/create']);
  }

}
