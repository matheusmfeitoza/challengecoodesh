import React, { useEffect, useRef } from "react";

const MapChart = ({ variantCases }) => {
  const newVariantArray = Array.from(variantCases);

  useEffect(() => {
    fetch("https://unpkg.com/world-atlas/countries-50m.json")
      .then((r) => r.json())
      .then((data) => {
        const countries = ChartGeo.topojson.feature(
          data,
          data.objects.countries
        ).features;

        const chart = new Chart(
          document.getElementById("canvas").getContext("2d"),
          {
            type: "choropleth",
            data: {
              labels: countries.map((d) => d.properties.name),
              datasets: [
                {
                  label: "Countries",
                  data: countries.map((d) => ({
                    feature: d,
                    value: variantCases.data[0].num_sequences,
                  })),
                },
              ],
            },
            options: {
              showOutline: true,
              showGraticule: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                xy: {
                  projection: "equalEarth",
                },
              },
            },
          }
        );
      });
  }, [variantCases.data[0].num_sequences]);

  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default MapChart;