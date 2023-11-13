import {AnnouncementProps} from "./AnnouncementProps";

const Announcement: React.FC<AnnouncementProps> = ({title, text, category, img}) => {
    return (
        <div>
            <p>{title}</p>
            <p>{text}</p>
            <p>{category}</p>
            <p>{img}</p>
            <hr/>
        </div>
    );
}

export default Announcement;