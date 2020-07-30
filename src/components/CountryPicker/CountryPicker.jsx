import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../../APIs";

import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		(async () => {
			setCountries(await fetchCountries());
		})();
	}, []);

	return (
		<FormControl className={styles.container}>
			<NativeSelect
				defaultValue=""
				onChange={(e) => handleCountryChange(e.target.value)}
			>
				<option value="global">Global</option>
				{countries.map((country, i) => (
					<option key={i} value={country.iso2}>
						{country.name}
					</option>
				))}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;
