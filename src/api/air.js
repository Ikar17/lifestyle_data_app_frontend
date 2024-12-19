import { BACKEND_URL } from "../constants/constants";
import axios from "axios";

export async function getAirStatistics(voivodeship, district, comunne, dateFrom, dateTo) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/air`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
            voivodeship: voivodeship,
            district: district,
            comunne: comunne,
            dateFrom: dateFrom,
            dateTo: dateTo
        }
      })
      return response.data;

    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
      throw new Error("Problem z pobraniem danych. Spróbuj ponownie później.");
    }
  }

  export async function getLastUserAirData() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/air/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      return response.data;

    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
      throw new Error("Problem z pobraniem danych. Spróbuj ponownie później.");
    }
  }