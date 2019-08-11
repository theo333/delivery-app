import React, { Component } from 'react';
import ReactMapGL, { Marker, Layer, Feature } from 'react-map-gl';
import Geocoder from 'react-geocoder-autocomplete';
import Cookies from 'js-cookie';
import { polygon, point, pointsWithinPolygon } from '@turf/turf';

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

    this.onSelect = this.onSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.deleteSearchItem = this.deleteSearchItem.bind(this);
  }

  componentDidMount() {
    const searches = Cookies.getJSON('searches');
    if (searches) {
      this.setState({ searches });
    }
  }

  onSelect(currentSearch) {
    console.log('this', this);
    const { searches } = this.state;
    this.setState(
      {
        currentSearch,
        searches: [...searches, currentSearch],
      },
      () => console.log('onSelect: ', this.state),
    );

    if (searches.length) {
      Cookies.set('searches', searches);
    }
  }

  onInputChange(value) {
    console.log('input change: ', value);
  }

  deleteSearchItem(itemId) {
    console.log({ itemId });
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newSearches = this.state.searches.filter(search => search.id !== itemId);
    this.setState({
      // ...this.state,
      searches: newSearches,
    });
  }

  isInDeliveryZone(currentSearchCoordinates) {
    // same as green area on map
    // coordinate data comes from studio.mapbox.com account
    const deliveryZonePolygon = polygon([
      [
        [-74.16237200261365, 40.89342416767394],
        [-74.18537281000276, 40.85374706633121],
        [-74.152309149392, 40.80080727373374],
        [-74.08115040153235, 40.78629584751016],
        [-74.0322736858356, 40.82274977948828],
        [-74.00831451146911, 40.866250633673076],
        [-74.0236483830664, 40.903928276891406],
        [-74.07803570886267, 40.92547458939251],
        [-74.1314646676952, 40.9225780148017],
        [-74.16237200261365, 40.89342416767394],
      ],
    ]);

    const clientLocation = point(currentSearchCoordinates);
    const locationInDeliveryZone = pointsWithinPolygon(clientLocation, deliveryZonePolygon);
    return locationInDeliveryZone.features.length;
  }

  render() {
    const { storeLocation, currentSearch, searches } = this.state;
    console.log({ searches });
    const polygonCoords =
      '-74.14048470500725,40.82756361297996,-74.04012267980431,40.87299245764015';
    const polygonPaint = {
      'fill-color': '#6f788a',
      'fill-opacity': 0.5,
    };

    return (
      <div className="row">
        <div className="col-md-4 enter-info">
          <h2 className="text-center">Searches</h2>
          <ul className="list-group">
            {/* eslint-disable */}
            {searches
              ? searches.map((search, idx) => {
                  {
                    console.log('search', search);
                  }
                  return (
                    <li key={search.id} className="list-group-item">
                      <span className="search-idx">{idx + 1} :</span>
                      {search.place_name}
                      {this.isInDeliveryZone(search.center) ? ' [we deliver] ' : ''}
                      <button onClick={() => this.deleteSearchItem(search.id)}>X</button>
                    </li>
                  );
                })
              : ''}
            {/* eslint-enable */}
          </ul>
        </div>
        <div className="col-md-8">
          <ReactMapGL
            {...this.state.viewport}
            onViewportChange={viewport => this.setState({ viewport })}
            mapStyle="mapbox://styles/theo333/cjvspb9dj1ma81cs3lsp05mdz" // get from MapBox Studio
            mapboxApiAccessToken={TOKEN}
          >
            <Geocoder
              accessToken={TOKEN}
              onSelect={this.onSelect}
              showLoader={false}
              onInputChange={this.onInputChange}
              proximity="-74.085076,40.850979"
              // bbox - limits search results to this area
              // bbox="-74.14048470500725,40.82756361297996,-74.04012267980431,40.87299245764015"
              // bbox="-74.18727287307729,40.809073440988225,-74.01471738916278,40.906762423175394"
              bbox="-74.26110921823805,40.7991913964384,-73.97434436728172,40.9622544817727"
            />
            {/* <Layer type='fill' paint={polygonPaint}>
							<Feature coordinates={polygonCoords} />
            </Layer> */}
            {/* <Layer
              id='Polygon'
              type='fill'
              source={{
                type = 'geojson',
                data = {
                  "geometry": {
                    "coordinates": [
                      [
                        [
                          -74.16237200261365,
                          40.89342416767394
                        ],
                        [
                          -74.18537281000276,
                          40.85374706633121
                        ],
                        [
                          -74.152309149392,
                          40.80080727373374
                        ],
                        [
                          -74.08115040153235,
                          40.78629584751016
                        ],
                        [
                          -74.0322736858356,
                          40.82274977948828
                        ],
                        [
                          -74.00831451146911,
                          40.866250633673076
                        ],
                        [
                          -74.0236483830664,
                          40.903928276891406
                        ],
                        [
                          -74.07803570886267,
                          40.92547458939251
                        ],
                        [
                          -74.1314646676952,
                          40.9225780148017
                        ],
                        [
                          -74.16237200261365,
                          40.89342416767394
                        ]
                      ]
                    ],
                    "type": "Polygon"
                  },
                  "type": "Feature",
                  "properties": {}
                }

                // {
                //   'type': 'Feature',
                //   'geometry': {
                //     'type': 'Polygon',
                //     'coordinates': [[[-67.13734351262877, 45.137451890638886],
                //     [-66.96466, 44.8097],
                //     [-68.03252, 44.3252],
                //     [-69.06, 43.98],
                //     [-70.11617, 43.68405],
                //     [-70.64573401557249, 43.090083319667144],
                //     [-70.75102474636725, 43.08003225358635],
                //     [-70.79761105007827, 43.21973948828747],
                //     [-70.98176001655037, 43.36789581966826],
                //     [-70.94416541205806, 43.46633942318431],
                //     [-71.08482, 45.3052400000002],
                //     [-70.6600225491012, 45.46022288673396],
                //     [-70.30495378282376, 45.914794623389355],
                //     [-70.00014034695016, 46.69317088478567],
                //     [-69.23708614772835, 47.44777598732787],
                //     [-68.90478084987546, 47.184794623394396],
                //     [-68.23430497910454, 47.35462921812177],
                //     [-67.79035274928509, 47.066248887716995],
                //     [-67.79141211614706, 45.702585354182816],
                //     [-67.13734351262877, 45.137451890638886]]]
                //   }
                // }
              }}
              paint={{ "fill-color": "#81D8D0", "fill-opacity": 0.5 }}
            </Layer> */}
            <Marker longitude={storeLocation[0]} latitude={storeLocation[1]}>
              <i className="fas fa-heart" />
            </Marker>
            {/* {currentSearch && (
							<Marker
								longitude={currentSearch.center[0]}
								latitude={currentSearch.center[1]}
							>
								<i className="fas fa-map-pin"></i>
							</Marker>
						)} */}
            {searches &&
              searches.map((search, idx) => {
                return (
                  <Marker key={idx} longitude={search.center[0]} latitude={search.center[1]}>
                    <button type="button" className="btn-pin">
                      {idx + 1}
                    </button>
                    <i className="fas fa-map-pin" />
                  </Marker>
                );
              })}
          </ReactMapGL>
        </div>
      </div>
    );
  }
}
