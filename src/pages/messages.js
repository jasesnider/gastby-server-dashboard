import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import styled from 'styled-components';

const Title = styled.div`
  font-weight: bold;
`;

class Messages extends Component {
  constructor(props) {
    super(props);

    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages = () => (
    <div>
      {this.props.messages &&
        this.props.messages.map(m => {
          return (
            <div key={m.id}>
              <div className="alert alert-danger" role="alert">
                <Title>{`${m.threshold}% THRESHOLD EXCEEDED`}</Title>
                <div>{`Server Name: ${m.serverName}`}</div>
                <div>{`Percentage: ${m.currentPercentage}%`}</div>
                <div>{`Time: ${m.time}`}</div>
                <div>{`Date: ${m.date}`}</div>
              </div>
            </div>
          );
        })}
    </div>
  );

  render() {
    return (
      <Layout>
        <h1>Messages</h1>
        {this.renderMessages()}
      </Layout>
    );
  }
}

const mapStateToProps = state => state.Messages;

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
