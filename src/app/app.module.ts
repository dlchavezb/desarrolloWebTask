import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon';
// routes
import { APP_ROUTING } from './app.routing'
// Services
import { AppLoaderService } from './shared/app-loader/app-loader.service';
//Components
import { SharedMaterialModule } from "./shared/shared-material.module";
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { TaskSectionComponent } from './components/task-section/task-section.component';

@NgModule({
  exports:[ SharedMaterialModule ]
  ,
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskSectionComponent
  ],
  imports: [
    MatTableModule,
    MatIconModule,
    SharedMaterialModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSelectModule,
    APP_ROUTING
  ],
  providers: [ AppLoaderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
