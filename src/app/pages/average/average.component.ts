import {Component, Input, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {ApiCalls} from '../../shared/api-calls/apiCalls';
import {ActivatedRoute} from '@angular/router';
import {AVG_TYPES} from '../../../assets/data/avg_types';

declare var google: any;


@Component({
  selector: 'average-cmp',
  moduleId: module.id,
  templateUrl: 'average.component.html'
})

export class AverageComponent implements OnInit {


  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
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
  public chartPie;

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

  airQualityData;
  airQualityTime = [];
  airQualityValue = [];
  airQualityAvgData;
  airQualityAvgTime = [];
  airQualityAvgValue = [];

  phData;
  phTime = [];
  phValue = [];
  phAvgData;
  phAvgTime = [];
  phAvgValue = [];

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
  avgTurbidity;
  avgPressure;
  avgPh
  @Input() nodeId;
  daily = AVG_TYPES.DAILY;
  monthly = AVG_TYPES.MONTHLY;
  yearly = AVG_TYPES.YEARLY;
  toggle = [false,false,false,false,false,false];
  latitude;
  longitude;

  constructor(public apiCall: ApiCalls, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.chartColor = '#FFFFFF';
    this.route.paramMap.subscribe(params => {
      if (params.get('nodeId') === '3') {
        document.getElementById('click').click();
      } else {
        this.nodeId = params.get('nodeId');
        sessionStorage.setItem('nodeId', this.nodeId);
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
      this.getData();
      this.getAverageData();
    });
  }

  getData() {
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
      this.avgTemp = this.tempData.average;
      this.tempData.responseList.forEach(temp => {
        this.tempValue.push(parseFloat(temp.temperature));
        this.tempTime.push(temp.time.substr(11));
      });
      console.log(this.tempValue);
      console.log(this.tempTime);
      this.canvas = document.getElementById('chartTemp');
      this.ctx = this.canvas.getContext('2d');
      this.chartTemp = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.tempTime,
          datasets: [
            {
              fill: false,
              borderColor: '#fbc658',
              pointBorderColor: '#fbc658',
              backgroundColor: 'transparent',
              pointRadius: 1,
              pointHoverRadius: 4,
              pointBorderWidth: 8,
              borderWidth: 3,
              data: this.tempValue
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
    this.apiCall.getHumidityByNode(this.nodeId).subscribe((response: any) => {
      this.humidityData = response.body;
      this.avgHumidity = this.humidityData.average;
      this.humidityData.responseList.forEach(humidity => {
        this.humidityValue.push(parseFloat(humidity.humidity));
        this.humidityTime.push(humidity.time.substr(11));
      });
      this.canvas = document.getElementById('chartHumidity');
      this.ctx = this.canvas.getContext('2d');
      this.chartHumidity = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.humidityTime,
          datasets: [{
            borderColor: '#6bd098',
            backgroundColor: 'transparent',
            pointRadius: 1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.humidityValue
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
    this.apiCall.getPhByNode(this.nodeId).subscribe((response: any) => {
      this.phData = response.body;
      this.avgPh = this.phData.average;
      this.phData.responseList.forEach(ph => {
        this.phValue.push(parseFloat(ph.ph));
        this.phTime.push(ph.time.substr(11));
      });
      this.canvas = document.getElementById('chartPh');
      this.ctx = this.canvas.getContext('2d');
      this.chartPh = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.phTime,
          datasets: [{
            borderColor: '#51CACF',
            backgroundColor: 'transparent',
            pointRadius: 1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.phValue
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
    this.apiCall.getTurbidityByNode(this.nodeId).subscribe((response: any) => {
      this.turbidityData = response.body;
      this.avgTurbidity = this.turbidityData.average;
      this.turbidityData.responseList.forEach(turbidity => {
        this.turbidityValue.push(parseFloat(turbidity.turbidity));
        this.turbidityTime.push(turbidity.time.substr(11));
      });
      this.canvas = document.getElementById('chartTurbidity');
      this.ctx = this.canvas.getContext('2d');
      this.chartTurbidity = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.turbidityTime,
          datasets: [{
            borderColor: '#ff6d00',
            backgroundColor: 'transparent',
            pointRadius: 1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.turbidityValue
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
    this.apiCall.getPressureByNode(this.nodeId).subscribe((response: any) => {
      this.pressureData = response.body;
      this.avgPressure = this.pressureData.average;
      this.pressureData.responseList.forEach(pressure => {
        this.pressureValue.push(parseFloat(pressure.pressure));
        this.pressureTime.push(pressure.time.substr(11));
      });
      this.canvas = document.getElementById('chartPressure');
      this.ctx = this.canvas.getContext('2d');
      this.chartPressure = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.pressureTime,
          datasets: [{
            borderColor: '#7e57c2',
            backgroundColor: 'transparent',
            pointRadius: 1,
            pointHoverRadius: 4,
            pointBorderWidth: 8,
            borderWidth: 3,
            data: this.pressureValue
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
    this.apiCall.getLocationByNode('UK-GLA-001').subscribe((response: any) => {
      this.airQualityData = response.body;
      // this.avgTemp = this.tempData.average;
      this.airQualityData.responseList.forEach(temp => {
        this.airQualityValue.push(parseFloat(temp.temperature));
        this.airQualityTime.push(temp.time.substr(11));
      });
      this.canvas = document.getElementById('chartAirQuality');
      this.ctx = this.canvas.getContext('2d');
      this.chartAirQuality = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: this.airQualityTime,
          datasets: [
            {
              fill: false,
              borderColor: '#0277bd',
              pointBorderColor: '#0277bd',
              backgroundColor: 'transparent',
              pointRadius: 1,
              pointHoverRadius: 4,
              pointBorderWidth: 8,
              borderWidth: 3,
              data: this.airQualityValue
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
    this.apiCall.getLocationByNode('UK-GLA-001').subscribe((response: any) => {
      this.latitude = parseInt(response.body.latitude);
      this.longitude =  parseInt(response.body.longitude);
      this.getMap();
    })
  }

  getAverageData() {
    this.getAvgHumidityByNode(AVG_TYPES.DAILY);
    this.getAvgTempByNode(AVG_TYPES.DAILY);
    this.getAvgPhByNode(AVG_TYPES.DAILY);
    this.getAvgTurbidityByNode(AVG_TYPES.DAILY);
    this.getAvgPressureByNode(AVG_TYPES.DAILY);
  }

  flip(event) {
    // if ( event.target.className === 'flip-card-inner' || event.target.className === 'flip-card-front'
    //   || event.target.className === 'card-body') {
    //   event.target.style.transform = 'rotateY(180deg)'
    // }
    // if(event.target.className === 'flip-card-back'){
    //   event.target.style.transform = ''
    // }
    const card = document.getElementById(event.currentTarget.id);
    card.classList.toggle('flipp')
    this.toggle[0] === true ? this.toggle[0] = false : this.toggle[0] = true;

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
            pointRadius: 1,
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
            pointRadius: 1,
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
      styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]

    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Hello World!"
    });

    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }
}
