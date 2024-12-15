import * as React from "react";
import { useMst } from "hooks/useMst";
import { observer } from "mobx-react-lite";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const tableCellStyles = {
  textAlign: "center",
};

function MainContent() {
  const { rentalStore } = useMst();
  const { filteredRentalListings } = rentalStore;
  console.log(filteredRentalListings);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyles}>Image</TableCell>
                  <TableCell sx={tableCellStyles}>Title</TableCell>
                  <TableCell sx={tableCellStyles}>Location</TableCell>
                  <TableCell sx={tableCellStyles}>Price</TableCell>
                  <TableCell sx={tableCellStyles}>Source</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRentalListings.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={() => window.open(row.url, "_blank")}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell sx={tableCellStyles}>
                      <img
                        src={row?.imageUrl}
                        alt=""
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        maxWidth: "300px",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell sx={tableCellStyles}>{row.location}</TableCell>
                    <TableCell sx={tableCellStyles}>{row.price}</TableCell>
                    <TableCell sx={tableCellStyles}>{row.source}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
}

export default observer(MainContent);
