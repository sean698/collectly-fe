import * as React from "react";
import { useMst } from "hooks/useMst";
import { observer } from "mobx-react-lite";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";

function MainContent() {
  const { rentalStore } = useMst();
  const { filteredRentalListings } = rentalStore;
  console.log(filteredRentalListings);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {filteredRentalListings.map((listing) => (
            <Grid item xs={12} sm={6} md={2.4} key={listing.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  onClick={() => window.open(listing.url, "_blank")}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={listing.imageUrl || "/imagePlaceholder.jpg"}
                    alt={listing.title}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        height: "48px",
                        lineHeight: "1.2",
                      }}
                    >
                      {listing.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing.location}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" color="primary">
                        {listing.price ? `$${listing.price}` : "N/A"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                        }}
                      >
                        {listing.source}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default observer(MainContent);
