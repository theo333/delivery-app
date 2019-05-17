import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

import TOKEN from '../../vars';

export default class Map extends Component {
	constructor() {
		super();
		this.state = {
			viewport: {
				width: 800,
				height: 800,
				latitude: 40.8510998,
				longitude: -74.0873832,
				zoom: 12,
			}
		}
	}

	render() {
		console.log('map')
		return (
			<ReactMapGL
				{...this.state.viewport}
				onViewportChange={viewport => this.setState({ viewport })}
				mapboxApiAccessToken={TOKEN}
			/>
		);
	}
}