import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {ApiCalls} from '../../shared/api-calls/apiCalls';
import {ActivatedRoute} from '@angular/router';
import {AVG_TYPES} from '../../../assets/data/avg_types';
// tslint:disable-next-line:no-unused-expression
import 'chartjs-plugin-zoom';
import {NgxSpinnerService} from 'ngx-spinner';
import {AQI, IR_Light, UV_Light} from '../../../assets/data/readings_ranges';
declare var google: any;


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {


  public canvas: any;
  public ctx;
  public chartColor;
  public chartTemp;
  public chartHumidity;
  public chartAvgHumidity;
  public chartAvgTemp;
  public chartTurbidity;
  public chartAvgTurbidity;
  public chartAvgPressure;
  public chartAvgPh;
  public chartPh;
  public chartPressure;
  public chartAirQuality;
  public chartElevation;
  public chartPie;
  public chartLight;
  public chartSmoke;
  public chartSoilHumidity;

  tempData;
  tempTime = [];
  tempValue = [];
  tempAvgData;
  tempAvgTime = [];
  tempAvgValue = [];


  humidityData;
  humidityTime = [];
  humidityValue = [];
  humidityAvgData;
  humidityAvgTime = [];
  humidityAvgValue = [];

  soilHumidityData;
  soilHumidityTime = [];
  soilHumidityValue = [];
  soilHumidityAvgData;
  soilHumidityAvgTime = [];
  soilHumidityAvgValue = [];

  airQualityData;
  airQualityTime = [];
  airQualityValue = [];
  airQualityAvgData;
  airQualityAvgTime = [];
  airQualityAvgValue = [];

  lightData;
  lightTime = [];
  lightValue = [];
  uvLight = [];
  visLight = [];
  irLight = [];
  lightAvgData;
  lightAvgTime = [];
  lightAvgValue = [];

  phData;
  phTime = [];
  phValue = [];
  phAvgData;
  phAvgTime = [];
  phAvgValue = [];

  elevationData;
  elevationTime = [];
  elevationValue = [];

  smokeData;
  smokeTime = [];
  smokeValue = [];

  turbidityData;
  turbidityTime = [];
  turbidityValue = [];
  turbidityAvgData;
  turbidityAvgTime = [];
  turbidityAvgValue = [];

  pressureData;
  pressureTime = [];
  pressureValue = [];
  pressureAvgData;
  pressureAvgTime = [];
  pressureAvgValue = [];

  avgTemp;
  avgHumidity;
  avgSoilHumidity;
  avgTurbidity;
  avgPressure;
  avgPh;
  avgElevation;
  avgAirQuality;
  avgSmoke;
  alertMessage = [];
  alertsHistory = [];

  tempShow = false;
  humShow = false;
  moistureShow = false;
  aqShow = false;
  lightShow = false;
  locShow = false;

  @Input() nodeId;
  daily = AVG_TYPES.DAILY;
  monthly = AVG_TYPES.MONTHLY;
  yearly = AVG_TYPES.YEARLY;
  toggle = [false, false, false, false, false, false];
  latitude;
  longitude;
  counter = 0;
  history = [];


  constructor(public apiCall: ApiCalls, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

    this.chartColor = '#FFFFFF';
    this.spinner.show();
    this.route.paramMap.subscribe(params => {
      this.nodeId = params.get('nodeId');
      this.spinner.hide();
      this.getData();
    });
    //this.getAlertHistory();
    this.getRecentAlerts();
    setInterval(() =>
    {this.getRecentAlerts();
    }, 120000);
    // setInterval(() =>
    // {this.getData()}, 100);
  }

  getData() {
    this.spinner.show();
    this.tempTime = [];
    this.tempValue = [];
    this.phTime = [];
    this.phValue = [];
    this.turbidityTime = [];
    this.turbidityValue = [];
    this.pressureTime = [];
    this.pressureValue = [];
    this.humidityTime = [];
    this.humidityValue = [];
    this.apiCall.getTemperatureByNode(this.nodeId).subscribe((response: any) => {
      this.tempData = response.body;
      this.tempShow = true
      // this.getAvgTempByNode(AVG_TYPES.MONTHLY);
      if (this.tempData.last_value <= this.tempData.average + 14) {
        document.getElementById('tempCurr').setAttribute('style', 'background-color: #81c784' )
      } else if (this.tempData.last_value >= this.tempData.average + 15) {
        document.getElementById('tempCurr').setAttribute('style', 'background-color: #fbc02d' )
      } else if (this.tempData.last_value > this.tempData.average + 20) {
        document.getElementById('tempCurr').setAttribute('style', 'background-color: #ef5350' )
      }

      // this.tempData.responseList.forEach(temp => {
      //   this.tempValue.push(parseFloat(temp.temperature));
      //   this.tempTime.push(temp.time.substr(11, 8));
      // });
      // console.log(this.tempValue);
      // console.log(this.tempTime);
      // this.canvas = document.getElementById('chartTemp');
      // this.ctx = this.canvas.getContext('2d');
      // this.chartTemp = new Chart(this.ctx, {
      //   type: 'line',
      //
      //   data: {
      //     labels: this.tempTime,
      //     datasets: [
      //       {
      //         fill: false,
      //         borderColor: '#fbc658',
      //         pointBorderColor: '#fbc658',
      //         backgroundColor: 'transparent',
      //         pointRadius: 0,
      //         pointHoverRadius: 4,
      //         pointBorderWidth: 8,
      //         borderWidth: 3,
      //         data: this.tempValue
      //       }
      //     ]
      //   },
      //   options: {
      //     xAxes: [{
      //       type: 'time',
      //       time: {
      //         format: 'HH:mm:ss',
      //         unit: 'hour'
      //       }
      //     }],
      //     legend: {
      //       display: false
      //     },
      //
      //     tooltips: {
      //       enabled: true
      //     },
      //     plugins: {
      //       zoom: {
      //         pan: {
      //           enabled: true,
      //           mode: 'xy'
      //         },
      //         zoom: {
      //           enabled: true,
      //           mode: 'xy',
      //           speed: 0.2,
      //         }
      //       }
      //     }
      //   }
      // });
    });
    this.apiCall.getHumidityByNode(this.nodeId).subscribe((response: any) => {
      this.humidityData = response.body;
      this.humShow = true;
      //   this.avgHumidity = this.humidityData.average;
      //   this.humidityData.responseList.forEach(humidity => {
      //     this.humidityValue.push(parseFloat(humidity.humidity));
      //     this.humidityTime.push(humidity.time.substr(11, 8));
      //   });
      // this.canvas = document.getElementById('chartHumidity');
      // this.ctx = this.canvas.getContext('2d');
      // this.chartHumidity = new Chart(this.ctx, {
      //   type: 'line',
      //
      //   data: {
      //     labels: this.humidityTime,
      //     datasets: [{
      //       borderColor: '#6bd098',
      //       backgroundColor: 'transparent',
      //       pointRadius: 0,
      //       pointHoverRadius: 4,
      //       pointBorderWidth: 8,
      //       borderWidth: 3,
      //       data: this.humidityValue,
      //
      //     }
      //     ]
      //   },
      //   options: {
      //     legend: {
      //       display: false
      //     },
      //
      //     tooltips: {
      //       enabled: true
      //     },
      //     plugins: {
      //       zoom: {
      //         pan: {
      //           enabled: true,
      //           mode: 'xy'
      //         },
      //         zoom: {
      //           enabled: true,
      //           wheel: {
      //             enabled: true // SET SCROOL ZOOM TO TRUE
      //           },
      //           mode: 'xy',
      //         }
      //       }
      //     }
      //   }
      // });
    });
    this.apiCall.getSoilHumidityByNode(this.nodeId).subscribe((response: any) => {
      this.soilHumidityData = response.body;
      this.moistureShow = true;
      //   this.avgSoilHumidity = this.soilHumidityData.average;
      //   this.soilHumidityData.res.forEach(humidity => {
      //     this.soilHumidityValue.push(parseFloat(humidity.soil_humidity));
      //     this.soilHumidityTime.push(humidity.time.substr(11, 8));
      //   });
      //   this.canvas = document.getElementById('chartSoilHumidity');
      //   this.ctx = this.canvas.getContext('2d');
      //   this.chartSoilHumidity = new Chart(this.ctx, {
      //     type: 'line',
      //     data: {
      //       labels: this.soilHumidityTime,
      //       datasets: [{
      //         borderColor: '#3f51b5',
      //         backgroundColor: 'transparent',
      //         pointRadius: 0,
      //         pointHoverRadius: 4,
      //         pointBorderWidth: 8,
      //         borderWidth: 3,
      //         data: this.soilHumidityValue,
      //       }
      //       ]
      //     },
      //     options: {
      //       legend: {
      //         display: false
      //       },
      //
      //       tooltips: {
      //         enabled: true
      //       },
      //       plugins: {
      //         zoom: {
      //           pan: {
      //             enabled: true,
      //             mode: 'xy'
      //           },
      //           zoom: {
      //             enabled: true,
      //             mode: 'xy',
      //             speed: 0.2,
      //           }
      //         }
      //       }
      //     }
      // });
    })


    this.apiCall.getAirQualityByNode(this.nodeId).subscribe((response: any) => {
      this.airQualityData = response.body;
      this.aqShow = true;
      if (this.airQualityData.last_val <= AQI.low) {
        document.getElementById('AQI').setAttribute('style', 'background-color: #81c784' );
      } else if (this.airQualityData.last_val > AQI.low && this.airQualityData.last_val <= AQI.medium) {
        document.getElementById('AQI').setAttribute('style', 'background-color: #fbc02d' );
      } else if (this.airQualityData.last_val > AQI.medium) {
        document.getElementById('AQI').setAttribute('style', 'background-color: #ef5350' );
      }
    });

    this.apiCall.getLightByNode(this.nodeId).subscribe((response: any) => {
      this.lightData = response.body;
      this.lightShow = true;
      // IR and Visible light range
      if (this.lightData.ir_last_val <= IR_Light.low) {
        document.getElementById('ir_light').setAttribute('style', 'background-color: #81c784' );
        document.getElementById('visLight').setAttribute('style', 'background-color: #81c784' )
      } else if (this.lightData.ir_last_val > IR_Light.low && this.lightData.last_value <= IR_Light.medium) {
        document.getElementById('ir_light').setAttribute('style', 'background-color: #fbc02d' )
        document.getElementById('visLight').setAttribute('style', 'background-color: #fbc02d' )
      } else if (this.lightData.ir_last_val > IR_Light.medium) {
        document.getElementById('ir_light').setAttribute('style', 'background-color: #ef5350' )
        document.getElementById('visLight').setAttribute('style', 'background-color: #ef5350' )
      }
      // UV light range
      if (this.lightData.uv_last_val <= UV_Light.low) {
        document.getElementById('uv_light').setAttribute('style', 'background-color: #81c784' );
      } else if (this.lightData.uv_last_val > UV_Light.low && this.lightData.last_value <= UV_Light.medium) {
        document.getElementById('uv_light').setAttribute('style', 'background-color: #fbc02d' )
      } else if (this.lightData.uv_last_val > UV_Light.medium) {
        document.getElementById('uv_light').setAttribute('style', 'background-color: #ef5350' )
      }
      // this.avgTemp = this.tempData.average;
    });
    this.apiCall.getLocationByNode(this.nodeId).subscribe((response: any) => {
      this.spinner.hide();
      response.body.latitude === undefined ?  this.latitude = 'N/A' :  this.latitude =  parseFloat(response.body.latitude);
      response.body.latitude === undefined ? this.longitude =   'N/A' : this.longitude =  parseFloat(response.body.longitude);
      this.locShow = true;

      // this.getMap();
    })
    // this.apiCall.getElevationByNode(this.nodeId).subscribe((response: any) => {
    //   this.elevationData = response.body.elevation;
    //   this.avgElevation = response.body.average;
    //   this.elevationData.forEach(el => {
    //     this.elevationValue.push(parseInt(el.elevation));
    //     this.elevationTime.push(el.time.substr(11, 8));
    //   });
    // });
    this.getAlertHistory();
    // this.apiCall.getSmokeByNode(this.nodeId).subscribe((response: any) => {
    //
    //   this.smokeData = response.body.smoke;
    //
    //   this.avgSmoke = response.body.smoke_average;
    //   this.smokeData.forEach(el => {
    //     this.smokeValue.push(parseInt(el.smoke));
    //     this.smokeTime.push(el.time.substr(11, 8));
    //   });
    //   this.canvas = document.getElementById('chartSmoke');
    //   this.ctx = this.canvas.getContext('2d');
    //   this.chartSmoke = new Chart(this.ctx, {
    //     type: 'line',
    //     data: {
    //       labels: this.smokeTime,
    //       datasets: [{
    //         borderColor: '#51CACF',
    //         backgroundColor: 'transparent',
    //         pointRadius: 0,
    //         pointHoverRadius: 4,
    //         pointBorderWidth: 8,
    //         borderWidth: 3,
    //         data: this.smokeValue
    //       }
    //       ]
    //     },
    //     options: {
    //       legend: {
    //         display: false
    //       },
    //
    //       tooltips: {
    //         enabled: true
    //       },
    //       plugins: {
    //         zoom: {
    //           pan: {
    //             enabled: true,
    //             mode: 'xy'
    //           },
    //           zoom: {
    //             enabled: true,
    //             wheel: {
    //               enabled: true // SET SCROOL ZOOM TO TRUE
    //             },
    //             mode: 'xy',
    //           }
    //         }
    //       }
    //     }
    //   });
    // })
  }
  flip(event, index) {
    // if ( event.target.className === 'flip-card-inner' || event.target.className === 'flip-card-front'
    //   || event.target.className === 'card-body') {
    //   event.target.style.transform = 'rotateY(180deg)'
    // }
    // if(event.target.className === 'flip-card-back'){
    //   event.target.style.transform = ''
    // }
    const card = document.getElementById(event.currentTarget.id);
    card.classList.toggle('flipp')
    this.toggle[index] === true ? this.toggle[index] = false : this.toggle[index] = true;

  }

  show() {
    console.log('show');
  }
  getAvgTempByNode(avgType) {
    this.apiCall.getAverageTemperatureByNode(this.nodeId, avgType).subscribe((response: any) => {
      this.tempAvgData = response.body;
      this.tempAvgValue = [];
      this.tempAvgTime = []
      // this.avgHumidity = this.humidityData.average;
      if (avgType === AVG_TYPES.YEARLY){
        this.tempAvgData.forEach(temp => {
          this.tempAvgValue.push(parseFloat(temp.averageTemperature));
          this.tempAvgTime.push(temp.year);
        });
      } else{
        this.tempAvgData.forEach(temp => {
          this.tempAvgValue.push(parseFloat(temp.averageTemperature));
          this.tempAvgTime.push(temp.date);
        });
      }
      this.canvas = document.getElementById('chartAvgTemp');
      this.ctx = this.canvas.getContext('2d');
      this.chartAvgTemp = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.tempAvgTime,
          datasets: [{
            borderColor: '#fbc658',
            backgroundColor: 'transparent',
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.tempAvgValue
          }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: true
          },
        }
      });

    });
  }
  getAvgPhByNode(avgType) {

    this.apiCall.getAveragePhByNode(this.nodeId, avgType).subscribe((response: any) => {
      this.phAvgData = response.body;
      this.phAvgValue = [];
      this.phAvgTime = []
      // this.avgHumidity = this.humidityData.average;
      if (avgType === AVG_TYPES.YEARLY) {
        this.phAvgData.forEach(temp => {
          this.phAvgValue.push(parseFloat(temp.averagePh));
          this.phAvgTime.push(temp.year);
        });
      } else {
        this.phAvgData.forEach(temp => {
          this.phAvgValue.push(parseFloat(temp.averagePh));
          this.phAvgTime.push(temp.date);
        });
      }
      this.canvas = document.getElementById('chartAvgPh');
      this.ctx = this.canvas.getContext('2d');
      this.chartAvgPh = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.phAvgTime,
          datasets: [{
            borderColor: '#51CACF',
            backgroundColor: 'transparent',
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.phAvgValue
          }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: true
          },
        }
      });

    });
  }
  getAvgTurbidityByNode(avgType) {
    this.apiCall.getAverageTurbidityByNode(this.nodeId, avgType).subscribe((response: any) => {
      this.turbidityAvgData = response.body;
      this.turbidityAvgValue = [];
      this.turbidityAvgTime = [];
      // this.avgHumidity = this.humidityData.average;
      if (avgType === AVG_TYPES.YEARLY) {
        this.turbidityAvgData.forEach(tur => {
          this.turbidityAvgValue.push(parseFloat(tur.averageTurbidity));
          this.turbidityAvgTime.push(tur.year);
        });
      } else {
        this.turbidityAvgData.forEach(tur => {
          this.turbidityAvgValue.push(parseFloat(tur.averageTurbidity));
          this.turbidityAvgTime.push(tur.date);
        });}
      this.canvas = document.getElementById('chartAvgTurbidity');
      this.ctx = this.canvas.getContext('2d');
      this.chartAvgTurbidity = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.turbidityAvgTime,
          datasets: [{
            borderColor: '#ff8a65',
            backgroundColor: 'transparent',
            pointRadius: 1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.turbidityAvgValue
          }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: true
          },
        }
      });

    });
  }
  getAvgPressureByNode(avgType) {
    this.apiCall.getAveragePressureByNode(this.nodeId, avgType).subscribe((response: any) => {
      this.pressureAvgData = response.body;
      this.pressureAvgValue = [];
      this.pressureAvgTime = [];
      // this.avgHumidity = this.humidityData.average;
      if (avgType === AVG_TYPES.YEARLY){
        this.pressureAvgData.forEach(tur => {
          this.pressureAvgValue.push(parseFloat(tur.averagePressure));
          this.pressureAvgTime.push(tur.year);
        });
      } else {
        this.pressureAvgData.forEach(tur => {
          this.pressureAvgValue.push(parseFloat(tur.averagePressure));
          this.pressureAvgTime.push(tur.date);
        });
      }
      this.canvas = document.getElementById('chartAvgPressure');
      this.ctx = this.canvas.getContext('2d');
      this.chartAvgPressure = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.pressureAvgTime,
          datasets: [{
            borderColor: '#7e57c2',
            backgroundColor: 'transparent',
            pointRadius: 1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.pressureAvgValue
          }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: true
          },
        }
      });

    });
  }

  getAvgHumidityByNode(avgType) {
    this.apiCall.getAverageHumidityByNode(this.nodeId, avgType).subscribe((response: any) => {
      this.humidityAvgData = response.body;
      this.humidityAvgValue = [];
      this.humidityAvgTime = []
      // this.avgHumidity = this.humidityData.average;
      if (avgType == AVG_TYPES.YEARLY) {
        this.humidityAvgData.forEach(humidity => {
          this.humidityAvgValue.push(parseFloat(humidity.averageHumidity));
          this.humidityAvgTime.push(humidity.year);
        });
      }
      else {
        this.humidityAvgData.forEach(humidity => {
          this.humidityAvgValue.push(parseFloat(humidity.averageHumidity));
          this.humidityAvgTime.push(humidity.date);
        });
      }
      this.canvas = document.getElementById('chartAvgHumidity');
      this.ctx = this.canvas.getContext('2d');
      this.chartAvgHumidity = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.humidityAvgTime,
          datasets: [{
            borderColor: '#6bd098',
            backgroundColor: 'transparent',
            pointRadius: 1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.humidityAvgValue
          }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: true
          },
        }
      });

    });
  }
  getPressure(event, avgType) {
    const group = document.getElementById('pgp').getElementsByTagName('*');;
    for (let i = 0; i < group.length; i++) {
      if (group[i].classList.contains('active')) {
        group[i].classList.toggle('active');
      }
    }
    document.getElementById(event.currentTarget.id).classList.add('active');
    this.getAvgPressureByNode(avgType);
  }
  getHumidity(event, avgType) {
    const group = document.getElementById('hgp').getElementsByTagName('*');;
    for (let i = 0; i < group.length; i++) {
      if (group[i].classList.contains('active')) {
        group[i].classList.toggle('active');
      }
    }
    document.getElementById(event.currentTarget.id).classList.add('active');
    this.getAvgHumidityByNode(avgType);
  }
  getTurbidity(event, avgType) {
    const group = document.getElementById('tgp').getElementsByTagName('*');;
    for (let i = 0; i < group.length; i++) {
      if (group[i].classList.contains('active')) {
        group[i].classList.toggle('active');
      }
    }
    document.getElementById(event.currentTarget.id).classList.add('active');
    this.getAvgTurbidityByNode(avgType);
  }
  getPh(event, avgType) {
    const group = document.getElementById('phgp').getElementsByTagName('*');;
    for (let i = 0; i < group.length; i++) {
      if (group[i].classList.contains('active')) {
        group[i].classList.toggle('active');
      }
    }
    document.getElementById(event.currentTarget.id).classList.add('active');
    this.getAvgPhByNode(avgType);
  }
  getTemp(event, avgType) {
    const group = document.getElementById('tmgp').getElementsByTagName('*');;
    for (let i = 0; i < group.length; i++) {
      if (group[i].classList.contains('active')) {
        group[i].classList.toggle('active');
      }
    }
    document.getElementById(event.currentTarget.id).classList.add('active');
    this.getAvgTempByNode(avgType);
  }
  getMap(){
    const myLatlng = new google.maps.LatLng(this.latitude, this.longitude );
    const mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},
        {"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},
            {"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},
            {"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},
        {"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},
        {"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},
        {"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},
        {"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},
        {"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},
        {"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }
  close(id) {
    document.getElementById(id).hidden = true;
  }
  getRecentAlerts() {
    this.apiCall.getRecentAlerts().subscribe((response: any) => {
      this.alertMessage = response.body
    });
  }
  getAlertHistory() {
    this.apiCall.getHistoricalAlerts(this.nodeId).subscribe((response: any) => {
      this.history = [];
      this.alertsHistory = response.body
      this.alertsHistory.forEach(alert => {
        if (alert.co_level_alert) {
          this.history.push({
            time: alert.time,
            co_level_alert: alert.co_level_alert,
            co_level: alert.co_level
          })
        }
        if (alert.audio_alert) {
          this.history.push({
            time: alert.time,
            audio_alert: alert.audio_alert,
            audio_level: alert.audio_level
          })
        }
      })

    });
  }
  getLoc() {
    window.open('https://www.google.com/maps/place/' + this.latitude + ',' + this.longitude, '_blank');
  }
}
