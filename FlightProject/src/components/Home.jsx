import React, { useContext, useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { FlightContext } from "../main";
import { FilterList } from "@mui/icons-material";
import "./Home.css";

export default function Home() {
  const { flights, sortBy, setSortBy } = useContext(FlightContext);
  const [sortOrder, setSortOrder] = useState("asc"); // Track sort order
  const [openDialog, setOpenDialog] = useState(false); // Dialog open/close state
  const [selectedFlight, setSelectedFlight] = useState(null); // Selected flight details

  // Ticket booking dialog state
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOpenBookingDialog = (flight) => {
    setSelectedFlight(flight); // Set the selected flight, this is making sure that selectedFlight is never null
    setBookingDialogOpen(true);
  };

  const handleCloseBookingDialog = () => {
    setBookingDialogOpen(false);
    setSelectedFlight(null); // Reset selectedFlight when dialog is closed
  };

  const handleConfirmBooking = () => {
    // Perform booking confirmation logic here
    alert(`Ticket booking successful for ${numTickets} tickets!`);
    handleCloseBookingDialog();
  };

  //   This calculation occurs whenever numTickets or selectedFlight changes. The useEffect hook observes these dependencies and triggers the callback whenever any of them change.
  useEffect(() => {
    // Calculate total price whenever numTickets changes
    // Calculate total price whenever numTickets changes and selectedFlight is not null
    if (selectedFlight) {
      setTotalPrice(selectedFlight.flightPrice * numTickets);
    }
  }, [numTickets, selectedFlight]);

  // Function to handle sorting, set sortBY and set sortOrder
  const handleSort = (property) => {
    // if currently sortBy and property are same just change the order
    if (sortBy === property) {
      // Toggle sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a different property, default to ascending order
      setSortBy(property);
      setSortOrder("asc");
    }
  };

  // Function to open dialog and set selected flight
  const handleOpenDialog = (flight) => {
    setSelectedFlight(flight);
    setOpenDialog(true);
  };

  // Function to close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to render filter icon
  const renderFilterIcon = (property) => {
    if (sortBy === property) {
      return <FilterList />;
    }
    return <FilterList />;
  };

  // Function to clear all filters
  const clearFilters = () => {
    setSortBy(null);
    setSortOrder("asc");
  };

  // Sorting logic
  // if sortBy or sortOrder changes, the component will re-render, and during this re-render, the sortedFlights variable will be recalculated using the new values of sortBy and sortOrder. Therefore, the sorting operation occurs indirectly as a part of the re-rendering process triggered by the change in state (sortBy or sortOrder).

  const sortedFlights = sortBy
    ? [...flights].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      })
    : flights;

  return (
    <div className="container">
      <Button onClick={clearFilters}>
        Clear Filters (sort all to default order)
      </Button>
      <Paper elevation={7}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="table-header-cell">Flight Info</TableCell>
                <TableCell
                  className="table-header-cell"
                  onClick={() => handleSort("flightDepartureTime")}
                >
                  Departure {renderFilterIcon("flightDepartureTime")}
                </TableCell>
                <TableCell
                  className="table-header-cell"
                  onClick={() => handleSort("flightDuration")}
                >
                  Duration {renderFilterIcon("flightDuration")}
                </TableCell>
                <TableCell
                  className="table-header-cell"
                  onClick={() => handleSort("flightArrivalTime")}
                >
                  Arrival {renderFilterIcon("flightArrivalTime")}
                </TableCell>
                <TableCell
                  className="table-header-cell"
                  onClick={() => handleSort("flightPrice")}
                >
                  Price {renderFilterIcon("flightPrice")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedFlights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell className="table-cell">
                    <img
                      src={flight.flightPng}
                      alt={flight.flightName}
                      width="50"
                    />
                    <div>{flight.flightName}</div>

                    <div>{flight.flightDate}</div>

                    <br />
                  </TableCell>
                  <TableCell className="table-cell">
                    Departure: {flight.flightDepartureTime}
                  </TableCell>
                  <TableCell className="table-cell">
                    {flight.flightDuration}
                  </TableCell>
                  <TableCell className="table-cell">
                    Arrival: {flight.flightArrivalTime}
                  </TableCell>
                  <TableCell className="table-cell">
                    Price: ${flight.flightPrice}
                    <br />
                    <Button onClick={() => handleOpenBookingDialog(flight)}>
                      Book Ticket
                    </Button>
                    <Button onClick={() => handleOpenDialog(flight)}>
                      Flight Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Dialog for displaying flight details */}
      {selectedFlight && (
        // here openDialog is a boolean value whose value changes when I click on FlightDetails
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          className="flight-dialog"
        >
          <DialogTitle style={{ fontWeight: "bold" }}>
            Flight Details
          </DialogTitle>
          <DialogContent>
            <div>Flight Name: {selectedFlight.flightName}</div>
            <div>Flight Date: {selectedFlight.flightDate}</div>
            <div>Departure Time: {selectedFlight.flightDepartureTime}</div>
            <div>Duration: {selectedFlight.flightDuration}</div>
            <div>Arrival Time: {selectedFlight.flightArrivalTime}</div>
            <div>Price: ${selectedFlight.flightPrice}</div>
            {/* Add more flight details as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
      {/* Dialog for booking tickets */}
      <Dialog open={bookingDialogOpen} onClose={handleCloseBookingDialog}>
        <DialogTitle style={{ fontWeight: "bold" }}>Book Tickets</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="numTickets"
            label="Number of Tickets"
            type="number"
            // if this value changes it is important
            value={numTickets}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setNumTickets(value);
              }
            }}
            fullWidth
          />
          <DialogContent>
            <div>Total Price: ${totalPrice}</div>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookingDialog}>Cancel</Button>
          <Button onClick={handleConfirmBooking}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
