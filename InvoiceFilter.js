/*
  Komponenta InvoiceFilter nastavuje filtr pro filtrování faktur na základě požadavků nastavených uživatelem.
*/

import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField"


const InvoiceFilter = (props) => {

  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  const filter = props.filter;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <InputSelect
            name="supplierId"
            items={props.supplierList}
            handleChange={handleChange}
            label="Dodavatel"
            prompt="nevybrán"
            value={filter.supplierId}
          />
        </div>
        <div className="col">
          <InputSelect
            name="customerId"
            items={props.customerList}
            handleChange={handleChange}
            label="Odběratel"
            prompt="nevybrán"
            value={filter.customerId}
          />
        </div>
        <div className="col">
          <InputField
            name="product"
            type="text"
            min="3"
            handleChange={handleChange}
            label="Výrobek nebo služba"
            prompt="(nevybráno)"
            value={filter.product ? filter.product : ""}
            
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <InputField
            type="number"
            name="minPrice"
            handleChange={handleChange}
            label="Minimální cena"
            prompt="(neuvedena)"
            value={filter.minPrice ? filter.minPrice : ""}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            name="maxPrice"
            handleChange={handleChange}
            label="Maximální cena"
            prompt="(neuvedena)"
            value={filter.maxPrice ? filter.maxPrice : ""}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            name="limit"
            handleChange={handleChange}
            label="Limit počtu faktur"
            prompt="(20)"
            value={filter.limit ? filter.limit : ""}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-secondary float-right mt-2"
            value={props.confirm}
          />
        </div>
      </div>
    </form>
  );
};

export default InvoiceFilter;
