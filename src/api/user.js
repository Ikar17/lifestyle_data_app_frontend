import { BACKEND_URL } from "../constants/constants";
import axios from "axios";
import { auth } from "../utils/firebaseConfig";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

export async function getUserDetails(){

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }

    console.log(token)
  
    try {
      const response = await axios.get(`${BACKEND_URL}/auth/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data;

    } catch (error) {
      throw new Error("Problem z pobraniem danych użytkownika. Spróbuj ponownie później.");
    }
}

export async function updateUserDetails(data){

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }

    try {
      await axios.put(`${BACKEND_URL}/auth`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    } catch (error) {
      throw new Error("Problem z aktualizacją danych. Spróbuj ponownie później.");
    }
}

export async function changePassword(oldPassword, newPassword){
    const user = auth.currentUser;
  
    try {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
    } catch (error) {
      throw new Error("Problem z aktualizacją hasła. Spróbuj ponownie później.");
    }
}

export async function deleteUserAccount(){
  
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Brak autoryzacji");
    }

    const user = auth.currentUser;

    try {
      await axios.delete(`${BACKEND_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      await deleteUser(user);

    } catch (error) {
      throw new Error("Problem z usuwaniem konta. Spróbuj ponownie później.");
    }
}