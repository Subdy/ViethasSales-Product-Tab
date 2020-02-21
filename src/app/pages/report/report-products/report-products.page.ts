import { Component, ViewChild } from "@angular/core";
import { Chart } from "chart.js";
@Component({
  selector: "app-report-products",
  templateUrl: "./report-products.page.html",
  styleUrls: ["./report-products.page.scss"]
})
export class ReportProductsPage {
  @ViewChild("pieCanvas", { static: false }) pieCanvas;

  cao: number = 200;
  doughnutChart: any;
  data_total: Array<any> = [45, 23, 44, 65, 54, 33];
  data_mau: Array<any> = ["#FF9966", "#333399", "#00FF99", "#CCCC33", "#006699", "#FFA500"];
  data_chart: Array<any> = [
    {
      name: "Công ti Ngủ Tân",
      total: 1234567,
      code:"MA123A",
      color: "red"
    },
    {
      name: "Adidas",
      total: 1234567,
      code:"MO0953",
      color: "green"
    },
    {
      name: "Sextoy Vietnam",
      total: 1234567,
      code:"OU9965",
      color: "blue"
    },
    {
      name: "Ct Trí Sextoy",
      total: 1234567,
      code:"TG6869",
      color: "red"
    },
    {
      name: "Cti Phương 2c",
      total: 1234567333,
      code:"HO7070",
      color: "green"
    },
    {
      name: "Giường êm ái",
      total: 1234567,
      code:"PO233222",
      color: "blue"
    }
  ];
  constructor() {}

  ionViewDidEnter() {
    this.createBarChart();
  }
  segmentChanged($event){
    
  }
  createBarChart() {
    var data = {
      datasets: [
        {
          data: this.data_total,
          backgroundColor: this.data_mau,
          borderWidth: 0.3
        }
      ]
    };
    var pieOptions = {
      events: false,
      animation: {
        duration: 500,
        easing: "easeOutQuart",

        onComplete: function() {
          var ctx = this.chart.ctx;
          ctx.font = Chart.helpers.fontString(
            Chart.defaults.global.defaultFontFamily,
            "normal",
            Chart.defaults.global.defaultFontFamily
          );
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";

          this.data.datasets.forEach(function(dataset) {
            for (var i = 0; i < dataset.data.length; i++) {
              var model =
                  dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                mid_radius =
                  model.innerRadius +
                  (model.outerRadius - model.innerRadius) / 2,
                start_angle = model.startAngle,
                end_angle = model.endAngle,
                mid_angle = start_angle + (end_angle - start_angle) / 2;

              var x = mid_radius * Math.cos(mid_angle);
              var y = mid_radius * Math.sin(mid_angle);

              ctx.fillStyle = "#444";
              if (i == 1 || i == 3) {
                ctx.fillStyle = "#fff";
              }

              var total_per = Math.round(dataset.data[i]);
              var result;
              if (total_per < 5) {
                result = "";
              } else {
                result = String(total_per) + "%";
              }
              if (dataset.data[i] != 0) {
                ctx.fillText(result, model.x + x, model.y + y + 10);
              }
            }
          });
        }
      }
    };

    //bai trước

    var sizeHeight = screen.height;
    var fontSize = sizeHeight / 100 + 10;
    Chart.defaults.global.defaultFontSize = fontSize;
    let ctx = this.pieCanvas.nativeElement;
    ctx.height = this.cao;
    this.doughnutChart = new Chart(this.pieCanvas.nativeElement, {
      type: "pie",
      data: data,
      options: pieOptions
    });
  }
}
