import React, { useEffect, useState } from 'react';
import { fetchRoute } from 'src/api/GoogleMap/Map';

const RouteMap: React.FC = () => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const routeData = await fetchRoute({
          origin: 'Ben Thanh Market, Ho Chi Minh City, Vietnam',
          destination: 'Can Tho City, Vietnam',
        });
        setRoute(routeData);
      } catch (error) {
        console.error('Failed to fetch route data:', error);
      }
    };

    fetchRouteData();
  }, []);

  return <div>{route && <pre>{JSON.stringify(route, null, 2)}</pre>}</div>;
};

export default RouteMap;
