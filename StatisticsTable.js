/**
 * Komponenta StatisticsTable zobrazuje tabulku se statistikami.
 * 
 * @param {string} label - Popisek tabulky.
 * @param {Array} items - Seznam položek pro zobrazení v tabulce.
 * @returns {JSX.Element} - vrací jsx obsahující tabulku se statistikami.
 */

import React from "react";

const StatisticsTable = ({label, items}) => {
    return (
        <div>
            <p>
                {label} {items.length}
            </p>

            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Jméno</th>
                    <th colSpan={3}>Hodnota faktur v EUR</th>
                    <th colSpan={3}>Hodnota faktur v CZK</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td colSpan={3}>{((item.totalSumEUR*100)/100).toFixed(2)}</td>
                        <td>{((item.totalSumCZK*100)/100).toFixed(2)}</td>     
                    
                    </tr>
                ))}
                </tbody>
            </table>
           
        </div>
    );
};

export default StatisticsTable;
