import {AnnouncementProps} from "./AnnouncementProps";
import axios from "axios";

const baseUrl = `http://localhost:8080/api/announcements`;

export const getAnnouncements: (token: string) => Promise<AnnouncementProps[]> = async (token) => {
    try {
        let res = await axios.get(baseUrl, authConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const authConfig = (token?: string) => ({
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
});