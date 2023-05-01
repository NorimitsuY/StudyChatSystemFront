import React, { Component } from "react";
import Box from "@mui/material/Box";
import AppBar from "../components/AppBar";
import Home from "../components/Home";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

export default function HomePage() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar />
        <Home />
      </Box>
    </div>
  );
}
