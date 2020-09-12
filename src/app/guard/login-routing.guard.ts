import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ErrorInfo } from '../shared/models/error-info';
import { ErrorHandleService } from '../service/error-handle.service';
import { AppComponent } from '../app.component';

@Injectable({
    providedIn: 'root'
})
export class LoginRoutingGuard implements CanActivate {

    constructor(private errorHandleService: ErrorHandleService,
                private router: Router,
                public appComponent: AppComponent) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            let self = this;

            return true;
    }
}
