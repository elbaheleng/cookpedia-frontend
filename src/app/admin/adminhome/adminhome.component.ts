import { Component } from '@angular/core';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { AdminsidebarComponent } from '../adminsidebar/adminsidebar.component';
import { HighchartsChartComponent, ChartConstructorType } from 'highcharts-angular';
import { ApiService } from '../../service/api.service';
import { ChangeDetectionStrategy, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-adminhome',
  imports: [AdminheaderComponent, AdminsidebarComponent, MatCardModule, MatDatepickerModule, HighchartsChartComponent],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
  allUsers: any[] = []
  allRecipes: any[] = []
  allPendingTestimonials: any[] = []
  downloadCount: Number = 0
  pendingTestimonialCount: Number = 0
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllUsers()
    this.getAllRecipes()
    this.getAllDownloads()
    this.getAllTestimonials()
  }
  getAllUsers() {
    this.api.getAllUsersApi().subscribe({
      next: (res: any) => {
        this.allUsers = res.filter((item: any) => item.role != 'admin')
        // console.log(this.allUsers);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe({
      next: (res: any) => {
        this.allRecipes = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getAllDownloads() {
    this.api.getAllDownloadsApi().subscribe({
      next: (res: any) => {
        this.downloadCount = res.reduce((sum: any, item: any) => sum + item.count, 0)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getAllTestimonials(){
    this.api.getAllTestimonialsApi().subscribe({
      next: (res: any) => {
        this.allPendingTestimonials = res.filter((item:any) => item.status == "pending")
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  selected = model<Date | null>(null);


chartOptions: any = { chart: {
        type: 'bar'
    },
    title: {
        text: 'Cookpedia Website Analysis'
    },
    xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe'],
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true
            },
            groupPadding: 0.1
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
           '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Year 1990',
        data: [632, 727, 3202, 721]
    }, {
        name: 'Year 2000',
        data: [814, 841, 3714, 726]
    }, {
        name: 'Year 2021',
        data: [1393, 1031, 4695, 745]
    }]}
  // chartOptions: Highcharts.Options = {  }; // Required
  chartConstructor: ChartConstructorType = 'chart'; // Optional, defaults to 'chart'
  updateFlag: boolean = false; // Optional
  oneToOneFlag: boolean = true; // Optional, defaults to false
}
