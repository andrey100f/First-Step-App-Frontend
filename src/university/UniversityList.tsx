import React, {useContext} from "react";
import {UniversityProps} from "./UniversityProps";
import {UniversityContext} from "./UniversityProvider";
import {IonContent, IonList, IonPage} from "@ionic/react";
import University from "./University";
import "./styles/main.css"

const UniversityList: React.FC<UniversityProps> = () => {
    const {universities, fetching, fetchingError} = useContext(UniversityContext);

    return (
        <IonPage>
            <IonContent>
                <IonList className="page">
                    {universities?.map(({universityId, name, img}) => (
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