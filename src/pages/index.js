import React, { Component } from 'react';
import Layout from '../components/layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CreateNewServer from '../components/common/dropdown/create_new_server';
import ResourcePanel from '../components/common/panels/resource_panel';
import {
  createNewServer,
  sendSMSAlertMessage,
  sendEmailAlertMessage,
} from '../redux/actions/actions';

const ServerWrapper = styled.div`
  padding: 10px;
  margin: 20px auto;
  background-color: #08080b;
`;
const ServerName = styled.div`
  display: block;
  margin: 10px;
  color: white;
  font-size: 24px;
`;

const NoServersMessage = styled.div`
  margin: auto;
  color: white;
`;

const initial_state = {
  form: {
    serverName: '',
    cpuSMSAlerts: false,
    cpuEmailAlerts: false,
    memorySMSAlerts: false,
    memoryEmailAlerts: false,
    cpuThreshold: '',
    memoryThreshold: '',
    cpuAlertInterval: '',
    memoryAlertInterval: '',
  },
  touched: {
    serverName: false,
    cpuThreshold: false,
    memoryThreshold: false,
    cpuAlertInterval: false,
    memoryAlertInterval: false,
  },
  required: {
    serverName: true,
  },
  showForm: false,
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = initial_state;

    this.sendSMSAlertMessage = this.sendSMSAlertMessage.bind(this);
    this.sendEmailAlertMessage = this.sendEmailAlertMessage.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  renderServers = servers => {
    if (servers.length > 0) {
      return servers.map(s => (
        <ServerWrapper key={s.id} className="card">
          <ServerName>{s.name}</ServerName>
          <div className="d-flex justify-content-center">
            <ResourcePanel
              label="CPU"
              type="cpu"
              serverId={s.id}
              serverName={s.name}
              interval={s.cpuAlerts.interval}
              threshold={s.cpuAlerts.threshold}
              sendSMSAlertMessage={this.sendSMSAlertMessage}
              sendEmailAlertMessage={this.sendEmailAlertMessage}
              alerts={s.cpuAlerts}
            />
            <ResourcePanel
              label="Memory"
              type="memory"
              serverId={s.id}
              serverName={s.name}
              interval={s.memoryAlerts.interval}
              threshold={s.memoryAlerts.threshold}
              sendSMSAlertMessage={this.sendSMSAlertMessage}
              sendEmailAlertMessage={this.sendEmailAlertMessage}
              alerts={s.memoryAlerts}
            />
          </div>
        </ServerWrapper>
      ));
    } else {
      return (
        <ServerWrapper>
          <NoServersMessage className="d-flex justify-content-center">
            No Servers Configured
          </NoServersMessage>
        </ServerWrapper>
      );
    }
  };

  onChangeHandler(event) {
    let form = Object.assign({}, this.state.form);
    let touched = Object.assign({}, this.state.touched);

    const { name, checked, value, type } = event.target;

    form[name] = type === 'checkbox' ? checked : value;
    touched[name] = true;

    this.setState({ form, touched });
  }

  clearForm = () => {
    let form = Object.assign({}, this.state.form);
    let touched = Object.assign({}, this.state.touched);
    let required = Object.assign({}, this.state.required);

    form = initial_state.form;
    touched = initial_state.touched;
    required = initial_state.required;

    this.setState({ form, touched, required });
  };

  toggleForm = () => {
    const { servers } = this.props;
    const { showForm } = this.state;
    let form = Object.assign({}, this.state.form);

    if (servers.length > 0 && !showForm) {
      const server = servers[servers.length - 1];
      form = initial_state.form;
      form.cpuSMSAlerts = server.cpuAlerts.sms;
      form.cpuEmailAlerts = server.cpuAlerts.email;
      form.memorySMSAlerts = server.memoryAlerts.sms;
      form.memoryEmailAlerts = server.memoryAlerts.email;
      form.cpuThreshold = server.cpuAlerts.threshold.toString();
      form.memoryThreshold = server.memoryAlerts.threshold.toString();
      form.cpuAlertInterval = server.cpuAlerts.interval.toString();
      form.memoryAlertInterval = server.memoryAlerts.interval.toString();
    }
    this.setState({ showForm: !showForm, form });
  };

  submitForm = e => {
    const { form } = this.state;

    const number = this.props.servers.length + 1;
    const setCpuInterval =
      form.cpuSMSAlerts || form.cpuEmailAlerts
        ? parseInt(form.cpuAlertInterval)
        : 30000;
    const setMemoryInterval =
      form.memorySMSAlerts || form.memoryEmailAlerts
        ? parseInt(form.memoryAlertInterval)
        : 30000;

    this.props.createNewServer({
      id: number,
      name: form.serverName,
      memory: '64GB',
      cpuAlerts: {
        sms: form.cpuSMSAlerts,
        email: form.cpuEmailAlerts,
        threshold: parseInt(form.cpuThreshold),
        interval: setCpuInterval,
      },
      memoryAlerts: {
        sms: form.memorySMSAlerts,
        email: form.memoryEmailAlerts,
        threshold: parseInt(form.memoryThreshold),
        interval: setMemoryInterval,
      },
      labels: [],
      historicalData: [],
      data: [],
    });
    this.toggleForm();
  };

  sendSMSAlertMessage = resource => {
    this.props.sendSMSAlertMessage(resource);
  };
  sendEmailAlertMessage = resource => {
    this.props.sendEmailAlertMessage(resource);
  };

  render() {
    const { form, touched, required, showForm } = this.state;

    const { servers } = this.props;
    return (
      <Layout>
        <div>
          <h1>Dashboard</h1>
          <CreateNewServer
            form={form}
            required={required}
            touched={touched}
            showForm={showForm}
            onChangeHandler={this.onChangeHandler}
            toggleForm={this.toggleForm}
            submitForm={this.submitForm}
            clearForm={this.clearForm}
          />
        </div>

        {this.renderServers(servers)}
      </Layout>
    );
  }
}

const mapStateToProps = state => state.Dashboard;

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createNewServer,
      sendEmailAlertMessage,
      sendSMSAlertMessage,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
