export function startFleetSimulation(
  events,
  callback,
  speed = 1,
  startIndex = 0
) {
  let index = startIndex;
  const sorted = [...events].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const interval = setInterval(() => {
    if (index >= sorted.length) {
      clearInterval(interval);
      return;
    }

    callback(sorted[index]);
    index++;
  }, 1000 / speed);

  return {
    stop: () => clearInterval(interval),
    getCurrentIndex: () => index,
  };
}
