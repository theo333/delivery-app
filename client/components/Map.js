import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
// import Geocoder from '@mapbox/react-geocoder';
import Geocoder from 'react-geocoder-autocomplete';

import TOKEN from '../../vars';

export default class Map extends Component {
	constructor() {
		super();
		this.state = {
			viewport: {
				width: '100%vw',
				height: '800',
				latitude: 40.8510998,
				longitude: -74.0873832,
				zoom: 12,
			},
			location: [40.850979, -74.085076], // [lat, long]
			value,
		};
	}

	onSelect = value => {
		this.setState({
			value,
		});
	};

	render() {
		console.log('map token: ', process.env.REACT_MAP_MAPBOX_TOKEN);
		const { location } = this.state;
		return (
			<ReactMapGL
				{...this.state.viewport}
				// onViewportChange={viewport => this.setState({ viewport })}
				mapStyle="mapbox://styles/theo333/cjvspb9dj1ma81cs3lsp05mdz" // get from Map Studio
				mapboxApiAccessToken={TOKEN}
			>
				<Geocoder accessToken={TOKEN} onSelect={this.onSelect} showLoader />
				<Marker latitude={location[0]} longitude={location[1]}>
					{/* <button> */}
					<img src="/images/32px-heart.png" alt="heart" />
					{/* </button> */}
				</Marker>
			</ReactMapGL>
		);
	}
}
