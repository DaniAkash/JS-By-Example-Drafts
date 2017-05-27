import Chart from 'chart.js';

import './general';
import apiCall from './services/api/apiCall';

class Status {
  constructor() {
    this.$expTab = document.querySelector('#expTab');
    this.$profTab = document.querySelector('#profTab');
    this.$ageTab = document.querySelector('#ageTab');
    this.$canvas = document.querySelector('#chart');

    this.statisticData;

    this.loadData();
  }

  loadData() {
    apiCall('statistics', {}, 'GET')
      .then(response => {
        this.statisticData = response;
        const data = {
            datasets: [{
                label: 'in Years',
                data: this.statisticData.age,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                  // 'rgba(255,99,132,1)',
                  // 'rgba(54, 162, 235, 1)',
                  // 'rgba(255, 206, 86, 1)',
                  'white',
                  'white',
                  'white',
                ]
            }],
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                '10-15 years',
                '15-20 years',
                '20-25 years'
            ]
        };
        let myPieChart = new Chart(this.$canvas,{
          type: 'pie',
          data,
          // options: options
        });
      })
      .catch(() => {
      });
  }

}

window.addEventListener("load", () => {
  new Status();
});
