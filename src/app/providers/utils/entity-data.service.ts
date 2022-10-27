import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import Swal from 'sweetalert2';

export class EntityDataService<T> {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private authService: AuthService;
  private router: Router;
    constructor(
        protected httpClient: HttpClient,
        protected endPoint: string,
    ) {
    }

    public getAll$(): Observable<T> {
        // const params = { all: 'true' };
        return this.httpClient.get<T>(this.endPoint);
    }

    public getWithQuery$(params: any): Observable<T> {
        return this.httpClient.get<T>(this.endPoint, { params: params });
    }

    public getById$(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.endPoint}/${id}/`);
    }

    public add$(entity: T): Observable<T> {
        return this.httpClient.post<T>(this.endPoint, entity);
    }

    public update$(id: string, entity: T): Observable<T> {
        return this.httpClient.put<T>(`${this.endPoint}/${id}/`, entity/*, { headers: this.agregarAuthorizationHeader() }*/);
    }

    public delete$(id: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.endPoint}/${id}/`);
    }
/*
  private isNoAutorizado(e: any): boolean {
    if(e.status === 401 || e.status === 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }*/
  // esto ya está reemplazado por el interceptor
/*
  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
*/
  private isNoAutorizado(e: any): boolean {
    if (e.status == 401) { // Cerrar la sesión cuando el login expira

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['']);
      return true;
    }
    return false;
  }
}
