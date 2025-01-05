import { BACKEND_URL } from "../constants/constants";
import axios from "axios";

export async function createNewSurvey(data){
  
    const token = localStorage.getItem("token");
    if(token == null) throw new Error("Brak autoryzacji");

    try{
        await axios.post(`${BACKEND_URL}/survey/create`, data, {
            headers:{
                "Authorization" : "Bearer " + token
            }
        })
    }catch(error){
        throw new Error("Problem z utworzeniem ankiety. Spróbuj ponownie później.");
    }
    
}

export async function getMySurveys(page, size, sort) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }
  
    try {
      const response = await axios.get(`${BACKEND_URL}/survey`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          size: size,
          sort: sort
        }
      })
      return response.data;

    } catch (error) {
      console.error("Błąd podczas pobierania ankiet:", error);
      throw new Error("Problem z pobraniem ankiet. Spróbuj ponownie później.");
    }
  }

  export async function getSurveyById(id) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }
  
    try {
      const response = await axios.get(`${BACKEND_URL}/survey/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data;

    } catch (error) {
      console.error("Błąd podczas pobierania ankiet:", error);
      throw new Error("Problem z pobraniem ankietY. Spróbuj ponownie później.");
    }
  }

  export async function updateSurvey(id, data){
  
    const token = localStorage.getItem("token");
    if(token == null) throw new Error("Brak autoryzacji");

    try{
        return await axios.put(`${BACKEND_URL}/survey/${id}`, data, {
            headers:{
                "Authorization" : "Bearer " + token
            }
        })
        .then(function (response) {
            return true;
        })
        .catch(function (error) {
          if(error.status == 406) return false;
          throw new Error(error);
        })
    }catch(error){
        throw new Error("Problem z zaktualizowaniem ankiety. Spróbuj ponownie później.");
    }
    
}

export async function sendingSurvey(data){
  
  const token = localStorage.getItem("token");
  if(token == null) throw new Error("Brak autoryzacji");

  try{
      await axios.post(`${BACKEND_URL}/survey/sending`, data, {
          headers:{
              "Authorization" : "Bearer " + token
          }
      })
  }catch(error){
      throw new Error("Problem z wysłaniem ankiety. Spróbuj ponownie później.");
  }
  
}

export async function sendSurveyResponse(data){
  
  const token = localStorage.getItem("token");
  if(token == null) throw new Error("Brak autoryzacji");

  try{
      await axios.post(`${BACKEND_URL}/survey/response`, data, {
          headers:{
              "Authorization" : "Bearer " + token
          }
      })
  }catch(error){
      throw new Error("Problem z wysłaniem ankiety. Spróbuj ponownie później.");
  }
  
}

export async function getSurveyAnswers(surveyLogId){
  
  const token = localStorage.getItem("token");
  if(token == null) throw new Error("Brak autoryzacji");

  try{
      const response = await axios.get(`${BACKEND_URL}/survey/response/${surveyLogId}`, {
          headers:{
              "Authorization" : "Bearer " + token
          }
      })
      return response.data;
      
  }catch(error){
      throw new Error("Problem z pobraniem odpowiedzi do ankiety. Spróbuj ponownie później.");
  }
  
}


export async function removeSurveyById(surveyId){
  
  const token = localStorage.getItem("token");
  if(token == null) throw new Error("Brak autoryzacji");

  try{
      const response = await axios.delete(`${BACKEND_URL}/survey/${surveyId}`, {
          headers:{
              "Authorization" : "Bearer " + token
          }
      })
      return response.data;
      
  }catch(error){
      throw new Error("Problem z usunięciem ankiety. Spróbuj ponownie później.");
  }
  
}

export async function getSurveyResults(surveyId){
  
  const token = localStorage.getItem("token");
  if(token == null) throw new Error("Brak autoryzacji");

  try{
      const response = await axios.get(`${BACKEND_URL}/survey/results/${surveyId}`, {
          headers:{
              "Authorization" : "Bearer " + token
          }
      })
      return response.data;
      
  }catch(error){
      throw new Error("Problem z pobraniem wyników ankiety. Spróbuj ponownie później.");
  }
  
}