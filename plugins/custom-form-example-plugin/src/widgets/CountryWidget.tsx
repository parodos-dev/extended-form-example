import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { Widget } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";
import { JsonObject } from '@backstage/types';
// Define types for country and city options
interface Option {
  label: string;
  value: string;
}
// Material-UI v4 Country Widget with Types
const CountryWidget: Widget<JsonObject, JSONSchema7, any> = ({ value, onChange }) => {
  const [countries, setCountries] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json() as unknown as any[];    
      const countryOptions: Option[] =  data.map((country: any) => ({
        label: country.name.common,
        value: country.name.common,
      })).sort(({label: label1}, {label: label2}) => label1.localeCompare(label2));
      setCountries(countryOptions);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert("Failed to fetch contries");
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCountries();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {    
    onChange(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Select Country</InputLabel>
      <Select value={value || ""} onChange={handleChange} label="Select Country">        
        {!loading &&
          countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};



export default CountryWidget;