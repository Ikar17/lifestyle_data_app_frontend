import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { BACKEND_URL } from "../constants/constants";
import axios from "axios";

export default async function signup(data){

    let token = null;
    //firebase
    try{
        const email = data.get('email');
        const password = data.get('password');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        token = userCredential.user.accessToken;
        const uid = userCredential.user.uid;
        data.append("uid", uid);
    }catch(error){
        throw new Error("Użytkownik o podanym mailu już istnieje")
    }
    
    //backend
    try{
        const user = { };
        data.forEach((value, key) => {
            user[key] = value;
        });

        await axios.post(`${BACKEND_URL}/auth/signup`, user)
        .then(function (response) {})
        .catch(function (error) {
            throw new Error(error);
        })
    }catch(error){
        //todo usuwanie z firebase
        throw new Error("Problem z rejestracją. Spróbuj ponownie później.");
    }
    
    return token;
}