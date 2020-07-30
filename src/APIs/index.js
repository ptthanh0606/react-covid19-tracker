import Axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
	let changableUrl = url;

	if (country) {
		changableUrl = `${url}/countries/${country}`;
	}
	try {
		const {
			data: { confirmed, recovered, deaths, lastUpdate },
		} = await Axios.get(changableUrl);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {}
};

export const fetchDailyData = async () => {
	try {
		const { data } = await Axios.get(`${url}/daily`);

		const modifiedResponse = data.map(({ confirmed, deaths, reportDate }) => ({
			confirmed,
			deaths,
			reportDate,
		}));

		return modifiedResponse;
	} catch (error) {}
};

export const fetchCountries = async () => {
	try {
		const {
			data: { countries },
		} = await Axios.get(`${url}/countries`);

		const modifiedResponse = countries.map(({ name, iso2 }) => ({
			name,
			iso2,
		}));

		return modifiedResponse;
	} catch (error) {}
};
