import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ConfigurationService {
    
    serUrl: string = environment.url;
  
    constructor() { }
  
    GetUrlService() {
      const Url = this.serUrl;
      return Url;
    }

    GetCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser;
      }
}