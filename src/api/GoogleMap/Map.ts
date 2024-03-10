interface RouteParameters {
  origin: string;
  destination: string;
}

export const fetchRoute = async ({ origin, destination }: RouteParameters) => {
  const url = `http://localhost:5000/api/getRoute?origin=${encodeURIComponent(
    origin
  )}&destination=${encodeURIComponent(destination)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch route:', error);
    throw error;
  }
};
