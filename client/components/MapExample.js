import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { Component } from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import TOKEN from '../../vars';

const MAPBOX_TOKEN = TOKEN;

class MapExample extends Component {
	constructor() {
		super();
		this.state = {
			viewport: {
				width: 400,
				height: 400,
				latitude: 37.7577,
				longitude: -122.4376,
				zoom: 8
			}
		}
	}

	mapRef = React.createRef()

	componentDidMount() {
		window.addEventListener('resize', this.resize)
		this.resize()
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize)
	}

	resize = () => {
		this.handleViewportChange({
			width: window.innerWidth,
			height: window.innerHeight
		})
	}

	handleViewportChange = (viewport) => {
		this.setState({
			viewport: { ...this.state.viewport, ...viewport }
		})
	}

	// if you are happy with Geocoder default settings, you can just use handleViewportChange directly
	handleGeocoderViewportChange = (viewport) => {
		const geocoderDefaultOverrides = { transitionDuration: 1000 }

		return this.handleViewportChange({
			...viewport,
			...geocoderDefaultOverrides
		})
	}

	render() {
		return (
			<MapGL
				ref={this.mapRef}
				{...this.state.viewport}
				onViewportChange={this.handleViewportChange}
				mapboxApiAccessToken={MAPBOX_TOKEN}>
				<Geocoder
					mapRef={this.mapRef}
					onViewportChange={this.handleGeocoderViewportChange}
					mapboxApiAccessToken={MAPBOX_TOKEN}
				/>
			</MapGL>
		)
	}
}

export default MapExample;
