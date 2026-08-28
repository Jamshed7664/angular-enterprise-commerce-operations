import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class ApiService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.apiUrl;
    list<T>(resource: string, query: Record<string, string | number | boolean | null | undefined> = {}): Observable<T[]> {
        let params = new HttpParams();
        for (const [key, value] of Object.entries(query)) {
            if (value !== null && value !== undefined && value !== '') {
                params = params.set(key, String(value));
            }
        }
        return this.http.get<T[]>(`${this.baseUrl}/${resource}`, { params });
    }
    get<T>(resource: string, id: number): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${resource}/${id}`);
    }
    create<T>(resource: string, payload: unknown): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${resource}`, payload);
    }
    update<T>(resource: string, id: number, payload: unknown): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${resource}/${id}`, payload);
    }
    delete(resource: string, id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${resource}/${id}`);
    }
}

