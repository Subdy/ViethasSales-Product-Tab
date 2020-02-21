import { Component,ViewChild } from '@angular/core';
import { Chart } from "chart.js";
@Component({
  selector: 'app-report-category',
  templateUrl: './report-category.page.html',
  styleUrls: ['./report-category.page.scss'],
})
export class ReportCategoryPage{
  @ViewChild("pieCanvas",{static: false}) pieCanvas;
  cao: number = 200;
  doughnutChart: any;
  data_total: Array<any>= [45,23,44,65,54,33];
  data_mau : Array<any> =  ["#FF9966", "#333399", "#00FF99", "#CCCC33", "#006699", "#FFA500"];
  data_chart : Array<any> = [
    {
      name : "Bao cao su",
      total : 1234567,
      color : 'red'   
    },
    {
      name : "Ghế cong đẹp",
      total : 1234567,
      color : 'green'   
    },
    {
      name : "Giường êm ái",
      total : 1234567,
      color : 'blue'   
    },
    {
      name : "Bao cao su",
      total : 1234567,
      color : 'red'   
    },
    {
      name : "Ghế cong đẹp",
      total : 1234567,
      color : 'green'   
    },
    {
      name : "Giường êm ái",
      total : 1234567,
      color : 'blue'   
    }
    ]
  constructor() { }
  segmentChanged($event){
    
  }
  ionViewDidEnter() {
    this.createBarChart();
    


  }
  createBarChart() {
      var data = {
        datasets: [
          {
            data:this.data_total,
            backgroundColor:this.data_mau,
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
                if (i == 1 || i == 4 ) {
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
        data:data,
        options: pieOptions,
      });
    }
}
