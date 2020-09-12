import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-common-navbar',
    templateUrl: './common-navbar.component.html',
    styleUrls: ['./common-navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CommonNavbarComponent implements OnInit {
    @Input() titleString: string;

    constructor(public router: Router) {
    }

    ngOnInit() {
    }
}
