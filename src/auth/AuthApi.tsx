import axios from "axios";

const authUrl = "http://localhost:8080/api/auth"

export interface AuthProps {
    token: string
}

export const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const login: (email?: string, password?: string) => Promise<AuthProps> = async (email, password) => {
    try {
        let res = await axios.post(`${authUrl}/authenticate`, {email, password}, config);
        return Promise.resolve(res.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
}

export const register: (name?: string, email?: string, password?: string, university?: string, faculty?: string) => Promise<AuthProps> = async (name, email, password, university, faculty) => {
    try {
        let res = await axios.post(`${authUrl}/register`, {name, email, password, university, faculty}, config);
        return Promise.resolve(res.data);
    }
    catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}