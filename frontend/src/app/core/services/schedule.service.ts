import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Schedule {
    doctorId: number;
    date: string;
    startHour: string;
    endHour: string;
    isAvailable: boolean;
  }


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) {}

  getScheduleForDoctor(doctor_id:string,date:string): Observable<Schedule[]> {
    const url = `http://localhost:8080/horarios/listar/${doctor_id}/${date}`;
    return this.httpClient.get<Schedule[]>(url);
  }

}
