/*
  Komponenta InvoiceIndex obsahuje tabulku se seznamem faktur, filtruje je na základě zadaných parametrů.
*/
import React, {useEffect, useState} from "react";
import {apiDelete, apiGet} from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter"
import FlashMessage from "../components/FlashMessage";

// Stavy pro uchování seznamu faktur, seznamu dodavatelů, seznamu odběratelů a stavu filtru
const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [personList, setPersonList] = useState([]);
    const [filterState, setFilter] = useState({
      supplierId: undefined,
      customerId: undefined,
      product: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      limit: undefined,
    });
    const [deletedInvoiceNumber, setDeletedInvoiceNumber] = useState(null);
    const [showFlashMessage, setShowFlashMessage] = useState(false);
    
    // Funkce pro mazání faktur    
    const deleteInvoice = async (id, number) => {
        try {
            await apiDelete("/api/invoices/" + id);
            setDeletedInvoiceNumber(number);
            setShowFlashMessage(true);

        // Spustíme setTimeout pro skrytí FlashMessage po určité době
        setTimeout(() => {
            setShowFlashMessage(false);
        }, 1400); 
            
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    // Načítání dat faktur, seznamu dodavatelů a seznamu odběratelů při načtení komponenty
    useEffect(() => {
        apiGet("/api/invoices").then((data) => setInvoices(data));
        apiGet("/api/persons").then((data) => setPersonList(data));
               
    }, []);

    // Funkce pro změnu stavu filtru    
    const handleChange = (e) => {
        // pokud vybereme prázdnou hodnotu (máme definováno jako true/false/'' v komponentách), nastavíme na undefined
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return {...prevState, [e.target.name]: undefined}
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value}
            });
        }
    };
    
    // Funkce pro odeslání formuláře s filtrem
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;
        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };

  
return (
    <div>
        <h1>Seznam faktur</h1>
        <hr />
        <InvoiceFilter
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            supplierList={personList}
            customerList={personList}
            filter={filterState}
            confirm="Filtrovat faktury"
        />
        <hr />
        
        <InvoiceTable
            deleteInvoice={deleteInvoice}
            items={invoices}
            label="Počet faktur:"
        />

     
        {showFlashMessage && (
            <div className="bottom-flash-message">
                <FlashMessage
                    theme="success"
                    text={`Faktura č. ${deletedInvoiceNumber} byla úspěšně smazána.`}
                />
            </div>
        )}
    </div>
);
}

export default InvoiceIndex;