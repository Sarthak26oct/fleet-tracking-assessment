import { useState, useEffect } from "react";
import { Typography, Box, styled, Grid } from "@mui/material";
import { loadTripData } from "./utils/dataLoader";
import useFleetSimulation from "./hooks/useFleetSimulation";
import MapView from "./components/MapView";
import FleetSummary from "./components/FleetSummary";
import PlaybackControls from "./components/PlaybackControls";
import FleetCard from "./components/FleetCard";

const StyledTypography = styled(Typography)(() => ({
  fontWeight: 600,
  marginBottom: "2rem",
  color: "#fff",
}));

export default function App() {
  const [events, setEvents] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const { trips } = useFleetSimulation(events, speed, isRunning);

  useEffect(() => {
    loadTripData().then(setEvents);
  }, []);

  return (
    <Grid sx={{ py: 4, p: 2 }}>
      <StyledTypography variant="h4">Fleet Tracking Dashboard</StyledTypography>

      <Box mt={2}>
        <MapView trips={trips} />
      </Box>

      <PlaybackControls
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        speed={speed}
        setSpeed={setSpeed}
      />

      <FleetSummary trips={trips} />

      <Grid container spacing={2} mt={4}>
        {Object.entries(trips).map(([tripId, trip]) => (
          <Grid item xs={12} sm={6} md={4} key={tripId}>
            <FleetCard tripId={tripId} trip={trip} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
