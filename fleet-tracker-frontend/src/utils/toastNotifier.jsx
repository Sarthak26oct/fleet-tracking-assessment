import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast";
import { getTripName } from "./utils";

const EVENT_MESSAGES = {
  trip_started: { type: "success", label: "Trip Started" },
  trip_completed: { type: "success", label: "Trip Completed" },
  trip_cancelled: { type: "error", label: "Trip Cancelled" },
  fuel_level_low: { type: "warning", label: "Fuel Level Low" },
  refueling_started: { type: "info", label: "Refueling Started" },
  refueling_completed: { type: "success", label: "Refueling Completed" },
  battery_low: { type: "warning", label: "Battery Low" },
  device_error: { type: "error", label: "Device Error" },
  signal_lost: { type: "warning", label: "Signal Lost" },
  signal_recovered: { type: "success", label: "Signal Recovered" },
  speed_violation: { type: "warning", label: "Speed Violation" },
  vehicle_stopped: { type: "info", label: "Vehicle Stopped" },
  vehicle_moving: { type: "info", label: "Vehicle Moving" },
  vehicle_telemetry: { type: "info", label: "Telemetry Updated" },
};

export const notifyEvent = (event, tripId) => {
  if (event.event_type === "location_ping") return;

  const data = EVENT_MESSAGES[event.event_type] || {
    type: "info",
    label: "Event Update",
  };

  const message = (
    <CustomToast title={getTripName(tripId)} message={data.label} />
  );

  switch (data.type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast.info(message);
  }
};
