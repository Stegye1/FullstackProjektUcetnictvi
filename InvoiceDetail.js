/*
  Komponenta InvoiceDetail zobrazuje detail faktury na základě id získaného z URL.
*/

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {apiGet} from "../utils/api";
import Currency from "./Currency";

const InvoiceDetail = () => {
    const {id} = useParams();                       // získá hodnotu id z URL adresy
    const [invoice, setInvoice] = useState({});     //useState umožní komponentě invoice mít vnitřní stav = bližší informace o fa
                                                    //funkcí setInvoice můžeme tento stav nastavit

  useEffect(() => {
    async function getData() {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
    }
    getData();
    }, [id]);       //useEffect načítá data faktury, když se změní id v URL adrese

    const currency = Currency.CZK === invoice.currency ? "CZK" : "EUR";

    //jsx kód s detaily faktury, kt. bude vykreslen při použití komponenty InvoiceDetail:
    return (                
        <>
            <div>
                <h1>Detail faktury {id}</h1>
                <hr/>
  
                <p>
                    <strong>Číslo:   </strong>
                    {invoice.number}
                </p>
            
                <p>
                    <strong>Dodavatel:   </strong>
                    {invoice.supplier?.name}
                </p>    
  
                <p>
                    <strong>Odběratel:   </strong>
                    {invoice.customer?.name}
                </p>
          
                <p>
                    <strong>Datum vystavení:   </strong>
                    {invoice.issued}
                </p>
                <p>
                    <strong>Datum splatnosti:   </strong>
                    {invoice.dueDate}
                </p>
                <p>
                    <strong>Částka bez DPH:   </strong>
                    {invoice.price} {currency}
                </p>
                <p>
                    <strong>DPH:   </strong>
                    {((invoice.price*invoice.vat)/100).toFixed(2)} {currency} (sazba DPH: {invoice.vat} %)
                </p>
                <p>
                    <strong>Celková částka:   </strong>
                    {((invoice.price*100+invoice.price*invoice.vat)/100).toFixed(2)} {currency}
                </p>
                <p>
                    <strong>Produkt:   </strong>
                    {invoice.product} 
                </p>
                <p>
                    <strong>Poznámka:   </strong>
                    {invoice.note}
                </p>
            
            </div>
        </>
    );
};

export default InvoiceDetail; 