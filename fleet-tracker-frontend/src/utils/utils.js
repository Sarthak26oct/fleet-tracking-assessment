export const getTripColor = (status) => {
  switch (status) {
    case "trip_completed":
      return "green";
    case "trip_cancelled":
      return "gray";
    case "signal_lost":
      return "orange";
    case "speed_violation":
      return "red";
    default:
      return "#1976d2";
  }
};

export const getGradiantColor = (tripId) => {
  switch (tripId) {
    case "trip_20251103_090000":
      return "rgba(75, 169, 209, 1)";
    case "trip_20251103_100000":
      return "rgba(51, 122, 109, 1)";
    case "trip_20251103_110000":
      return "rgba(242, 211, 85, 1)";
    case "trip_20251103_120000":
      return "rgba(196, 106, 45, 1)";
    default:
      return "rgba(207, 50, 50, 1)";
  }
};

export const getTripName = (tripId) => {
  switch (tripId) {
    case "trip_20251103_080000":
      return "Cross-Country Long Haul";
    case "trip_20251103_090000":
      return "Urban Dense Delivery";
    case "trip_20251103_100000":
      return "Mountain Route Cancelled";
    case "trip_20251103_110000":
      return "Southern Technical Issues";
    case "trip_20251103_120000":
      return "Regional Logistics";
    default:
      return "Trip";
  }
};

export const formatHours = (hours) => {
  if (isNaN(hours) || hours < 0) return "0h 0m";

  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  return `${h}h ${m}m`;
};
