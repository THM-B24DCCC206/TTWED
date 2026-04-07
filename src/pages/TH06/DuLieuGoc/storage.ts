import { initialDestinations } from './mockData';

export const getDestinations = () => {
  const data = localStorage.getItem('TH06_DESTINATIONS');
  if (data) {
    return JSON.parse(data);
  }
  localStorage.setItem('TH06_DESTINATIONS', JSON.stringify(initialDestinations));
  return initialDestinations;
};

export const saveDestinations = (destinations: any) => {
  localStorage.setItem('TH06_DESTINATIONS', JSON.stringify(destinations));
};

export const getItinerary = () => {
  const data = localStorage.getItem('TH06_ITINERARY');
  if (data) {
    return JSON.parse(data);
  }
  localStorage.setItem('TH06_ITINERARY', JSON.stringify([]));
  return [];
};

export const saveItinerary = (itinerary: any) => {
  localStorage.setItem('TH06_ITINERARY', JSON.stringify(itinerary));
};