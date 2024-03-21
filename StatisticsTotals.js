/**
 * Komponenta pro zobrazení celkových statistik hodnot faktur.
 * @param {Object} items Objekt obsahující celkové statistiky hodnot faktur
 * @returns {JSX.Element} Vrací jsx pro zobrazení celkových statistik hodnot faktur
 */

import React from "react";


const StatisticsTotals = ({items}) => {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th colSpan={6}>Hodnota faktur letošních: </th>
                    <th colSpan={6}>Hodnota faktur celkem:</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>EUR {((items.currentYearEURSum*100)/100).toFixed(2)}</td>
                        <td colSpan={4}>CZK {((items.currentYearCZKSum*100)/100).toFixed(2)}</td>
                        <td colSpan={2}>EUR {((items.allTimeEURSum*100)/100).toFixed(2)}</td>  
                        <td>CZK {((items.allTimeCZKSum*100)/100).toFixed(2)}</td>   
                    
                    </tr>
              
                </tbody>
            </table>
           
        </div>
    );
};

export default StatisticsTotals;
