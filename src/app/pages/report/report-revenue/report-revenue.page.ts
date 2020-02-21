import { Component, ViewChild } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-report-revenue",
  templateUrl: "./report-revenue.page.html",
  styleUrls: ["./report-revenue.page.scss"]
})
export class ReportRevenuePage {
  @ViewChild("barChart", { static: false }) barChart;
  bars: any;

  constructor() {
    console.log("overview");
  }
  ionViewDidEnter() {
    this.createBarChart();
  }
  segmentChanged($event){
    
  }
  createBarChart() {
    var cxt = this.barChart.nativeElement.getContext("2d");
    var gradient = cxt.createLinearGradient(0, 0, 0, 170);
    var sizeHeight = screen.height;
    var fontSize = sizeHeight / 100 + 4;
    Chart.defaults.global.defaultFontSize = fontSize;
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "bar",
      data: {
        labels: ["6-8h", "8-10h", "10-12h", "12h-14h", "14-16h", "16-18h"],
        datasets: [
          {
            barPercentage: 0.7,
            label: "Doanh thu",
            backgroundColor: "#FF9900",
            borderWidth: 1,
            data: [6, 4, 7, 3, 4, 6, 7]
          },
          {
            barPercentage: 0.7,
            label: "Lợi nhuận",
            backgroundColor: "#FFCCFF",
            borderWidth: 1,
            data: [5, 7, 6, 5, 6, 7, 8]
          }
        ]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return tooltipItem.yLabel
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            }
          }
        },
        legend: {
          display: true,
          labels: {
            fontSize: 16,
            fontFamily: "Roboto",
            fontStyle: "normal"
          }
        },
        layout: {
          padding: {
            left: 5,
            right: 0,
            bottom: 5,
            top: 0
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(label) {
                  return label
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                },
                beginAtZero: true,
                fontSize: 9,
                fontFamily: "Roboto",
                fontStyle: "inherit",
                padding: 2
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 9,
                fontFamily: "Roboto",
                fontStyle: "inherit"
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    });
  }
}
