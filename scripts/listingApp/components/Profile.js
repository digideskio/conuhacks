//Profile Component

import React from 'react';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

import Rebase  from 're-base';


@autobind
class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      team : null
    }
  }

  componentWillMount() {
    var ref = new Firebase('https://boiling-fire-9252.firebaseio.com/teams/' + this.props.params.teamId);
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(team) {
      this.setState({
        team: team.val()
      });
    }.bind(this), function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  }

  onButtonClick() {
  }

  render() {
    if (this.state.team) {
      var details = this.state.team;
      var response = details.data || {};
      var technologies = response.technology || [];
      var members = response.members || {};

      return (
          <div>
            <section className="adb-js-pill-target active adb-is-fixed">
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
                      <div className="adb-badges">
						{technologies.map(this.renderTechnology)}
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
            </section>
            <div className="adb-layout-default">
              <section className="adb-layout-row adb-layout-content--section">
                <div className="adb-js-tab active" id="product-overview">
                  <div className="adb-layout-content adb-layout-column__first">
                    <section className="adb-layout-content--section adb-layout-row">
                      <div className="adb-layout-content_half adb-layout-column__first">
                        <h2 className="adb-title__xxxxxlarge">{response.projectName}</h2>
                        <p>{response.projectDescription}</p>
                      </div>
                      <div className="adb-layout-content_half">
                        <figure>
                          <img src={response.teamPicture}></img>
                        </figure>
                      </div>
                    </section>
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
                </div>
              </section>
            </div>
          </div>
      )
    }
    return (
        <p></p>
    )
  }

  renderTechnology(technology, key){
    return (
        <span className="adb-badge adb-badge__success adb-profile_header--badge" key={key}>{technology}</span>
    )
  }

  renderMember(key) {
    var member = this.state.team.data.members[key];
    return (
        <div className="adb-card" key={key}>
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
};

reactMixin.onClass(Profile, Catalyst.LinkedStateMixin);

export default Profile;
