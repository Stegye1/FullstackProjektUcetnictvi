/*
  Komponenta InvoiceForm slouží k vytváření a úpravě faktur.
*/
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import InputCheck from "../components/InputCheck";
import FlashMessage from "../components/FlashMessage";
import InputSelect from "../components/InputSelect";

import Currency from "./Currency";


const InvoiceForm = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    // Stavy pro uchování dat faktury, stavů odeslání a úspěchu a seznamu osob
    const [invoice, setInvoice] = useState({
        number: "",
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        currency: Currency.CZK,
        vat: "",
        note: "",
        supplier:{_id:0},
        customer:{_id:0},
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [personList, setPersonList] = useState([]);

    // Načítání seznamu osob při načtení komponenty a načítání dat faktury, pokud jde o změnu (známe id)
    useEffect(() => {
        if (id) {
            apiGet("/api/invoices/" + id).then((data) => {
                
                setInvoice(data);
                
            });
        }
        apiGet('/api/persons').then((data) => setPersonList(data));
                       
    }, [id]);
           
            
    //funkce pro odeslání formuláře (událost submit, kterou vyvolá tlačítko typu submit)
    const handleSubmit = (e) => {       
        e.preventDefault();
        //rozhodnutí, jestli PUT nebo POST       
        (id ? apiPut("/api/invoices/" + id, invoice) : apiPost("/api/invoices", invoice)) 
            .then((data) => {
                setSent(true);
                setSuccess(true);
                
                setTimeout(() =>   {    //setTimeout odloží přesměrování, aby se dala přečíst FlashMessage
                navigate("/invoices");
                }, 1400);

            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };


    const sent = sentState;
    const success = successState;

    return (                //jsx kód, který se vykreslí při použití komponenty
        <div>
            <h1>{id ? "Upravení" : "Vytvoření nové"} faktury</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <div className="bottom-flash-message">
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <InputField 
                    required={true}
                    type="text"
                    name="number"
                    min="1"                   
                    label="Číslo faktury"
                    prompt="Zadejte číslo faktury"
                    value={invoice.number}
                    handleChange={(e) => {
                        setInvoice({...invoice, number: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení"
                    prompt="Zadejte datum vystavení faktury"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Výrobek nebo služba"
                    prompt="Zadejte výrobek nebo službu"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({...invoice, product: e.target.value});
                    }}
                />

                <InputField
                    required={true}
                    type="number"
                    name="price"
                    step={0.1}           
                    label="Cena bez DPH"
                    prompt="Zadejte cenu bez DPH"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({...invoice, price: e.target.value});
                    }}
                />


                <h6>Měna:</h6>
                <InputCheck 
                    type="radio"
                    name="currency"
                    label="EUR"
                    value={Currency.EUR}
                    handleChange={(e) => {
                        setInvoice({...invoice, currency: e.target.value});
                }}
                checked={Currency.EUR === invoice.currency}
                />   

                <InputCheck 
                    type="radio"
                    name="currency"
                    label="CZK"
                    value={Currency.CZK}
                    handleChange={(e) => {
                        setInvoice({...invoice, currency: e.target.value});
                    }}
                    checked={Currency.CZK === invoice.currency}
                />


                <InputField
                    required={true}
                    type="number"
                    name="vat"
                    min="0"
                    label="Sazba DPH"
                    prompt="Zadejte sazbu DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                />

                <InputField
                    required={false}
                    type="text"
                    name="note"
                    label="Poznámka"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({...invoice, note: e.target.value});
                    }}
                />

                <InputSelect                    
                    name="supplier"
                    items={personList}
                    label="Dodavatel"
                    prompt="Vyberte dodavatele"
                    value={invoice.supplier._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, supplier: {_id: e.target.value}});
                    }}
                />

                <InputSelect                    
                    name="customer"
                    items={personList}
                    label="Odběratel"
                    prompt="Vyberte odběratele"
                    value={invoice.customer._id}
                    handleChange={(e) => {
                        setInvoice({...invoice, customer: {_id: e.target.value}});
                    }}
                />
                
                <br/>               
                <input type="submit" className="btn btn-primary" value="Uložit"/>
            </form>
        </div>                     
    );
};

export default InvoiceForm;
