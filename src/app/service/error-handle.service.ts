import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { ErrorInfo } from '../shared/models/error-info';
import { AppComponent } from '../app.component';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandleService {

    constructor(private router: Router,
                public appComponent: AppComponent) {

    }

    httpErrorHandle(exception) {
        let error = null;

        if (exception) {
            if (exception.status === 421) {
                this.router.navigate(['/login']);
            }
            else if (exception.status === 422) {
                this.router.navigate(['/page-not-found']);
            }
            else {
                error = new ErrorInfo();
                error.message = exception.error.error ? exception.error.error : exception.error;
            }
        }

        return error;
    }
}
