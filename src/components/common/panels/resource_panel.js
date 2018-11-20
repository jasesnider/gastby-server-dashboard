import React, { Component } from 'react';
import styled from 'styled-components';
import LineChart from '../charts/line_chart';
import moment from 'moment';
import * as helpers from '../../../helpers/helpers';

const ResourceWrapper = styled.div`
  border: 1px solid #487c7d;
  margin: 20px 4px;
  width: 80%;
`;

const PanelWrapper = styled.div`
  height: 200px;
`;

const PercentageBlock = styled.div`
  margin: 20px;
  text-align: center;
`;

const Percentage = styled.span`
  font-size: 36px;
  color: white;
`;

const Label = styled.span`
  display: block;
  font-size: 14px;
  color: #487c7d;
  font-variant: small-caps;
`;

class ResourcePanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      historicalData: [],
      labels: [],
      currentPercentage: 0,
      averagePercentage: 0,
      startTime: {},
      currentUptime: '',
    };
    this.generateData = this.generateData.bind(this);
  }

  generateData = (labels, data, historicalData) => {
    const { startTime } = this.state;

    if (data.length > 7) {
      data.shift();
    }

    const percentage = Math.floor(Math.random(30) * 10);
    data.push(percentage);
    historicalData.push(percentage);

    if (labels.length > 7) {
      labels.shift();
    }

    const date = moment();
    const finalDate = moment(date).format('h:mm:ss a');

    if (!moment(startTime, 'YYYY/MM/DD', true).isValid()) {
      this.setState({ startTime: date });
    }

    const getDifference = moment.duration(moment(date).diff(startTime));
    const milliseconds = getDifference >= 0 ? getDifference : 0;
    const currentUptime = helpers.parseMillToTime(milliseconds);

    labels.push(finalDate);

    this.setState({
      labels,
      data,
      historicalData,
      currentPercentage: percentage.toFixed(2),
      averagePercentage: helpers.getAverage(historicalData),
      currentUptime,
    });
  };

  componentDidMount() {
    const { labels, data, historicalData } = this.state;

    this.interval = setInterval(() => {
      this.generateData(labels, data, historicalData);
    }, this.props.interval > 0 ? this.props.interval : 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const {
      labels,
      data,
      currentPercentage,
      averagePercentage,
      startTime,
      currentUptime,
    } = this.state;
    const {
      label,
      type,
      alerts,
      sendSMSAlertMessage,
      sendEmailAlertMessage,
      threshold,
      serverId,
      serverName,
    } = this.props;

    if (Math.floor(parseInt(currentPercentage)) > threshold) {
      let resource = {
        id: currentPercentage + averagePercentage + moment() + type,
        serverId,
        serverName,
        type,
        currentPercentage,
        threshold,
        time: labels[labels.length - 1],
        date: moment().format('ll'),
      };

      if (alerts.sms) {
        sendSMSAlertMessage(resource);
      }
      if (alerts.email) {
        sendEmailAlertMessage(resource);
      }
    }

    return (
      <ResourceWrapper>
        <PanelWrapper>
          <PercentageBlock>
            <Percentage>{`${currentPercentage}%`}</Percentage>
            <Label>Current Load</Label>
          </PercentageBlock>
          <PercentageBlock>
            <Percentage>{`${averagePercentage}%`}</Percentage>
            <Label>Average Load</Label>
          </PercentageBlock>
          {/* {`Start Time: ${moment(startTime).format('h:mm:ss a')}`}
          {`Current Uptime: ${currentUptime}`} */}
        </PanelWrapper>
        <PanelWrapper>
          <LineChart label={label} data={data} labels={labels} />
        </PanelWrapper>
      </ResourceWrapper>
    );
  }
}

export default ResourcePanel;
