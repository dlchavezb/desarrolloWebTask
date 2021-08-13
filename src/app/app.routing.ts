import { RouterModule, Routes } from '@angular/router';
import { TaskSectionComponent } from './components/task-section/task-section.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: TaskSectionComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);