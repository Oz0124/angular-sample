import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-common-footer',
    templateUrl: './common-footer.component.html',
    styleUrls: ['./common-footer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CommonFooterComponent implements OnInit {
    @Input() titleString: string;

    constructor() { }

    ngOnInit() {
    }

}
