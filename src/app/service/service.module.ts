import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingGuard } from '../guard/login-routing.guard';

import { ErrorHandleService } from './error-handle.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ],
    providers: [
        LoginRoutingGuard,
        ErrorHandleService
    ]
})
export class ServiceModule { }
