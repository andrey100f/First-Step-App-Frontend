import axios from "axios";

import { AnnouncementProps } from "./AnnouncementProps";
import { baseUrl, securityConfig } from "../utils/api";

export const getAnnouncements: (token: string) => Promise<AnnouncementProps[]> = async (token) => {
    try {
        let res = await axios.get(`${baseUrl}/announcements`, securityConfig(token));
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}
