import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';

import { environment } from '../environments/environment';

function getWindow(): any {
    return window;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    spinnerEnable = false;

    constructor(public router: Router,
                public translate: TranslateService,
                public activatedRoute: ActivatedRoute,
                public modalService: BsModalService,
                private messageService: MessageService) {
        translate.setDefaultLang('en');
        translate.use('en');

        // translate.setDefaultLang('zh-tw');
        // translate.use('zh-tw');
    }

    ngOnInit() {
        console.log('%c web: v' + environment.version +
                    (getWindow().publishDate ? ('-' + getWindow().publishDate) : ''),
            'color: #5cb85c');
    }
}
