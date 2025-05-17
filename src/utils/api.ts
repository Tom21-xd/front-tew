export const getAirports = async () => {
    const response = await fetch('/api/airports');
    const data = await response.json();
    return data;
  };
  
  export const getCities = async () => {
    const response = await fetch('/api/cities');
    const data = await response.json();
    return data;
  };
  