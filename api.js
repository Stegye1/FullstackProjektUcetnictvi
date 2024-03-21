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
  API modul pro provádění HTTP požadavků na server.
  Definuje funkce pro provádění GET, POST, PUT a DELETE požadavků.
*/
const API_URL = "http://localhost:8080";

//fetchData je funkce pro provádění HTTP požadavků. Tato funkce provádí samotný HTTP požadavek pomocí funkce fetch 
// a zpracovává odpovědi a chyby.
const fetchData = (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;

    return fetch(apiUrl, requestOptions)
        .then((response) => {
            //// Ošetření chybových stavů odpovědi
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            if (requestOptions.method !== 'DELETE')
                return response.json();             //převedení odpovědi na json
        })
        .catch((error) => {
            throw error;
        });
};

// Funkce pro provádění GET požadavků
export const apiGet = (url, params) => {
    // Filtruje zadané parametry
    const filteredParams = Object.fromEntries(
        Object.entries(params || {}).filter(([_, value]) => value != null)
    );
    // Sestavení úplné URL s query parametry
    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;
    const requestOptions = {
        method: "GET",
    };
    // Provádění GET požadavku. Volá se funkce fetchData s vytvořenou URL adresou a nastaveními požadavku.
    return fetchData(apiUrl, requestOptions);
};

// Funkce pro provádění POST požadavků
export const apiPost = (url, data) => {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };
    // Provádění POST požadavku. Volá se funkce fetchData s vytvořenou URL adresou a nastaveními požadavku.
    return fetchData(url, requestOptions);
};

// Funkce pro provádění PUT požadavků
export const apiPut = (url, data) => {
    const requestOptions = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    };

    return fetchData(url, requestOptions);
};

// Funkce pro provádění DELETE požadavků
export const apiDelete = (url) => {
    const requestOptions = {
        method: "DELETE",
    };

    return fetchData(url, requestOptions);
};
