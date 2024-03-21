/**
 * Komponenta pro zobrazení statistik vystavených faktur podle firem a celkových statistik.
 * Získává data pomocí API a zobrazuje je pomocí podkomponent StatisticsTable a StatisticsTotals.
 * Vrací jsx pro zobrazení statistik vystavených faktur podle firem a celkových statistik
 */

import React, {useEffect, useState} from "react";

import {apiGet} from "../utils/api";
import StatisticsTable from "./StatisticsTable";
import StatisticsTotals from "./StatisticsTotals";

const StatisticsIndex = () => {             
                                            // nastavení stavů statistik
    const [statistics, setStatistics] = useState([]);
    const [statisticsTotal, setStatisticsTotal] = useState([]);

    useEffect(() => {                       // načtení dat statistik
        apiGet("/api/persons/statistics").then((data) => setStatistics(data));
        apiGet("/api/invoices/statistics").then((data) => setStatisticsTotal(data));

    }, []);

    return (
        <div className = "statistics">
            <h1>Statistiky vystavených faktur podle firem (bez DPH)</h1>
            <StatisticsTable
                items={statistics}
                label="Počet osob:"
            />
            <h1>Celkem (bez DPH)</h1>
            <StatisticsTotals
            items={statisticsTotal}
            />
            <h4>V evidenci je {statisticsTotal.allInvoicesCount} faktur.</h4>
        </div>
    );
};
export default StatisticsIndex;
