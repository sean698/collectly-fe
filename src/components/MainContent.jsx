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
  const [displayCount, setDisplayCount] = React.useState(10);
  const loadMoreRef = React.useRef(null);

  const currentItems = filteredRentalListings.slice(0, displayCount);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          displayCount < filteredRentalListings.length
        ) {
          setDisplayCount((prev) => prev + 10);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, filteredRentalListings.length]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {currentItems.map((listing) => (
            <Grid item xs={12} sm={6} md={3} key={listing.id}>
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
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {listing.price ? `$${listing.price}` : "N/A"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: "bold",
                          backgroundColor: "backdrop.main",
                          color: "customYellow.main",
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

        {displayCount < filteredRentalListings.length && (
          <Box
            ref={loadMoreRef}
            sx={{
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography color="text.secondary">Loading more...</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default observer(MainContent);
