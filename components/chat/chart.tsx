// pages/index.js
import { useEffect } from 'react';
import Highcharts from 'highcharts/highmaps';
import dynamic from 'next/dynamic';

export default function MapPage() {
  useEffect(() => {
    (async () => {
      // Dynamically import the exporting module
      const exportingModule = await import('highcharts/modules/exporting');

      // Check whether the module exports a default function or is itself a function
      if (typeof exportingModule.default === 'function') {
        exportingModule.default(Highcharts);
      } else if (typeof exportingModule === 'function') {
        (exportingModule as any)(Highcharts);
      }
      
      // Fetch the map topology and render the chart
      const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
      ).then(res => res.json());

      try {
        const data = [
          ['in-py', 30],
          ['in-ld', 32],
          ['in-wb', 28],
          ['in-or', 35],
          ['in-br', 33],
          ['in-sk', 22],
          ['in-ct', 38],
          ['in-tn', 36],
          ['in-mp', 34],
          ['in-gj', 39],
          ['in-ga', 31],
          ['in-nl', 24],
          ['in-mn', 25],
          ['in-ar', 23],
          ['in-mz', 27],
          ['in-tr', 29],
          ['in-dl', 36],
          ['in-hr', 35],
          ['in-up', 37],
          ['in-rj', 40],
          ['in-pb', 34],
          ['in-ut', 26],
          ['in-jk', 20],
          ['in-hp', 22],
          ['in-as', 28],
          ['in-kl', 33],
          ['in-ka', 32],
          ['in-mh', 35],
          ['in-ap', 37],
          ['in-tg', 36]
        ];

        Highcharts.mapChart('container', {
          chart: {
            map: topology,
            backgroundColor: '#f8f9fa'
          },
          title: {
            text: 'India Temperature Map'
          },
          subtitle: {
            text: 'Source: Sample Data'
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          colorAxis: {
            min: 20,
            max: 40,
            minColor: '#E6E7E8',
            maxColor: '#005645',
            labels: {
              format: '{value}°C'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderWidth: 1,
            shadow: true
          },
          series: [{
            type: 'map',
            data: data,
            name: 'Temperature (°C)',
            states: {
              hover: {
                color: '#BADA55'
              }
            },
            dataLabels: {
              enabled: true,
              format: '{point.value}°C'
            },
            tooltip: {
              pointFormat: '{point.name}: {point.value}°C'
            }
          }]
        });
      } catch (error) {
        console.error('Error creating map:', error);
        const container = document.getElementById('container');
        if (container) {
          container.innerHTML = `<div class="error">Error creating map: ${error.message}</div>`;
        }
      }
    })();
  }, []);

  return (
    <div>
      <div id="container" className="container"></div>
      <style jsx>{`
        .error {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          padding: 20px;
          margin: 20px;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .container {
          min-height: 500px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
