import React, { Component } from 'react';
import ReactMapGL, { Marker, Layer, Feature } from 'react-map-gl';
import Geocoder from 'react-geocoder-autocomplete';
import Cookies from 'js-cookie';

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
			storeLocation: [-74.085076, 40.850979], // [long, lat]
			currentSearch: null,
			searches: [],
		};
	}

	componentDidMount() {
		const searches = Cookies.getJSON('searches');
		if (searches) {
			this.setState({ searches })
		}
	}

	onSelect = currentSearch => {
		const { searches } = this.state;
		this.setState({
			currentSearch,
			searches: [...searches, currentSearch]
		}, () => console.log('onSelect: ', this.state));

		if (searches.length) {
			Cookies.set('searches', searches);
		}
	};

	onInputChange = value => {
		console.log('input change: ', value);
	}

	deleteSearchItem = itemId => {
		console.log({ itemId })
		const newSearches = this.state.searches.filter(search => search.id !== itemId);
		this.setState({
			...this.state,
			searches: newSearches,
		})
	}

	render() {
		const { storeLocation, currentSearch, searches } = this.state;
		console.log({ searches })
		const polygonCoords = '-74.14048470500725,40.82756361297996,-74.04012267980431,40.87299245764015';
		const polygonPaint = {
			'fill-color': '#6f788a',
			'fill-opacity': 0.5,
		}
		return (
			<div className="row">
				<div className="col-md-4 enter-info">
					<h2 className='text-center'>Searches</h2>
					<ul className='list-group'>
						{
							searches ? (
								searches.map((search, idx) => {
									return (
										<li key={search.id} className='list-group-item'>
											<span className='search-idx'>{idx + 1} :</span>{search.place_name}
											<button onClick={() => this.deleteSearchItem(search.id)}>X</button>
										</li>
									)
								})
							) : ''
						}
					</ul>
				</div>
				<div className="col-md-8">
					<ReactMapGL
						{...this.state.viewport}
						onViewportChange={viewport => this.setState({ viewport })}
						mapStyle="mapbox://styles/theo333/cjvspb9dj1ma81cs3lsp05mdz" // get from Map Studio
						mapboxApiAccessToken={TOKEN}
					>
						<Geocoder
							accessToken={TOKEN}
							onSelect={this.onSelect}
							showLoader={false}
							onInputChange={this.onInputChange}
							proximity={'-74.085076,40.850979'}
							bbox={'-74.14048470500725,40.82756361297996,-74.04012267980431,40.87299245764015'}
						/>
						{/* <Layer type='fill' paint={polygonPaint}>
							<Feature coordinates={polygonCoords} />
						</Layer> */}
						<Marker
							longitude={storeLocation[0]}
							latitude={storeLocation[1]}
						>
							<i className="fas fa-heart"></i>
						</Marker>
						{/* {currentSearch && (
							<Marker
								longitude={currentSearch.center[0]}
								latitude={currentSearch.center[1]}
							>
								<i className="fas fa-map-pin"></i>
							</Marker>
						)} */}
						{searches && (
							searches.map((search, idx) => {
								return (
									<Marker key={idx}
										longitude={search.center[0]}
										latitude={search.center[1]}
									>
										<button className='btn-pin'>{idx + 1}</button>
										<i className="fas fa-map-pin"></i>
									</Marker>
								)
							})
						)}

					</ReactMapGL>
				</div>
			</div>
		);
	}
}
