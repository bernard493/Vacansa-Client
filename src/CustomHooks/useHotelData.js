import { getHotelById } from "../api/Hotel_Api";
import React, { useState, useEffect } from "react";
const useHotelData = (hotelId) => {
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHotel = async () => {
      try {
        setLoading(true);
        const response = await getHotelById(hotelId);

        const data = response.data.hotel;

        if (response.status !== 200) {
          console.log(`Cant find hotel with id ${hotelId}`);
          setLoading(false);
        } else {
          setHotel(data);
          setLoading(false);
        }
      } catch (error) {}
    };
    getHotel();
  }, [hotelId]);

  return { hotel, loading };
};

export default useHotelData;
