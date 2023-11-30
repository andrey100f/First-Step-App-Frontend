import React, {useContext, useState} from "react";
import {UniversityProps} from "./UniversityProps";
import {UniversityContext} from "./UniversityProvider";
import {IonContent, IonList, IonPage, IonSearchbar} from "@ionic/react";
import University from "./University";
import "./styles/main.css"

const UniversityList: React.FC<UniversityProps> = () => {
    const {universities, fetching, fetchingError} = useContext(UniversityContext);
    const [searchUniversity, setSearchUniversity] = useState<string>("");

    return (
        <IonPage>
            <IonContent>
                <IonSearchbar className="ion-padding page" value={searchUniversity} debounce={500} onIonChange={e => setSearchUniversity(e.detail.value!)}
                              animated={true} placeholder="Search"></IonSearchbar>

                <IonList className="page">
                    {universities
                        ?.filter(university =>
                            university.name.toLowerCase().indexOf(searchUniversity.toLowerCase()) >= 0)
                        .map(({universityId, name, img}) => (
                            <University key={universityId} universityId={universityId} name={name} img={img} />
                        ))
                    }
                </IonList>

                {fetchingError && (
                    <div>{fetchingError.message || "Failed to fetch items"}</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default UniversityList;