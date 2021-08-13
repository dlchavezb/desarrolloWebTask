import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
//Services
import { TaskService } from "../../services/task.service";
import { AppLoaderService } from "../../shared/app-loader/app-loader.service";
import { ErrorService } from "../../services/error.service";
//Models
import { TaskView } from '../../models/task';

@Component({
  selector: 'app-task-section',
  templateUrl: './task-section.component.html',
  styleUrls: ['./task-section.component.sass']
})
export class TaskSectionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  regEntry: TaskView = {id: null, createdAt: null, state: false, title: null};
  titleTask: string;
  stateTask: boolean;
  listTask: TaskView[] = [];
  displayedColumns: string[] = [];
  dataSource: any;

  termino: string = null;

  dataBusqueda = [];

  constructor( private _taskService: TaskService,
               private _errorService: ErrorService,
               private loader: AppLoaderService,
               private paginate: MatPaginatorIntl
             ) { this.paginate.itemsPerPageLabel = "Registros por página"; }

  ngOnInit(): void {
    this.GetTask();
  }

  GetTask(){  
    this._taskService.GetTask()
    .subscribe((response: TaskView[]) => {
      this.listTask = response;
      console.log('GetTask', this.listTask);
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    () => {
      this.displayedColumns = ['id_task', 'title_task','complete','action'];      
      this.dataSource = new MatTableDataSource(this.listTask);
      this.dataBusqueda = this.listTask;
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      }, 600);
    });
  }

  buscarTask( termino:string ){
    let taskArr: TaskView[] = [];
    termino = termino.toLowerCase();
    for (let i = 0; i < this.dataBusqueda.length; i++ ) {
      let tasks = this.dataBusqueda[i];
      let nombre = tasks.title.toLowerCase();
      if (nombre.indexOf( termino ) >= 0){
        tasks.idx = i;
        taskArr.push( tasks )
      }         
    }
    console.log("elemento encontrado", taskArr);
    this.displayedColumns = ['id_task', 'title_task','complete','action'];      
    this.dataSource = new MatTableDataSource(taskArr);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;        
    }, 600);
  }

  createTask(formu: NgForm){
    this.loader.open();
    this.titleTask = formu.controls['textTitle'].value;
    this.stateTask = formu.controls['status'].value;
    this.regEntry = {id:"", createdAt: new Date(), state: this.stateTask, title: this.titleTask}
    console.log('la data a enviar al servicio es: ', this.regEntry);
    this._taskService.SaveTask( this.regEntry)
    .subscribe((response) =>{
      console.log("Respuesta de guardar tarea", response);
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
      this.loader.close();
    },
    () => {
      this.GetTask();
      this.loader.close();
      Swal.fire('Tarea registrada exitosamente.', '', 'success');
      formu.resetForm();
    });
  }
  
  deleteTask(ideTask: number){
    Swal.fire({
      title: '¿Desea eliminar la tarea ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(16, 23, 76)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._taskService.DeleteTask(ideTask)
    .subscribe((response) => { 
      console.log("Respuesta delete task", response);       
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    ()=> {
      this.GetTask();
      this.loader.close();
      Swal.fire('Tarea eliminada exitosamente.', '', 'success');
    });
      }
    })
  }

  updateTask(idTask: string, state:boolean, titleT:string){
    this.regEntry = {id: idTask, createdAt: new Date(), state: !state, title: titleT}
    this._taskService.UpdateTask(this.regEntry, idTask)
    .subscribe((response) => { 
      console.log("Respuesta servicio update", response);
    },
    error => {
      var message = this._errorService.HadlingError(error);
      this._errorService.SwalAlert(message.message, '', message.type);
    },
    ()=> {
      this.GetTask();
      this.loader.close();
      Swal.fire('Tarea actualizada exitosamente.', '', 'success');
    });
  }
}
