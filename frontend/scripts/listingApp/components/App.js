/*
  App
*/

import React from 'react';
import Header from './Header';
import Team from './Team';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

// Firebase
import Rebase  from 're-base';
var base = Rebase.createClass('https://boiling-fire-9252.firebaseio.com/');

@autobind
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      teams : {}
    }
  }

  componentDidMount() {
    base.syncState('/teams', {
      context : this,
      state : 'teams'
    });
  }

  render() {
    return (
      <div className="listing">
          <Header />
          <div className="js-grid-region">
            {Object.keys(this.state.teams).map(this.renderTeam)}
          </div>
      </div>
    )
  }

  renderTeam(key){
    return <Team key={key} index={key} details={this.state.teams[key]} addToOrder={this.addToOrder}/>
  }
};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
