import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../../APIs";

import styles from "./Chart.module.css";

const Chart = ({
	data: {
		data: { confirmed, recovered, deaths },
		country,
	},
}) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		(async function () {
			const response = await fetchDailyData();
			setDailyData(response);
		})();
	}, []);

	const lineChart = dailyData.length ? (
		<Line
			data={{
				labels: dailyData.map(({ reportDate }) => reportDate),
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed.total),
						label: "Infected",
						borderColor: "#3333ff",
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths.total),
						label: "Deaths",
						borderColor: "red",
						backgroundColor: "rgba(255,0,0,0.5)",
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ["Infected", "Recovered", "Deaths"],
				datasets: [
					{
						label: "People",
						backgroundColor: ["yellow", "green", "red"],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legends: { display: false },
				title: { display: true, text: `Current state in ${country}` },
			}}
		></Bar>
	) : null;

	return (
		<div className={styles.container}>{country ? barChart : lineChart}</div>
	);
};

export default Chart;
