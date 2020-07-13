import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../servicios/crud.service';
import { WebServiceService } from '../servicios/web-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  private url: string;
  userData = [];

  constructor(
    private crudService: CrudService,
    private server: WebServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.url = this.server.getUrl();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http
      .get(`${this.url}users`, this.server.getHeaders())
      .subscribe((data: any) => {
        data.data.forEach((element) => {
          this.userData.push(element);
        });
      });
  }

  delete(_id) {
    this.crudService.deleteData('usuario', _id);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/usuario']);
    });
  }

  edit(userData): void {
    localStorage.setItem('usuarioData', JSON.stringify(userData));
    this.router.navigate(['/users/edit']);
  }

  goCreateUser() {
    this.router.navigate(['/users/create']);
  }
}