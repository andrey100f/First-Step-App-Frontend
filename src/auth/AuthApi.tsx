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