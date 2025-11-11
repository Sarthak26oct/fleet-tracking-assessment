export async function loadTripData() {
  const routes = [
    "trip_1_cross_country.json",
    "trip_2_urban_dense.json",
    "trip_3_mountain_cancelled.json",
    "trip_4_southern_technical.json",
    "trip_5_regional_logistics.json",
  ];

  const responses = await Promise.all(
    routes.map((route) => fetch(`/data/${route}`).then((res) => res.json()))
  );

  return responses
    .flat()
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}
