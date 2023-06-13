import { MapsHomeWork } from '@mui/icons-material';
import { GoogleMap, useJsApiLoader, useGoogleMap } from '@react-google-maps/api';
import React, { useEffect } from 'react';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

interface MapProps {
    setCoords: (lat: number, lng: number) => void;
}

export default function Map(props: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCairD6vy8qSJ__Tk7KwT6vWunWrPd7xZw"
    });

    if (!isLoaded) return <></>;

    return <>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <MapPan setCoords={props.setCoords} />
        </GoogleMap>
    </>;
}

function MapPan(props: MapProps) {
    const map = useGoogleMap();
    map?.addListener('center_changed', () => {
        const lat = map.getCenter()?.lat();
        const lng = map.getCenter()?.lng();
        if (lat && lng) {
            console.log(lat, lng);
            props.setCoords(lat, lng);
        }
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (!map) return;
            console.log(position);
            map?.panTo({ lat: position.coords.latitude, lng: position.coords.longitude });
            props.setCoords(position.coords.latitude, position.coords.longitude);
        });
    }, []);

    return null;
}