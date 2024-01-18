import { FacultyProps } from "../faculty/FacultyProps";

//Interfata pentru Universitati
export interface UniversityProps {
  universityId: number;
  name: string;
  img: string;
  faculties: FacultyProps[];
}
