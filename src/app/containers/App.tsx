import "@babel/polyfill"
import * as React from 'react';
import {hot} from "react-hot-loader";
import {imageBytes} from "@shared/utils/stripDateUri";
import {PdfDocument} from "@app/document-interface";
import * as Chart from 'chart.js';
import {barChartData, LineChart, raderChart} from "@shared/utils/chartUtils";

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    chartArea: {
        backgroundColor: 'red'
    },
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class App extends React.Component {
    state = {
        number: 1
    }

    async componentDidMount() {
        // @ts-ignore

        const canvas = document.getElementById("barChart")
        Chart.pluginService.register({
            beforeDraw: function (chart, easing) {
                if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
                    var helpers = Chart.helpers;
                    var ctx = chart.chart.ctx;
                    var chartArea = chart.chartArea;

                    ctx.save();
                    ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                    ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                    ctx.restore();
                }
            },
            afterRender: function (c) {
                console.log("afterRender called");
                var ctx = c.chart.ctx;
                ctx.save();
                // This line is apparently essential to getting the
                // fill to go behind the drawn graph, not on top of it.
                // Technique is taken from:
                // https://stackoverflow.com/a/50126796/165164
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, c.chart.width, c.chart.height);
                ctx.restore();
            }
        });


        var ctx = document.getElementById("barChart").getContext("2d");
        var ctx1 = document.getElementById("linechart").getContext("2d");
        var ctx3 = document.getElementById("radarchart").getContext("2d");
        new Chart(ctx1, LineChart)
        new Chart(ctx3, raderChart)
        new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: false,
                    aspectRatio: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart'
                    }
                }
            }
        );
        const wasam = await import("@lib/wasm-pdf/pkg");
        setTimeout(async _ => {


                if (canvas) {
                    const imageData = canvas.toDataURL();
                    const iamgeWithMeta = await imageBytes(imageData, 'test-image')

                    const imageData1 = document.getElementById("linechart").toDataURL();
                    const iamgeWithMeta1 = await imageBytes(imageData1, 'test-image1')

                    const imageData2 = document.getElementById("radarchart").toDataURL();
                    const iamgeWithMeta2 = await imageBytes(imageData2, 'test-image2')
                    const doc: PdfDocument = {
                        title: "Test Document",
                        template: {
                            left: 10,
                            top: 20,
                            bottom: 20,
                            right: 10
                        },
                        contents: [
                            {
                                obj_type: "Paragraph",
                                params: {
                                    font_size: 21,
                                    align: "center",
                                    text: "Testing client side printing with Charts"
                                }
                            },
                            {
                                obj_type: "Image",
                                params: {
                                    fit_width: true,
                                    src: iamgeWithMeta.path,
                                    align: "center"
                                }
                            }, {
                                obj_type: "Paragraph", params: {
                                    font_size: 13,
                                    align: "left",
                                    text: "Bar Chart"
                                }
                            }, {
                                obj_type: "Paragraph", params: {
                                    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et" +
                                        " dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                                    font_size: 9,
                                    align: "left",

                                }
                            }, {
                                obj_type: "Image",
                                params: {
                                    fit_width: true,
                                    src: iamgeWithMeta1.path,
                                    align: "center"
                                }
                            }, {
                                obj_type: "Paragraph", params: {
                                    font_size: 13,
                                    align: "left",
                                    text: "Line Chart"
                                }
                            }, {
                                obj_type: "Paragraph", params: {
                                    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et" +
                                        " dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                                    font_size: 9,
                                    align: "left",

                                }
                            }, {
                                obj_type: "Image",
                                params: {
                                    fit_width: true,
                                    src: iamgeWithMeta2.path,
                                    align: "center"
                                }
                            },
                            {
                                obj_type: "Paragraph", params: {
                                    font_size: 13,
                                    align: "left",
                                    text: "Radar (Spider chart)"
                                }
                            }, {
                                obj_type: "Paragraph", params: {
                                    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et" +
                                        " dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                                    font_size: 9,
                                    align: "left",

                                }
                            },
                        ],
                        image_data: {
                            [iamgeWithMeta.path]: iamgeWithMeta.data,
                            [iamgeWithMeta1.path]: iamgeWithMeta1.data,
                            [iamgeWithMeta2.path]: iamgeWithMeta2.data,
                        },
                        image_heights: {
                            [iamgeWithMeta.path]: iamgeWithMeta.height,
                            [iamgeWithMeta1.path]: iamgeWithMeta1.height,
                            [iamgeWithMeta2.path]: iamgeWithMeta2.height
                        },
                        image_widths: {
                            [iamgeWithMeta.path]: iamgeWithMeta.width,
                            [iamgeWithMeta1.path]: iamgeWithMeta1.width,
                            [iamgeWithMeta2.path]: iamgeWithMeta2.width

                        }
                    }
                    console.log(doc);
                    wasam.run(doc)
                }
            }

            ,
            2000
        )


    }

    render() {
        return (
            <div>
                <canvas id="barChart" width="1200" height="600"/>
                <canvas id="linechart" width="1200" height="600"/>
                <canvas id="radarchart" width="1200" height="600"/>
            </div>
        )
    }
}

export default hot(module)(App);
/*
*
* 2 x 6
* 1 x 3
* */
