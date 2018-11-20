import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import styled from 'styled-components';

const Title = styled.div`
  font-weight: bold;
`;

class Emails extends Component {
  constructor(props) {
    super(props);

    this.renderEmails = this.renderEmails.bind(this);
  }
  renderEmails = () => (
    <div>
      {this.props.emails &&
        this.props.emails.map(e => {
          return (
            <div key={e.id}>
              <div className="alert alert-danger" role="alert">
                <Title>{`${e.threshold}% THRESHOLD EXCEEDED`}</Title>
                <div>{`Server Name: ${e.serverName}`}</div>
                <div>{`Percentage: ${e.currentPercentage}%`}</div>
                <div>{`Time: ${e.time}`}</div>
                <div>{`Date: ${e.date}`}</div>
              </div>
            </div>
          );
        })}
    </div>
  );

  render() {
    return (
      <Layout>
        <h1>Emails</h1>
        {this.renderEmails()}
      </Layout>
    );
  }
}

const mapStateToProps = state => state.Emails;

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);
