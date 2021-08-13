import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Service
import { ConfigurationService } from "../services/configuration.service";
//Model
import { TaskView } from '../models/task';

@Injectable({
    providedIn: 'root'
  })
  export class TaskService {
    private SerUrl: string = '';
    private httpOptions: { headers: HttpHeaders } ;
  
    constructor(
                private http: HttpClient,                
                private _config: ConfigurationService) 
            { 
                this.SerUrl = _config.GetUrlService();
                const httpOptions = {
                    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                };
            }

    // Método POST
    // Servicio para crear una tarea nueva.
    SaveTask(taskView: TaskView){
        const resp = this.http.post(this.SerUrl, taskView, this.httpOptions);
        return resp;
    }

    // Método GET
    // Servicio para consultar las tareas.
    GetTask(){
        const resp = this.http.get(this.SerUrl, this.httpOptions);
        return resp;
    }  

    // Metodo DELETE
    // Servicio para eliminar tareas
    DeleteTask(taskID: number){
        const url = this.SerUrl + '/'+ taskID;
        const resp = this.http.delete(url, this.httpOptions);
        return resp;
    }

    // Metodo PUT
    // Servicio para actualiza tareas
    UpdateTask(taskView: TaskView, id:string){
        const url = this.SerUrl + '/'+ id;
        const obs = this.http.put(url, taskView, this.httpOptions);
        return obs;
    }      
  }