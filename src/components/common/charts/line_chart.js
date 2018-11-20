import React, { Component } from 'react';
import Chart from 'chart.js';


class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineChart: null,
    };
  }

  

  componentDidMount() {
    const node = this.node;

    const { label, labels, data } = this.props;

    this.state.lineChart = new Chart(node, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label,
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            lineTension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                callback: function(value) {
                  return value + '%';
                },
              },
              scaleLabel: {
                display: true,
                labelString: 'Percentage',
              },
            },
          ],
        },
      },
    });
  }

  componentDidUpdate(prev, next) {
    if (prev !== next) {
      this.state.lineChart.update();
    }
  }

  render() {
    return (
      <canvas
        style={{ width: 200, height: 80 }}
        ref={node => (this.node = node)}
        aria-label="line chart"
        role="img"
      />
    );
  }
}

export default LineChart;
