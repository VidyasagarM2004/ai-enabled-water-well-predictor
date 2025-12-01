import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { motion } from 'framer-motion'
import { MapPin, Crosshair, Layers, Navigation } from 'lucide-react'
import L from 'leaflet'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useGeolocation } from '../hooks/useGeolocation'
import 'leaflet/dist/leaflet.css'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng)
    },
  })
  return null
}

const MapView = () => {
  const { location, getCurrentLocation, loading } = useGeolocation()
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [mapLayer, setMapLayer] = useState('street')
  const [center, setCenter] = useState([40.7128, -74.0060]) // Default to NYC

  useEffect(() => {
    if (location) {
      setCenter([location.latitude, location.longitude])
    }
  }, [location])

  const handleMapClick = (latlng) => {
    const newMarker = {
      id: Date.now(),
      position: [latlng.lat, latlng.lng],
      type: 'potential_site',
      title: `Site ${markers.length + 1}`,
      description: 'Potential drilling location'
    }
    setMarkers([...markers, newMarker])
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const getDistance = (marker) => {
    if (!location) return null
    return calculateDistance(
      location.latitude, 
      location.longitude, 
      marker.position[0], 
      marker.position[1]
    ).toFixed(2)
  }

  const tileLayerUrls = {
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">GPS & Map Tracking</h1>
        <p className="text-muted-foreground">
          Track your location and mark potential drilling sites
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Map Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={getCurrentLocation} 
              className="w-full"
              disabled={loading}
            >
              <Navigation className="h-4 w-4 mr-2" />
              {loading ? 'Getting Location...' : 'Get Current Location'}
            </Button>

            <div>
              <label className="text-sm font-medium">Map Layer</label>
              <select
                value={mapLayer}
                onChange={(e) => setMapLayer(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background"
              >
                <option value="street">Street Map</option>
                <option value="satellite">Satellite View</option>
                <option value="terrain">Terrain Map</option>
              </select>
            </div>

            {location && (
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Current Location</h4>
                <p className="text-sm">Lat: {location.latitude.toFixed(6)}</p>
                <p className="text-sm">Lng: {location.longitude.toFixed(6)}</p>
                <p className="text-sm">Accuracy: ±{location.accuracy}m</p>
              </div>
            )}

            <div className="text-sm text-muted-foreground">
              <p>Click on the map to add potential drilling sites</p>
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="h-96 lg:h-[600px] rounded-lg overflow-hidden">
                <MapContainer
                  center={center}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url={tileLayerUrls[mapLayer]}
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  <MapClickHandler onMapClick={handleMapClick} />

                  {/* Current location marker */}
                  {location && (
                    <Marker position={[location.latitude, location.longitude]}>
                      <Popup>
                        <div>
                          <h3 className="font-semibold">Your Location</h3>
                          <p>Lat: {location.latitude.toFixed(6)}</p>
                          <p>Lng: {location.longitude.toFixed(6)}</p>
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  {/* Potential site markers */}
                  {markers.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={marker.position}
                      eventHandlers={{
                        click: () => setSelectedMarker(marker),
                      }}
                    >
                      <Popup>
                        <div>
                          <h3 className="font-semibold">{marker.title}</h3>
                          <p>{marker.description}</p>
                          <p>Lat: {marker.position[0].toFixed(6)}</p>
                          <p>Lng: {marker.position[1].toFixed(6)}</p>
                          {getDistance(marker) && (
                            <p>Distance: {getDistance(marker)} km</p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Marked Sites */}
      {markers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Marked Sites ({markers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {markers.map((marker) => (
                  <div
                    key={marker.id}
                    className="p-4 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => setSelectedMarker(marker)}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">{marker.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {marker.description}
                    </p>
                    <div className="text-xs space-y-1">
                      <p>Lat: {marker.position[0].toFixed(6)}</p>
                      <p>Lng: {marker.position[1].toFixed(6)}</p>
                      {getDistance(marker) && (
                        <p>Distance: {getDistance(marker)} km from you</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default MapView