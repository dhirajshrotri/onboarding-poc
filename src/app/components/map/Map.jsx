import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvent} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from '../../shared/utils/icon';
import {fetchScore} from "../../api/fetchScore";

function LocationMarker (props) {
    const [token, setToken] = useState(props.token);
    const [position, setPosition] = useState({lat: props.latitude, lng: props.longitude});
    const [score, setScore] = useState(props.score);
    const map = useMapEvent( {
        click(e) {
           setPosition(e.latlng);
        }

    });

    useEffect(() => {
        setToken(props.token);
    }, [props.token]);

    useEffect(() => {
        position.lat = props.latitude;
        position.lng = props.longitude;
        setScore(props.score);
    }, [props.score]);

    useEffect(() => {(
        async () => {
            const data = await fetchScore({
                lat: position.lat,
                long: position.lng,
                radius: props.radius
            }, token);
            setScore(data);
        })()}, [position])

    return (
        <Marker position={position} icon={icon}>
            <Popup>{score}</Popup>
        </Marker>
    )
}

function Map (props){

    const [latitude, setLatitude] = useState(props.latitude);
    const [longitude, setLongitude] = useState(props.longitude);

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
            <LocationMarker
                radius={props.radius}
                token={props.token}
                score={props.score}
                latitude={props.latitude}
                longitude={props.longitude}
            />
        </MapContainer>
    )
}

export default Map;
