(async () => {
    // Fetch map topology
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/in/in-all.topo.json'
    ).then(response => response.json());

    try {
        // Define state coordinates for major Indian cities
        const cities = [
            { code: 'in-py', city: 'Puducherry' },
            { code: 'in-dl', city: 'Delhi' },
            { code: 'in-mh', city: 'Mumbai' },
            { code: 'in-wb', city: 'Kolkata' },
            { code: 'in-ka', city: 'Bangalore' },
            // Add more cities as needed
        ];

        // Use static data instead of API call
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

        // Create the chart
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
        document.getElementById('container').innerHTML = 
            `<div class="error">Error creating map: ${error.message}</div>`;
    }
})();