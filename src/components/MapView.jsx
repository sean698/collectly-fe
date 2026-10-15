import * as React from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "hooks/useMst";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { Box, Typography, Card, CardMedia, CardActionArea } from "@mui/material";
import "leaflet/dist/leaflet.css";

// Greater Vancouver center as the default view.
const DEFAULT_CENTER = [49.2, -123.0];
const DEFAULT_ZOOM = 11;

// A small price pin so each marker shows its rent at a glance.
const priceIcon = (price) =>
  L.divIcon({
    className: "price-marker",
    html: `<div style="background:#1a1a1a;color:#ffd54a;font-weight:bold;font-size:12px;padding:3px 7px;border-radius:12px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.4);">${
      price ? `$${price}` : "N/A"
    }</div>`,
    iconSize: null,
    iconAnchor: [20, 10],
  });

function MapView() {
  const { rentalStore } = useMst();
  const { allListings } = rentalStore;

  const located = allListings.filter((l) => l.latitude && l.longitude);

  return (
    <Box sx={{ height: "calc(100vh - 200px)", width: "100%", mt: 2 }}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {located.map((listing) => (
            <Marker
              key={listing.id}
              position={[listing.latitude, listing.longitude]}
              icon={priceIcon(listing.price)}
            >
              <Popup>
                <Card sx={{ width: 200, boxShadow: "none" }}>
                  <CardActionArea
                    onClick={() => window.open(listing.url, "_blank")}
                  >
                    <CardMedia
                      component="img"
                      height="110"
                      image={listing.imageUrl || "/imagePlaceholder.jpg"}
                      alt={listing.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: "1.2",
                        }}
                      >
                        {listing.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ fontWeight: "bold" }}
                        >
                          {listing.price ? `$${listing.price}` : "N/A"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {listing.location}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
}

export default observer(MapView);
