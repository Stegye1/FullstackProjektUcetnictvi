/**
 * Komponenta pro zobrazení seznamu přijatých faktur pro dané IČ.
 * @returns {JSX.Element} vrací jsx pro zobrazení seznamu faktur
 */

import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import InvoiceTable from "../invoices/InvoiceTable";
import { useParams } from "react-router-dom";


const Purchases = () => {
    const {identificationNumber} = useParams();
    const [purchases, setPurchases] = useState([]);
    


    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/identification/" + identificationNumber + "/purchases");
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setPurchases();
    };

    useEffect(() => {
    
        apiGet("/api/identification/" + identificationNumber + "/purchases").then((data) => setPurchases(data) );
       
    }, []);

    
    return (
        <div>
            <h1>Seznam přijatých faktur (stejné IČ)</h1>
                <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={purchases}
                label="Počet faktur:"
            />
        </div>
    );
};
export default Purchases;