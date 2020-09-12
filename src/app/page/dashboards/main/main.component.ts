import { Component, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, HostListener, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

declare var worldGeoJson: any;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('content') elementView: ElementRef;
    @ViewChild('messageBoardBlock') messageBoardBlock: ElementRef;
    @ViewChild('statusBlock') statusBlock: ElementRef;

    @ViewChild('leftBlock') leftBlock: ElementRef;
    @ViewChild('middleBlock') middleBlock: ElementRef;

    @ViewChild('rightBlock') rightBlock: ElementRef;
    @ViewChild('chartBlock1') chartBlock1: ElementRef;
    @ViewChild('chartBlock2') chartBlock2: ElementRef;
    @ViewChild('chartBlock3') chartBlock3: ElementRef;
    @ViewChild('chartBlock4') chartBlock4: ElementRef;
    @ViewChild('chartBlock5') chartBlock5: ElementRef;
     // right
    lineOptions: any;
    lineUpdateOptions: any;
    barOptions: any;

    // left
    gaugeOptions: any;
    gaugeUpdateOptions: any;

    // right
    chartInstance1: any;
    chartInstance2: any;
    // left
    chartInstance3: any;
    chartInstance4: any;
    // middle
    mapOptions: any;
    chartInstance5: any;

    private oneDay = 24 * 3600 * 1000;
    private now: Date;
    private value: number ;
    private data: any[];

    messageList = [];
    updateMessageTimer = null;

    constructor() {
        let maxNum = 20;
        let message = [];

        for (let i = 0; i < maxNum; i++) {
            message.push({
                title: 'Event ' + (i + 1),
                message: 'Device ' + (i + 1) + ' is OK.',
                date: new Date()
            });
        }

        this.messageList = message;

        echarts.registerMap('world', worldGeoJson);
    }

    ngOnInit() {
        let self = this;

        this.lineOptions = this.lineData();
        this.barOptions = this.barData();

        this.gaugeOptions = this.gaugeData();

        this.mapOptions = this.mapData();

        if (this.updateMessageTimer) {
            window.clearInterval(this.updateMessageTimer);
        }

        this.updateMessageTimer = window.setInterval(() => {
            self.updateMessage();
            self.updateLineData();
            self.updateGaugeData();
        }, 8000);
    }

    ngAfterViewInit() {
        this.onResize();
    }

    ngOnDestroy() {
        clearInterval(this.updateMessageTimer);
    }

    updateMessage() {
        this.messageList = [...this.messageList];
    }

    randomData() {
        this.now = new Date(this.now.getTime() + this.oneDay);
        this.value = this.value + Math.random() * 21 - 10;
        return {
            name: this.now.toString(),
            value: [
                [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
                Math.round(this.value)
            ]
        };
    }

    lineData() {
        this.data = [];
        this.now = new Date(1997, 9, 3);
        this.value = Math.random() * 1000;

        for (let i = 0; i < 1000; i++) {
            this.data.push(this.randomData());
        }

        return {
            title: {
                text: 'Line Chart'
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    params = params[0];
                    const date = new Date(params.name);

                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                show: false
                }
            },
            series: [
                {
                    name: 'Mocking Data',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: this.data
                }
            ],
            backgroundColor: 'transparent'
        };
    }

    updateLineData() {
        for (let i = 0; i < 5; i++) {
            this.data.shift();
            this.data.push(this.randomData());
        }

        this.lineUpdateOptions = {
            series: [
                {
                    data: this.data
                }
            ]
        };
    }

    barData() {
        const xAxisData = [];
        const data1 = [];
        const data2 = [];

        for (let i = 0; i < 100; i++) {
            xAxisData.push('category' + i);
            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        return {
            title: {
                text: 'Bar Chart'
            },
            legend: {
                data: ['bar', 'bar2'],
                align: 'left',
            },
            tooltip: {},
            xAxis: {
                data: xAxisData,
                silent: false,
                splitLine: {
                    show: false,
                },
            },
            yAxis: {},
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    data: data1,
                    animationDelay: (idx) => idx * 10
                },
                {
                    name: 'bar2',
                    type: 'bar',
                    data: data2,
                    animationDelay: (idx) => idx * 10 + 100
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: (idx) => idx * 5,
            backgroundColor: 'transparent'
        };
    }

    gaugeData() {
        return {
            title: {
                text: 'Gauge'
            },
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
                {
                    name: 'demo',
                    type: 'gauge',
                    detail: {formatter: '{value}%'},
                    data: [{value: 50, name: 'Rate'}]
                }
            ],
            backgroundColor: 'transparent'
        };
    }

    mapData() {
        return {
            title: {
                text: 'World Map'
            },
            tooltip: {
                triggerOn: 'click',
                enterable: true
            },
            legend: {
                show: true,
                zlevel: 10,
                selectedMode: 'single',
                textStyle: {
                    color: '#fff'
                },
                orient: 'horizontal',
                top: 5,
                left: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 5,
                data: []
            },
            geo: {
                name: '',
                type: 'map',
                map: 'world',
                center: [100.83, 25.03],
                roam: true,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.8)'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    emphasis: {
                        areaColor: '#323c48'
                    }
                }
            },
            backgroundColor: 'transparent'
        };
    }

    updateGaugeData() {
        this.gaugeUpdateOptions = {
            series: [
                {
                    data: [
                        {
                            value: Math.ceil(Math.random() * 100)
                        }
                    ]
                }
            ]
        };
    }

    onChartInit(id, e: any) {
        this['chartInstance' + id] = e;
    }

    @HostListener('window:resize', [])
    onResize() {
        let navbarHeight = 50;
        let footerHeight = 30;
        let contentHeight = this.elementView.nativeElement.clientHeight;
        let blockPadding = 5;
        let chartPadding = 5;
        contentHeight = contentHeight - navbarHeight - footerHeight;

        this.leftBlock.nativeElement.style.height = (contentHeight * 0.8) + 'px';
        this.middleBlock.nativeElement.style.height = (contentHeight * 0.8) + 'px';
        this.rightBlock.nativeElement.style.height = (contentHeight * 0.8) + 'px';
        this.messageBoardBlock.nativeElement.style.height = (contentHeight * 0.2) + 'px';
        this.statusBlock.nativeElement.style.height = (contentHeight * 0.2) + 'px';
        // right
        this.chartBlock1.nativeElement.style.height =
            (((contentHeight * 0.8) - (2 * blockPadding) - (4 * chartPadding)) * 0.5) + 'px';
        this.chartBlock2.nativeElement.style.height =
            (((contentHeight * 0.8) - (2 * blockPadding) - (4 * chartPadding)) * 0.5) + 'px';

        if (this.chartInstance1) {
            this.chartInstance1.resize();
        }
        if (this.chartInstance2) {
            this.chartInstance2.resize();
        }

        // left
        this.chartBlock3.nativeElement.style.height =
            (((contentHeight * 0.8) - (2 * blockPadding) - (4 * chartPadding)) * 0.5) + 'px';
        this.chartBlock4.nativeElement.style.height =
            (((contentHeight * 0.8) - (2 * blockPadding) - (4 * chartPadding)) * 0.5) + 'px';

        if (this.chartInstance3) {
            this.chartInstance3.resize();
        }
        if (this.chartInstance4) {
            this.chartInstance4.resize();
        }

        // middle
        this.chartBlock5.nativeElement.style.height =
            (((contentHeight * 0.8) - (2 * blockPadding) - (2 * chartPadding))) + 'px';

        if (this.chartInstance5) {
            this.chartInstance5.resize();
        }
    }

}
