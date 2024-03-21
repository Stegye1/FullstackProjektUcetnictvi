/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

/*
  Komponenta PersonIndex obsahuje seznam osob/firem.
*/

import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import PersonTable from "./PersonTable";
import FlashMessage from "../components/FlashMessage";


const PersonIndex = () => {
    const [persons, setPersons] = useState([]);

    const [deletedPersonName, setDeletedPersonName] = useState("");
    const [showFlashMessage, setShowFlashMessage] = useState(false);
   
    const deletePerson = async (id, name) => {
        try {
            await apiDelete("/api/persons/" + id);
            setDeletedPersonName(name);
            setShowFlashMessage(true)

            // Spustíme setTimeout pro skrytí FlashMessage po určité době
        setTimeout(() => {
            setShowFlashMessage(false);
        }, 1400); 

        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setPersons(persons.filter((item) => item._id !== id));
    };


    useEffect(() => {
        apiGet("/api/persons").then((data) => setPersons(data));

    }, []);

    return (
        <div>
            <h1>Seznam osob</h1>
            <PersonTable
                deletePerson={deletePerson}
                items={persons}
                label="Počet osob:"
            />

            {showFlashMessage && (
            <div className="bottom-flash-message">
                <FlashMessage
                    theme="success"
                    text={`Osoba ${deletedPersonName} byla úspěšně smazána.`}
                />
            </div>
        )}
        </div>
    );
};
export default PersonIndex;
