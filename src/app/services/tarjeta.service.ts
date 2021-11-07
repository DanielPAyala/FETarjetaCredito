import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  myAppUrl = 'https://localhost:44376/';
  apiUrl = 'api/Tarjetas/'

  constructor(private http: HttpClient) { }

  getListarTerjetas(): Observable<any>{
    return this.http.get(this.myAppUrl + this.apiUrl)
  }

  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.apiUrl + id);
  }

  saveTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.apiUrl, tarjeta);
  }

  updateTarjeta(id: number, tarjeta: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.apiUrl + id, tarjeta);
  }
}
