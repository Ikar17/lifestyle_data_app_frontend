import { BACKEND_URL } from "../constants/constants";
import axios from "axios";

export async function createNewSurvey(data){
  
    const token = localStorage.getItem("token");
    if(token == null) throw new Error("Brak autoryzacji");

    console.log(data);
    console.log(token);

    try{
        await axios.post(`${BACKEND_URL}/survey/create`, data, {
            headers:{
                "Authorization" : "Bearer " + token
            }
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
            throw new Error(error);
        })
    }catch(error){
        throw new Error("Problem z utworzeniem ankiety. Spróbuj ponownie później.");
    }
    
}

export async function getMySurveys() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }
  
    try {
      const response = await axios.get(`${BACKEND_URL}/survey`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("jestem", response.data); // Poprawione logowanie
      return response.data;

    } catch (error) {
      console.error("Błąd podczas pobierania ankiet:", error);
      throw new Error("Problem z pobraniem ankiet. Spróbuj ponownie później.");
    }
  }