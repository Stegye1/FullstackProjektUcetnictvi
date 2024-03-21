/*
Komponenta zobrazuje tabulku s fakturami a tlačítka pro zobrazení, editaci, vytvoření či smazání faktury.
*/
import React from "react";
import {Link} from "react-router-dom";

const InvoiceTable = ({label, items, deleteInvoice}) => {
    

    return (                //jsx kód, který se vykreslí při použití komponenty
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Číslo faktury</th>
                    <th>Dodavatel</th>
                    <th>Odběratel</th>
                    <th>Vystavena</th>
                    <th>Celková částka</th>
                    <th>Měna</th>
                    <th>Splatnost</th>
                    <th colSpan={3}>Akce</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.number}</td>
                        <td>{item.supplier.name}</td>
                        <td>{item.customer.name}</td>
                        <td>{item.issued}</td>
                        <td>{((item.price*100+item.price*item.vat)/100).toFixed(2)}</td>       
                        <td>{item.currency}</td>
                        <td>{item.dueDate}</td>
                        
                        <td>
                            <div className="btn-group">
                                <Link
                                    to={"/invoices/show/" + item._id}
                                    className="btn btn-sm btn-info"
                                >
                                    Zobrazit
                                </Link>
                                <Link
                                    to={"/invoices/edit/" + item._id}
                                    className="btn btn-sm btn-warning"
                                >
                                    Upravit
                                </Link>
                                <button
                                    onClick={() => deleteInvoice(item._id, item.number)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Odstranit
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to={"/invoices/create"} className="btn btn-success">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;
