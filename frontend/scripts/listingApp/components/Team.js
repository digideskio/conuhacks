/*
  Fish
  <Fish />
*/

import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Fish extends React.Component {

  onButtonClick() {
  }

  render() {
    var details = this.props.details;
    var response = details.data || {};

    var idClasses = 'adb-id adb-id__logo adb-id__sq_large adb-id__editable adb-myapp--image adb-id__launchable';
    var inactiveIcon = '';

    if (!details.active) {
      idClasses += ' adb-is-disabled';
      inactiveIcon = <i className="adb-icon__error adb-icon_alert adb-icon_alert__error"></i>
    }

    return (
        <div className="adb-tile adb-myapp">
          <div className={idClasses}>
            <img className="adb-id--img" src={response.projectPicture} />
          </div>
          <p>
            {inactiveIcon} {response.projectName}
          </p>
        </div>
    )
  }
};


export default Team;
