import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-message-board',
    templateUrl: './message-board.component.html',
    styleUrls: ['./message-board.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MessageBoardComponent implements OnInit {
    @ViewChild('marqueePanelUL') marqueePanelUL: ElementRef;

    newMessageList = [];

    updateMessageTimer = null;

    @Input()
    set messageList(message: []) {
        let self = this;
        message.forEach((item) => {
            self.newMessageList.push(item);
        });
    }

    constructor() {
        let self = this;
        console.log(d3.version);

        if (this.updateMessageTimer) {
            window.clearInterval(this.updateMessageTimer);
        }

        this.updateMessageTimer = window.setInterval(() => {
            if (self.newMessageList.length > 0) {
                self.addMessage(self.newMessageList.shift());
            }
        }, 1500);
    }

    ngOnInit() {

    }

    addMessage(message) {
        let marqueePanelUl = d3.select(this.marqueePanelUL.nativeElement);
        let scrollHeight = 20;
        let fontSize = 16;

        marqueePanelUl.selectAll('li')
            .each(function(d, i, n) {
                if (i >= 20) {
                    d3.select(n[i]).remove();
                }
            });

        marqueePanelUl
            .transition()
            .duration(500)
            .style('top', scrollHeight + 'px')
            .on('end', function() {
                let li = marqueePanelUl.insert('li', ':first-child');
                li.style('opacity', 0);
                li.append('span')
                    .classed('message-block', true)
                    .style('font-size', fontSize + 'px')
                    .text(message.message);

                li.append('span')
                    .classed('date-block', true)
                    .style('font-size', fontSize + 'px')
                    .text(d3.timeFormat('%Y/%m/%d %H:%M:%S')(message.date));

                li.transition()
                    .duration(500)
                    .style('opacity', 1);

                marqueePanelUl.style('top', 0);

            });
    }

}
