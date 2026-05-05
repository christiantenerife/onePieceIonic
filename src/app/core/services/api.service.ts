import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.api-onepiece.com/v2';

  get<T>(endpoint: string, params?: Record<string, string>): Observable<T> {
    let httpParams = new HttpParams();

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value.trim() !== '') {
          httpParams = httpParams.set(key, value);
        }
      }
    }

    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      params: httpParams
    });
  }
}