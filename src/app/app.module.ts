import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BlogComponent } from './blog/blog.component';
import { AdminComponent } from './admin/admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AccountService } from './services/account.service';
import { LoginGuard } from './admin/login.guard';
import { MultipleLoginGuard } from './admin/multipleLogin.guard';
import { PdfFilterPipe } from './blog/pdf-filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    AdminComponent,
    AdminpanelComponent,
    PdfFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  providers: [AccountService,LoginGuard,MultipleLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
