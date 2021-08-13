import { Injectable } from '@angular/core';
import { MessageType } from './../models/message';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  messageType: MessageType;

  constructor( ){ }

    HadlingError(error: any) {
    console.log('ERROR SERVICIO', error.error.message);
    this.messageType = {
     message: null,
     type: null
    }
    switch(error.status) {
      //Not found
      case 404:
        this.messageType = {
          message: error.error.message,
          type:'warning'
        }
      break;
      //OK
      case 200:
        this.messageType = {
          message: error.error.message,
          type:'success'
        }
      break;
      //Bad request
      case 400:
        this.messageType = {
          message: error.error.message,
          type: 'error'
        }
      //Internal Server Error
      case 500:
        this.messageType = {
          message: 'Error inesperado',
          type: 'error'
        }
      break;
      default:
          this.messageType = {
            message: 'Tiempo de espera terminado',
            type: 'error'
          }
      break;
    }
    return this.messageType;
  }

  SwalAlert(title: string, message: string, type: any) {
    Swal.fire(title, message , type);
  }

}

