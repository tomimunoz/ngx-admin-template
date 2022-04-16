import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
    selector: 'ngx-echarts-horizontal-bar',
    template: `
      <div echarts [options]="options" class="echart"></div>
    `,
})

export class EchartsHorizontalBarComponent implements AfterViewInit, OnDestroy {
    options: any = {};
    themeSubscription: any;
    chartInstance: any;

    constructor(private theme: NbThemeService) {
    }

    ngAfterViewInit() {
        this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

            const colors: any = config.variables;
            const echarts: any = config.variables.echarts;

            this.options = {
                backgroundColor: echarts.bg,
                color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
                        label: {
                            backgroundColor: echarts.tooltipBackgroundColor,
                        },
                    }
                },
                legend: {
                    textStyle: {
                        color: echarts.textColor,
                    },
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: false,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: echarts.axisLineColor,
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: echarts.textColor,
                        },
                    },
                },
                yAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisLine: {
                        lineStyle: {
                            color: echarts.axisLineColor,
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: echarts.splitLineColor,
                        },
                    },
                    axisLabel: {
                        textStyle: {
                            color: echarts.textColor,
                        },
                    },
                },
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [320, 302, 301, 334, 390, 330, 320],
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                    },
                    {
                        name: 'Mail Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                        data: [100, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Affiliate Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Video Ad',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                        data: [150, 212, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Search Engine',
                        type: 'bar',
                        stack: 'total',
                        label: {
                            show: true
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        areaStyle: { normal: { opacity: echarts.areaOpacity } },
                        data: [820, 832, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
        });
    }


    

    ngOnDestroy(): void {
        this.themeSubscription.unsubscribe();
    }
}