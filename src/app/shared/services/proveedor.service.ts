import { Injectable } from '@angular/core';
import { ProveedorDTO } from './../objects/ProveedorDTO';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

const api_base_endpoint: string = environment.api_base_endpoint;
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private _proveedorUrl: string;
  private headers: HttpHeaders;

  constructor(private _http: HttpClient) {
    this._proveedorUrl = '/proveedor';
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  saveProveedor(proveedorDTO: ProveedorDTO): Observable<Boolean> {
    return this._http
      .post<Boolean>(api_base_endpoint + this._proveedorUrl, JSON.stringify(proveedorDTO), { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProveedor(proveedorDTO: ProveedorDTO): Observable<Boolean> {
    return this._http
      .post<Boolean>(api_base_endpoint + this._proveedorUrl + "/update", JSON.stringify(proveedorDTO), { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProveedores(): Observable<ProveedorDTO[]> {
    return this._http
      .post<ProveedorDTO[]>(api_base_endpoint + this._proveedorUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProveedor(proveedorDTO: ProveedorDTO): Observable<ProveedorDTO> {
    return this._http
      .post<ProveedorDTO>(api_base_endpoint + this._proveedorUrl, JSON.stringify(proveedorDTO), { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

