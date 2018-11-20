import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
import styled from 'styled-components';

const RouteButton = styled.button`
  margin: 0 4px;
`;

class Header extends Component {
  render() {
    const { siteTitle } = this.props;
    const emailsCount = this.props.Emails.emails.length;
    const messagesCount = this.props.Messages.messages.length;

    return (
      <div
        style={{
          background: '#393947',
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '1.45rem 1.0875rem',
          }}
        >
          <div className="d-flex">
            <div className="p-2 flex-grow-1">
              <h1 style={{ margin: 0 }}>
                <Link
                  to="/"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  {siteTitle}
                </Link>
              </h1>
            </div>
            <div className="p-2">
              <Link to="/emails">
                <RouteButton type="button" className="btn btn-light">
                  Emails
                  {parseInt(emailsCount) > 0 && (
                    <span className="badge badge-danger">{emailsCount}</span>
                  )}
                </RouteButton>
              </Link>
              <Link to="/messages">
                <RouteButton type="button" className="btn btn-light">
                  Messages
                  {parseInt(messagesCount) > 0 && (
                    <span className="badge badge-danger">{messagesCount}</span>
                  )}
                </RouteButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);
