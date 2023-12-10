import {FacultyProps} from "../faculty/FacultyProps";

export interface UniversityProps {
    universityId: number;
    name: string;
    img: string;
    faculties: FacultyProps[];
}
