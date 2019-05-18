import React, { Component, Fragment } from 'react';
import Map from './Map';
import MapExample from './MapExample';

export default class extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-4 enter-info">
            <div>main page</div>
          </div>
          <div className="col-md-8">
            <hr />
            <Map />
            {/* <MapExample /> */}
          </div>
        </div>
      </Fragment>
    );
  }
}
