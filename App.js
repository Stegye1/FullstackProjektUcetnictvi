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
 * Komponenta App slouží jako kořenová komponenta pro celou aplikaci.
* Používá React Router pro navigaci mezi různými stránkami a zajišťuje zobrazení správného obsahu
* na základě aktuální URL adresy.
*/
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";
import InvoiceIndex from "./invoices/InvoiceIndex";       
import InvoiceDetail from "./invoices/InvoiceDetail";
import InvoiceForm from "./invoices/InvoiceForm";
import StatisticsIndex from "./statistics/StatisticsIndex";
import Sales from "./persons/Sales";
import Purchases from "./persons/Purchases";
import "./index.css";

export function App() {
  return (
    <div className="App">
    <Router>
      <div className="container">
        {/* Navigační lišta */}
        <nav className="navbar navbar-light bg-light table-hover navbar-background">
          <ul className="navbar-nav mr-auto">
            {/* Tlačítko pro navigaci na stránku osob */}
            <li className="nav-item">
              <button> 
                <Link to={"/persons"} className="nav-link">
                Osoby
              </Link> 
              </button>
            </li>
             {/* Tlačítko pro navigaci na stránku faktur */}
            <li className="nav-item">
            <button>
              <Link to={"/invoices"} className="nav-link">    
                Faktury
              </Link>
              </button>
            </li>  
             {/* Tlačítko pro navigaci na stránku statistik */}
            <li className="nav-item">
            <button>
              <Link to={"/statistics"} className="nav-link">    
                Statistiky
              </Link>
              </button>
            </li>  
          </ul>
        </nav>

        {/* Definice jednotlivých cest a komponent pro zobrazení */}
        <Routes>
          <Route index element={<Navigate to={"/persons"} />} />
          <Route path="/persons">
            <Route index element={<PersonIndex />} />
            <Route path="show/:id" element={<PersonDetail />} />
            <Route path="create" element={<PersonForm />} />
            <Route path="edit/:id" element={<PersonForm />} />
            
          </Route>

          <Route path="/invoices">
            <Route index element={<InvoiceIndex />} />
            <Route path="show/:id" element={<InvoiceDetail />} />
            <Route path="create" element={<InvoiceForm />} />
            <Route path="edit/:id" element={<InvoiceForm />} />
          </Route>
         
            <Route path="/sales/:identificationNumber" element={<Sales />} />

            <Route path="/purchases/:identificationNumber" element={<Purchases/>}/>

            <Route path="/statistics" element={<StatisticsIndex/>}/>
            

        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
