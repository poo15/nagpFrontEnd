import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../Notification';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  getNotifications():Observable<Notification[]>{
    console.log("in service");
    return this.http.get<Notification[]>('http://localhost:8080/admin/notification');
  }
}
