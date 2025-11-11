import { useEffect, useState, useRef } from "react";
import { startFleetSimulation } from "../api/eventSimulator";

export default function useFleetSimulation(events, speed = 1, isRunning) {
  const [trips, setTrips] = useState({});
  const currentIndexRef = useRef(0);
  const simulatorRef = useRef(null);

  useEffect(() => {
    if (!isRunning || events.length === 0) return;

    const { stop, getCurrentIndex } = startFleetSimulation(
      events,
      handleEvent,
      speed,
      currentIndexRef.current
    );
    simulatorRef.current = { stop, getCurrentIndex };

    return () => {
      currentIndexRef.current = getCurrentIndex();
      stop();
    };
  }, [isRunning, events, speed]);

  const handleEvent = (event) => {
    setTrips((prev) => {
      const existingTrip = prev[event.trip_id];

      if (!existingTrip) {
        return {
          ...prev,
          [event.trip_id]: {
            firstRecord: event,
            lastEvent: event,
            route: [[event.location.lat, event.location.lng]],
            status: event.event_type,
          },
        };
      }

      if (
        event.event_type === "trip_completed" ||
        event.event_type === "trip_cancelled"
      ) {
        return {
          ...prev,
          [event.trip_id]: {
            ...prev[event.trip_id],
            endRecord: event,
            status: event.event_type,
          },
        };
      }

      return {
        ...prev,
        [event.trip_id]: {
          ...existingTrip,
          lastEvent: event,
          route: [
            ...existingTrip.route,
            [event.location.lat, event.location.lng],
          ],
          status: event.event_type,
        },
      };
    });
  };

  return { trips };
}
