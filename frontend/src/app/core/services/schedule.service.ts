import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Schedule {
    id: number;
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
  private baseURL = 'http://localhost:8080/horarios/listar';
  constructor(private httpClient: HttpClient) {}

  getSchedules(): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(this.baseURL);
  }

  getScheduleForDoctor(doctor_id:string): Observable<Schedule[]> {
    const url = `${this.baseURL}/${doctor_id}`;
    return this.httpClient.get<Schedule[]>(url);
  }

  // Nuevo método para obtener solo el ID del primer horario disponible
  getScheduleId(doctor_id: string): Observable<number | null> {
    const url = `${this.baseURL}/${doctor_id}`;
    return this.httpClient.get<Schedule[]>(url).pipe(
      map(schedules => {
        const availableSchedule = schedules.find(schedule => schedule.isAvailable);
        return availableSchedule ? availableSchedule.id : null;
      })
    );
  }
}
