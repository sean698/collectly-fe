import * as React from "react";
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

export default function MainContent() {
  // Sample data - replace with actual data source
  const rows = [
    { id: 1, name: "Item 1", location: "Location A", value: "$100" },
    { id: 2, name: "Item 2", location: "Location B", value: "$200" },
    { id: 3, name: "Item 3", location: "Location C", value: "$300" },
  ];

  return (
    // <Container maxWidth="lg">
    <Container maxWidth={false}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.value}</TableCell>
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
