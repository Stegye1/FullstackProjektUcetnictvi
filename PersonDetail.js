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
  Komponenta PersonDetail zobrazuje detail osoby na základě id získaného z URL. Obsahuje tlačítka s odkazem na faktury
  vystavené a přijaté (ty se hledají podle stejného ič)
*/
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

import {apiGet} from "../utils/api";
import Country from "./Country";

const PersonDetail = () => {
    const {id} = useParams();       // získá hodnotu id z URL adresy
    const [person, setPerson] = useState({});    //useState umožní komponentě person mít vnitřní stav = bližší informace o osobě
                                                //funkcí setInvoice můžeme tento stav nastavit
   
   
    useEffect(() => {
        async function getData() {
            apiGet("/api/persons/" + id).then((data) => setPerson(data));
        }
         getData();
    }, [id]);           //useEffect načítá data osoby, když se změní id v URL adrese

    const country = Country.CZECHIA === person.country ? "Česká republika" : "Slovensko";

    //jsx kód s detaily osoby, kt. bude vykreslen při použití komponenty PersonDetail:
    return (
        <>
            <div>
                <h1>Detail osoby</h1>
                <hr/>
                <h3>{person.name} ({person.identificationNumber})</h3>
                <p>
                    <strong>DIČ:</strong>
                    <br/>
                    {person.taxNumber}
                </p>
                <p>
                    <strong>Bankovní účet:</strong>
                    <br/>
                    {person.accountNumber}/{person.bankCode} ({person.iban})
                </p>
                <p>
                    <strong>Tel.:</strong>
                    <br/>
                    {person.telephone}
                </p>
                <p>
                    <strong>Mail:</strong>
                    <br/>
                    {person.mail}
                </p>
                <p>
                    <strong>Sídlo:</strong>
                    <br/>
                    {person.street}, {person.city},
                    {person.zip}, {country}
                </p>
                <p>
                    <strong>Poznámka:</strong>
                    <br/>
                    {person.note}
                </p>
                <br/>
                <Link to={"/sales/" + person.identificationNumber} className="btn btn-success">
                Vystavené faktury    
                </Link>
                <h6>  </h6>
                <Link to={"/purchases/" + person.identificationNumber} className="btn btn-success">
                Přijaté faktury
                </Link>
            </div>
        </>
    );
};

export default PersonDetail;
