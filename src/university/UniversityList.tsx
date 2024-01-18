import React, { useContext, useState } from "react";
import {
  IonContent,
  IonList,
  IonLoading,
  IonPage,
  IonSearchbar,
} from "@ionic/react";

import { UniversityProps } from "./UniversityProps";
import { UniversityContext } from "./UniversityProvider";
import { University } from "./University";

import "../utils/styles/main.css";

/**
 * Componenta UniversityList afișează o listă de universități și include o funcționalitate de căutare.
 * @returns Componenta React pentru afișarea listei de universități.
 */
export const UniversityList: React.FC<UniversityProps> = () => {
  const { universities, fetching, fetchingError } =
    useContext(UniversityContext);
  const [searchUniversity, setSearchUniversity] = useState<string>("");

  return (
    <IonPage>
      <IonContent>
        {/* Componenta IonSearchbar oferă o interfață de căutare în timp real. */}
        <IonSearchbar
          className="ion-padding page"
          value={searchUniversity}
          debounce={500}
          onIonChange={(e) => setSearchUniversity(e.detail.value!)}
          animated={true}
          placeholder="Search"
        ></IonSearchbar>

        {/*<IonLoading isOpen={fetching} message="Fetching Items" />*/}

        {/* Se afișează lista de universități filtrată în funcție de rezultatele căutării. */}
        <IonList className="page">
          {universities
            ?.filter(
              (university) =>
                university.name
                  .toLowerCase()
                  .indexOf(searchUniversity.toLowerCase()) >= 0
            )
            .map(({ universityId, name, img, faculties }) => (
              <University
                key={universityId}
                universityId={universityId}
                name={name}
                img={img}
                faculties={faculties}
              />
            ))}
        </IonList>

        {fetchingError && (
          <div>{fetchingError.message || "Failed to fetch items"}</div>
        )}
      </IonContent>
    </IonPage>
  );
};
