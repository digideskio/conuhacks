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
    //var isAvailable = (details.status === 'available' ? true : false);
    return (
        <div className="adb-tile adb-myapp">
          <div className="adb-id adb-id__logo adb-id__sq_large adb-id__editable adb-myapp--image">
            <img className="adb-id--img" src={details.projectPicture} />
          </div>
          <p>{details.projectName}</p>
        </div>
    )
  }
};


export default Fish;
