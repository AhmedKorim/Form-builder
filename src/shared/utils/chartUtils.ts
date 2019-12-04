import * as Chart from 'chart.js';


export const chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

export const color = Chart.helpers.color;
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const COLORS = [
    '#4dc9f6',
    '#f67019',
    '#f53794',
    '#537bc4',
    '#acc236',
    '#166a8f',
    '#00a950',
    '#58595b',
    '#8549ba'
];


export const SamplesUtils = {
    // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    srand: function (seed) {
        this._seed = seed;
    },
    _seed: this && this._seed || 44,
    rand: function (min, max) {
        var seed = this._seed;
        min = min === undefined ? 0 : min;
        max = max === undefined ? 1 : max;
        this._seed = (seed * 9301 + 49297) % 233280;
        return min + (this._seed / 233280) * (max - min);
    },

    numbers: function (config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 1;
        var from = cfg.from || [];
        var count = cfg.count || 8;
        var decimals = cfg.decimals || 8;
        var continuity = cfg.continuity || 1;
        var dfactor = Math.pow(10, decimals) || 0;
        var data = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = (from[i] || 0) + this.rand(min, max);
            if (this.rand() <= continuity) {
                data.push(Math.round(dfactor * value) / dfactor);
            } else {
                data.push(null);
            }
        }

        return data;
    },

    labels: function (config) {
        var cfg = config || {};
        var min = cfg.min || 0;
        var max = cfg.max || 100;
        var count = cfg.count || 8;
        var step = (max - min) / count;
        var decimals = cfg.decimals || 8;
        var dfactor = Math.pow(10, decimals) || 0;
        var prefix = cfg.prefix || '';
        var values = [];
        var i;

        for (i = min; i < max; i += step) {
            values.push(prefix + Math.round(dfactor * i) / dfactor);
        }

        return values;
    },

    months: function (config) {
        var cfg = config || {};
        var count = cfg.count || 12;
        var section = cfg.section;
        var values = [];
        var i, value;

        for (i = 0; i < count; ++i) {
            value = MONTHS[Math.ceil(i) % 12];
            values.push(value.substring(0, section));
        }

        return values;
    },

    color: function (index) {
        return COLORS[index % COLORS.length];
    },

    transparentize: function (color, opacity) {
        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
        return Color(color).alpha(alpha).rgbString();
    }
};

// DEPRECATED
export const randomScalingFactor = function () {

    return Math.round(SamplesUtils.rand(-100, 100));
};


export const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
        borderColor: chartColors.red,
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }, {
        label: 'Dataset 2',
        backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
        borderColor: chartColors.blue,
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]

};


export const datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];
export const LineChart = {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [{
            label: 'Cubic interpolation (monotone)',
            data: datapoints,
            borderColor: chartColors.red,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            fill: false,
            cubicInterpolationMode: 'monotone'
        }, {
            label: 'Cubic interpolation (default)',
            data: datapoints,
            borderColor: chartColors.blue,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            fill: false,
        }, {
            label: 'Linear interpolation',
            data: datapoints,
            borderColor: chartColors.green,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            fill: false,
            lineTension: 0
        }]
    },
    options: {
        responsive: false,
        title: {
            display: true,
            text: 'Chart.js Line Chart - Cubic interpolation mode'
        },
        tooltips: {
            mode: 'index'
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                ticks: {
                    suggestedMin: -10,
                    suggestedMax: 200,
                }
            }]
        }
    }
};


export const raderChart = {
    type: 'radar',
    data: {
        labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: color(chartColors.red).alpha(0.2).rgbString(),
            borderColor: chartColors.red,
            pointBackgroundColor: chartColors.red,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }, {
            label: 'My Second dataset',
            backgroundColor: color(chartColors.blue).alpha(0.2).rgbString(),
            borderColor: chartColors.blue,
            pointBackgroundColor: chartColors.blue,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]
    },
    options: {
        responsive: false,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Radar Chart'
        },
        scale: {
            ticks: {
                beginAtZero: true
            }
        }
    }
};
