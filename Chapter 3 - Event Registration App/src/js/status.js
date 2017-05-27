import Chart from 'chart.js';

import './general';
import apiCall from './services/api/apiCall';

class Status {
  constructor() {
    this.$experienceTab = document.querySelector('#experienceTab');
    this.$professionTab = document.querySelector('#professionTab');
    this.$ageTab = document.querySelector('#ageTab');

    this.$ageCanvas = document.querySelector('#ageChart');
    this.$professionCanvas = document.querySelector('#professionChart');
    this.$experienceCanvas = document.querySelector('#experienceChart');

    this.$loadingIndicator = document.querySelector('#loadingIndicator');
    this.$tabArea = document.querySelector('#tabArea');
    this.$chartArea = document.querySelector('#chartArea');

    this.statisticData;

    this.loadData();
  }

  loadData() {
    apiCall('statistics', {}, 'GET')
      .then(response => {
        this.statisticData = response;

        this.$loadingIndicator.classList.add('hidden');
        this.$tabArea.classList.remove('hidden');
        this.$chartArea.classList.remove('hidden');
        this.loadAge();
        this.loadProfession();
        this.loadExperience();
      })
      .catch(() => {
      });
  }

  hideCharts() {
    this.$ageCanvas.classList.add('hidden');
    this.$professionCanvas.classList.add('hidden');
    this.$experienceCanvas.classList.add('hidden');
  }

  loadExperience() {
    this.hideCharts();
    this.$experienceCanvas.classList.remove('hidden');
    const data = {
        datasets: [{
            label: 'in Years',
            data: this.statisticData.experience,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [
              'white',
              'white',
              'white',
            ]
        }],
        labels: [
            'Beginner',
            'Intermediate',
            'Advanced'
        ]
    };
    new Chart(this.$experienceCanvas,{
      type: 'pie',
      data,
    });
  }

  loadProfession() {
    this.hideCharts();
    this.$professionCanvas.classList.remove('hidden');
    const data = {
        datasets: [{
            label: 'in Years',
            data: this.statisticData.profession,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
            borderColor: [
              'white',
              'white',
              'white',
              'white',
            ]
        }],
        labels: [
            'School Students',
            'College Students',
            'Trainees',
            'Employees'
        ]
    };
    new Chart(this.$professionCanvas,{
      type: 'pie',
      data,
    });
  }

  loadAge() {
    this.hideCharts();
    this.$ageCanvas.classList.remove('hidden');
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
              'white',
              'white',
              'white',
            ]
        }],
        labels: [
            '10-15 years',
            '15-20 years',
            '20-25 years'
        ]
    };
    new Chart(this.$ageCanvas,{
      type: 'pie',
      data,
    });
  }

}

window.addEventListener("load", () => {
  new Status();
});
