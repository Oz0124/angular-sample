import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { ModalModule,
         ProgressbarModule } from 'ngx-bootstrap';

import { SharedModule } from './shared/shared.module';

// page
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';

import { ServiceModule } from './service/service.module';
import { MessageService } from 'primeng/api';
import { DashboardsComponent } from './page/dashboards/dashboards.component';
import { MainComponent } from './page/dashboards/main/main.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastModule,
        BreadcrumbModule,
        SelectButtonModule,
        InputSwitchModule,
        TabViewModule,
        RadioButtonModule,
        DropdownModule,
        KeyFilterModule,
        TableModule,
        ChartModule,
        InputTextareaModule,
        ButtonModule,
        ModalModule.forRoot(),
        ProgressbarModule.forRoot(),
        SharedModule,
        HttpClientModule,
        ServiceModule,
        NgxEchartsModule.forRoot({
            echarts
        })
    ],
    // private
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        DashboardsComponent,
        MainComponent
    ],
    // public
    exports: [
        ToastModule,
        BreadcrumbModule,
        SelectButtonModule,
        InputSwitchModule,
        TabViewModule,
        RadioButtonModule,
        DropdownModule,
        KeyFilterModule,
        TableModule,
        ChartModule,
        InputTextareaModule,
        ButtonModule,
        ServiceModule
    ],
    providers: [
        Title,
        AppComponent,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
