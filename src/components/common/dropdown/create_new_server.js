import React, { Fragment } from 'react';
import styled from 'styled-components';
import TextField from '../forms/text_field';
import Checkbox from '../forms/checkbox';
import Button from '../forms/button';

const NewServerForm = styled.div`
  position: absolute;
  margin: 10px 0;
  padding: 20px;
  width: 400px;
  z-index: 10;
`;

const PreferencesGroup = styled.div`
  border: 1px solid #000;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

const Label = styled.div`
  margin: 30px 0 20px 0;
`;

const FooterButtons = styled.div`
  margin-top: 20px;
`;

const CreateNewServer = props => {
  const {
    submitForm,
    onChangeHandler,
    form,
    touched,
    required,
    clearForm,
    showForm,
    toggleForm,
  } = props;

  const cpuFieldsRequired = form.cpuSMSAlerts || form.cpuEmailAlerts;
  const memoryFieldsRequired = form.memorySMSAlerts || form.memoryEmailAlerts;

  const serverNameErrors = required.serverName && !form.serverName;
  const cpuErrors =
    (form.cpuSMSAlerts || form.cpuEmailAlerts) &&
    (!form.cpuThreshold || !form.cpuAlertInterval);
  const memoryErrors =
    (form.memorySMSAlerts || form.memoryEmailAlerts) &&
    (!form.memoryThreshold || !form.memoryAlertInterval);

  const errors = serverNameErrors || cpuErrors || memoryErrors;

  return (
    <div>
      <button className="btn btn-sm btn-primary" onClick={() => toggleForm()}>
        Create New Server
      </button>
      {showForm && (
        <NewServerForm className="card">
          <form>
            <TextField
              className="server-name"
              name="serverName"
              label="Server Name"
              value={form.serverName}
              placeholder="Add server name"
              required={required.serverName}
              touched={touched.serverName}
              onChangeHandler={e => onChangeHandler(e)}
            />
            <Label>CPU Alert Settings</Label>
            <PreferencesGroup>
              <Checkbox
                className="cpu-sms-alerts"
                name="cpuSMSAlerts"
                label="Receive SMS Alerts"
                value={form.cpuSMSAlerts}
                checked={form.cpuSMSAlerts}
                onChangeHandler={e => onChangeHandler(e)}
              />
              <Checkbox
                className="cpu-email-alerts"
                name="cpuEmailAlerts"
                label="Receive Email Alerts"
                value={form.cpuEmailAlerts}
                checked={form.cpuEmailAlerts}
                onChangeHandler={e => onChangeHandler(e)}
              />
              {(form.cpuSMSAlerts || form.cpuEmailAlerts) && (
                <Fragment>
                  <TextField
                    className="cpu-threshold"
                    name="cpuThreshold"
                    label="Threshold"
                    value={form.cpuThreshold}
                    placeholder="Set CPU Threshold"
                    append={'%'}
                    required={cpuFieldsRequired}
                    touched={touched.cpuThreshold}
                    onChangeHandler={e => onChangeHandler(e)}
                  />
                  <TextField
                    className="cpu-alert-interval"
                    name="cpuAlertInterval"
                    label="Alert Interval"
                    value={form.cpuAlertInterval}
                    append={'Milliseconds'}
                    placeholder="Set CPU Interval"
                    required={cpuFieldsRequired}
                    touched={touched.cpuAlertInterval}
                    onChangeHandler={e => onChangeHandler(e)}
                  />
                </Fragment>
              )}
            </PreferencesGroup>
            <Label>Memory Alert Settings</Label>
            <PreferencesGroup>
              <Checkbox
                className="memory-sms-alerts"
                name="memorySMSAlerts"
                label="Receive SMS Alerts"
                value={form.memorySMSAlerts}
                checked={form.memorySMSAlerts}
                onChangeHandler={e => onChangeHandler(e)}
              />
              <Checkbox
                className="memory-email-alerts"
                name="memoryEmailAlerts"
                label="Receive Email Alerts"
                value={form.memoryEmailAlerts}
                checked={form.memoryEmailAlerts}
                onChangeHandler={e => onChangeHandler(e)}
              />
              {(form.memorySMSAlerts || form.memoryEmailAlerts) && (
                <Fragment>
                  <TextField
                    className="memory-threshold"
                    name="memoryThreshold"
                    label="Memory Threshold"
                    value={form.memoryThreshold}
                    placeholder="Set Memory Threshold"
                    required={memoryFieldsRequired}
                    touched={touched.memoryThreshold}
                    append={'%'}
                    onChangeHandler={e => onChangeHandler(e)}
                  />
                  <TextField
                    className="memory-alert-interval"
                    name="memoryAlertInterval"
                    label="Memory Alert Interval"
                    value={form.memoryAlertInterval}
                    placeholder="Set Memory Interval"
                    required={memoryFieldsRequired}
                    append={'Milliseconds'}
                    touched={touched.memoryAlertInterval}
                    onChangeHandler={e => onChangeHandler(e)}
                  />
                </Fragment>
              )}
            </PreferencesGroup>
            <FooterButtons className="d-flex justify-content-between">
              <Button
                label="Clear Form"
                name="clearForm"
                buttonSize=""
                buttonType="default"
                disabled={false}
                onClickHandler={clearForm}
              />
              <Button
                label="Submit"
                name="submit"
                buttonSize=""
                buttonType="primary"
                disabled={errors}
                onClickHandler={submitForm}
              />
            </FooterButtons>
          </form>
        </NewServerForm>
      )}
    </div>
  );
};

export default CreateNewServer;
