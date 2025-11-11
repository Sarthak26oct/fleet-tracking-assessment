import { styled } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Stack,
} from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(25, 25, 25, 0.85)",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  color: "#fff",
  padding: theme.spacing(3),
  width: "100%",
  boxSizing: "border-box",
  overflow: "hidden",
}));

const MetricLabel = styled(Typography)(() => ({
  fontSize: "0.9rem",
  opacity: 0.85,
  whiteSpace: "nowrap",
}));

const MetricValue = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: "1rem",
  minWidth: "40px",
  textAlign: "right",
  flexShrink: 0,
}));

const StyledLinearProgress = styled(LinearProgress)(() => ({
  flexGrow: 1,
  height: 8,
  borderRadius: 4,
  "& .MuiLinearProgress-bar": {
    borderRadius: 4,
    background: "linear-gradient(90deg, #42a5f5, #1976d2)",
  },
  "&.MuiLinearProgress-root": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
}));

const FleetSummary = ({ trips }) => {
  const totalTrips = Object.keys(trips).length;

  let completed50 = 0,
    completed80 = 0,
    fullyCompleted = 0,
    cancelled = 0;

  Object.values(trips).forEach((trip) => {
    const total = trip.firstRecord?.planned_distance_km ?? 0;
    const current = trip.lastEvent?.distance_travelled_km ?? 0;
    const percent = total > 0 ? (current / total) * 100 : 0;

    if (trip.status === "trip_completed") fullyCompleted++;
    else if (trip.status === "trip_cancelled") cancelled++;
    if (percent >= 50) completed50++;
    if (percent >= 80) completed80++;
  });

  const metrics = [
    { label: "Trips ≥ 50% Completed", value: completed50, color: "#42a5f5" },
    { label: "Trips ≥ 80% Completed", value: completed80, color: "#26c6da" },
    { label: "Trips Completed", value: fullyCompleted, color: "#66bb6a" },
    { label: "Trips Cancelled", value: cancelled, color: "#ef5350" },
  ];

  return (
    <StyledCard>
      <CardContent sx={{ width: "100%", padding: "0 !important" }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          Collective Fleet Metrics
        </Typography>

        <Stack
          spacing={1.8}
          sx={{
            width: "100%",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          {metrics.map((m) => (
            <Stack
              key={m.label}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                width: "100%",
                flexWrap: "nowrap",
                overflow: "hidden",
              }}
            >
              <Box sx={{ width: "210px", pr: 1 }}>
                <MetricLabel>{m.label}</MetricLabel>
              </Box>

              <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                <StyledLinearProgress
                  variant="determinate"
                  value={(m.value / (totalTrips || 1)) * 100}
                  sx={{
                    "& .MuiLinearProgress-bar": {
                      background: m.color,
                    },
                  }}
                />
              </Box>

              <MetricValue sx={{ color: m.color }}>{m.value}</MetricValue>
            </Stack>
          ))}
        </Stack>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Total Trips: {totalTrips || 0}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default FleetSummary;
