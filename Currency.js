// Komponenta definuje pevně danou skupinu hodnot, kterých může nabývat proměnná Currency.
// .freeze zajišťuje, že jinde v kódu nemůžeme do možností Currency zasahovat, pouze v této třídě.

const Currency = Object.freeze({
    CZK: 'CZK',
    EUR: 'EUR',
    
});

export default Currency;