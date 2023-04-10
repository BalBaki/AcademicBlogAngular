import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { LoginGuard } from './admin/login.guard';
import { MultipleLoginGuard } from './admin/multipleLogin.guard';


const routes: Routes = [
  {path : 'blog',component : BlogComponent },
  {path : '', redirectTo : 'blog', pathMatch : 'full'},
  {path: 'admin', component:AdminComponent},
  {path: 'adminpanel', component:AdminpanelComponent, canActivate:[MultipleLoginGuard,LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
