import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvent} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from '../../shared/utils/icon';
import {userString, DEFAULT_LONGITUDE, DEFAULT_LATITUDE} from '../../../constants';

function LocationMarker () {
    const [token, setToken] = useState('');
    const [position, setPosition] = useState(null)
    const [score, setScore] = useState('0.0');
    const map = useMapEvent( {
        click(e) {
           setPosition(e.latlng);
        }

    });

    useEffect(() => {(
        async () => {
            await fetch('https://35.200.193.2:3000/api', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": userString
                })
            }).then((data) => data.json())
                .then(data => setToken(data));
        }
    )()}, [])

    useEffect(() => {(
        async () => {
            await fetch('https://35.200.193.2:3000/api', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                    // 'Access-Control-Allow-Headers': '*'
                },
                body: JSON.stringify({
                    lat: 0,
                    long: 0,
                    radius: 500,
                    tag: 'atm'
                })
            }).then((data) => data.json())
                .then((data) => setScore(data.rating));
        })()}, [position])

    return position === null ? null : (
        <Marker position={position} icon={icon}>
            <Popup>{score}</Popup>
        </Marker>
    )
}

function Map (props){

    const [latitude, setLatitude] = useState(DEFAULT_LATITUDE);
    const [longitude, setLongitude] = useState(DEFAULT_LONGITUDE);

    useEffect(() => {
        setLatitude(props.latitude || latitude);
    }, [props.latitude]);

    useEffect(() => {
        setLongitude(props.longitude || longitude);
    }, [props.longitude]);

    return (
        <MapContainer
            className="leaflet-map"
            center={[latitude, longitude]}
            zoom={17}
            scrollWheelZoom={true}
            style={{ height: "100vh" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    )
}

export default Map;
