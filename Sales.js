/**
 * Komponenta pro zobrazení seznamu vystavených faktur pro dané IČ.
 * @returns {JSX.Element} vrací jsx pro zobrazení seznamu faktur
 */

import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import InvoiceTable from "../invoices/InvoiceTable";
import { useParams } from "react-router-dom";


const Sales = () => {
    const {identificationNumber} = useParams(); // parametr z URL obsahující identifikační číslo
    const [sales, setSales] = useState([]);     // stav pro seznam vystavených faktur
    

    // asynchronní funkce pro smazání faktury
    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/identification/" + identificationNumber + "/sales");
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        // aktualizace seznamu faktur po smazání
        setSales(sales.filter((item) => item._id !== id));
    };

    useEffect(() => {                   // načtení seznamu vystavených faktur pro zadané ič při načtení komponenty
    
        apiGet("/api/identification/" + identificationNumber + "/sales").then((data) => setSales(data) );
       
    }, []);

    return (
        <div>
            <h1>Seznam vystavených faktur (stejné IČ)</h1>
                <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={sales}
                label="Počet faktur:"
            />
        </div>
    );
};
export default Sales;