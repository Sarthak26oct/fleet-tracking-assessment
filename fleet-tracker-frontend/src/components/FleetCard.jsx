import { Grid, styled, Typography } from "@mui/material";
import ProgressBar from "./ProgressBar";
import { formatHours, getGradiantColor, getTripName } from "../utils/utils";
import { useEffect, useState } from "react";
import { notifyEvent } from "../utils/toastNotifier";

const StyledMainGrid = styled(Grid)(() => ({
  borderRadius: "4px",
  width: "15rem",
  border: "0.5px solid grey",
}));

const GradientHeader = styled(Typography)(
  ({ theme, gradiantColor = "rgba(207, 50, 50, 1)" }) => ({
    background: `linear-gradient(90deg, ${gradiantColor} 0%, rgba(0, 0, 0, 1) 100%)`,
    padding: "8px 16px",
    color: "#fff",
    fontWeight: 700,
    fontSize: "1rem",
    borderRadius: "4px 4px 0 0",
    borderBottom: "0.5px solid grey",
  })
);

const FleetCard = ({ tripId, trip }) => {
  console.log({ tripId, trip });
  const [shownEvents, setShownEvents] = useState(new Set());

  useEffect(() => {
    if (!trip?.lastEvent || trip.lastEvent.event_type === "location_ping")
      return;

    const key = `${tripId}_${trip.lastEvent.event_id}`;
    if (shownEvents.has(key)) return;

    setShownEvents(new Set(shownEvents.add(key)));
    notifyEvent(trip.lastEvent, trip.lastEvent.trip_id);
  }, [trip]);

  const progress =
    trip.lastEvent?.distance_travelled_km &&
    trip.firstRecord?.planned_distance_km
      ? (trip.lastEvent.distance_travelled_km /
          trip.firstRecord.planned_distance_km) *
        100
      : 0;

  return (
    <StyledMainGrid>
      <GradientHeader gradiantColor={getGradiantColor(tripId)}>
        {getTripName(tripId)}
      </GradientHeader>
      <Grid sx={{ padding: "8px 16px", color: "white" }}>
        <Typography>Distance Traveled</Typography>
        <Typography sx={{ fontSize: "1.5rem" }}>
          {trip.lastEvent.distance_travelled_km || 0} KM
        </Typography>
      </Grid>

      <Grid sx={{ padding: "8px 16px", color: "white" }}>
        <Typography>Time Elapsed</Typography>
        <Typography sx={{ fontSize: "1.5rem" }}>
          {formatHours(trip.firstRecord?.estimated_duration_hours)}
        </Typography>
      </Grid>

      <Grid sx={{ padding: "8px 16px", color: "white" }}>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Trip Completed</Typography>
          <Typography>{progress.toFixed(2)}%</Typography>
        </Grid>
        <ProgressBar value={progress} color={getGradiantColor(tripId)} />
      </Grid>
    </StyledMainGrid>
  );
};

export default FleetCard;
