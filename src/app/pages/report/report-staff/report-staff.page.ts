import { Component, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: "app-report-staff",
  templateUrl: "./report-staff.page.html",
  styleUrls: ["./report-staff.page.scss"]
})
export class ReportStaffPage {
  @ViewChild("barChart", { static: false }) barChart;
  bars: any;
  data_name: Array<any> = [
    "Hà Ngủ Tân",
    "Nguyễn Thị Hồng Oanh",
    "Kiều Phong",
    "Dương Quá",
    "Lưu Tuấn Nghĩa",
    "Mậu Dung Phục",
    "Nguyễn Thị Hồng Oanh",
    "Kiều Phong",
    "Dương Quá",
    "Lưu Tuấn Nghĩa",
    "Mậu Dung Phục"
  ];
  data_chart: Array<any> = [
    {
      name: "Hà Ngủ Tân",
      total: 12
    },
    {
      name: "Nguyễn Thị Hồng Oanh",
      total: 21
    },
    {
      name: "Kiều Phong",
      total: 14,
      color: "blue"
    },
    {
      name: "Dương Quá",
      total: 18
    },
    {
      name: "Lưu Tuấn Nghĩa",
      total: 17
    },
    {
      name: "Mậu Dung Phục",
      total: 12
    },
    {
      name: "Trương Nũ Yên",
      total: 23
    }
  ];
  constructor() {}

  ionViewDidEnter() {
    this.createBarChart();
  }
  segmentChanged($event){
    
  }
  createBarChart() {
    var sizeHeight = screen.height;
    var fontSize = sizeHeight / 100 + 5;
    console.log(fontSize);
    Chart.defaults.global.defaultFontSize = fontSize;
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: this.data_name,
        datasets: [
          {
            barPercentage: 0.4,
            label: "Doanh thu",
            backgroundColor: "#FFA500",
            data: [24, 23, 23, 21, 18, 19, 17, 18, 7, 5, 6]
          }
        ]
      },

      options: {
        legend: {
          display: true,
          labels: {
            fontSize: fontSize,
          }
        },
        layout: {
          padding: {
            left: 5,
            right: 5,
            bottom: 0,
            top: 0
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontSize: fontSize
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontSize: fontSize,
                suggestedMin: 0
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
