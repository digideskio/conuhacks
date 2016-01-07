/*
  Fish
  <Fish />
*/

import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Profile extends React.Component {

  onButtonClick() {
  }

  renderTeam(key){
    return (
        <span classNameName="adb-badge adb-profile_header--badge">{this.props.details.data.technology[key]}</span>
    )
  }

  renderMember(key) {
    var member = this.props.details.data.members[key];
    return (
        <div className="adb-card">
          <div className="adb-card--image">
            <a className="adb-id adb-id__linked adb-id__logo adb-id__sq_small">
              <i className="adb-id--placeholder adb-icon__app"></i>
            </a>
          </div>
          <div className="adb-card--content adb-summary">
            <h4 className="adb-title__large adb-summary--title">
              <a data-truncate="line" href={member.email}>{member.name}</a>
            </h4>
            <p className="adb-summary--details">
              {member.title}
            </p>
          </div>
        </div>
    )
  }

  render() {
    var details = this.props.details;
    var response = details.data || {};
    var technologies = response.technology || {};
    var members = response.members || {};

    return (
        <section className="adb-profile_header adb-profile_header__product adb-js-pill-target active adb-is-fixed">
          <div className="adb-profile_header--content">
            <div className="adb-layout-default">
              <div className="adb-profile_header--card adb-layout-content adb-layout-column__first adb-card">
                <div className="adb-card--image">
                  <div className="adb-id adb-id__logo adb-id__sq_large adb-profile_header--logo">
                    <img className="adb-id--img" src={response.projectPicture} />
                  </div>
                </div>
                <div className="adb-card--content adb-summary">
                  <h1 className="adb-summary--title adb-profile_header--title">{response.projectName}</h1>
                  <div className="adb-summary--details">{response.teamName}</div>
                  <div className="adb-badges js-scroll-hide">
						{Object.keys(technologies).map(this.renderTeam)}
                  </div>
                </div>
                <menu className="adb-profile_header--controls adb-layout-sidebar">
                  <div className="adb-profile_header--control">
                    <a className="adb-button adb-button__emphasis adb-button__large" href="checkout/order.html">Go to Project</a>
                  </div>
                </menu>
              </div>
            </div>
          </div>
          <div className="adb-layout-sidebar">
            <div className="adb-container">
              <div className="adb-container_header">
                <h5 className="adb-container_header--title adb-container_header--item">Team Members</h5>
              </div>
              <div className="adb-container_content">
                {Object.keys(members).map(this.renderMember)}
              </div>
            </div>
          </div>
        </section>
    )
  }
};

export default Profile;
