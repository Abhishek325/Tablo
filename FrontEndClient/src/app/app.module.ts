import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { AppRoutingModule } from './AppRoutingModule';
import { ConfigureComponent } from './main/configure/configure.component';
import { ListComponent } from './main/list/list.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { TableCardComponent } from './main/configure/table-card/table-card.component';
import { AddComponent } from './main/configure/add/add.component';
import { EditComponent } from './main/configure/edit/edit.component';
import { SidebarComponent } from './main/list/sidebar/sidebar.component';
import { AddDataComponent } from './main/list/add-data/add-data.component';
import { AppRequestInterceptor } from './http.interceptor';
import { DataViewComponent } from './main/list/data-view/data-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
    ConfigureComponent,
    ListComponent,
    FooterComponent,
    TableCardComponent,
    AddComponent,
    EditComponent,
    SidebarComponent,
    AddDataComponent,
    DataViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
