import {AnnouncementProps} from "./AnnouncementProps";
import axios from "axios";

const baseUrl = `http://localhost:8080/api/announcements`;

export const getAnnouncements: () => Promise<AnnouncementProps[]> = async () => {
    try {
        let res = await axios.get(baseUrl);
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}