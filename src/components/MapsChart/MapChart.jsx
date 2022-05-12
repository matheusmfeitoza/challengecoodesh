import React, { useEffect, useRef, memo } from "react";
import _ from "lodash";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const MapChart = ({ variantCases, datas, setTipTool }) => {
  const teste = variantCases.data.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.location === value.location)
  );
  const worldMapGeoLocalization =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

  const numTotalCasosDeCadaPais = (pais) => {
    const temp = teste.filter((p, index) => p.location === pais);
    return temp.reduce(
      (anterior, atual) => anterior + atual.num_sequences_total,
      0
    );
  };

  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
        <Geographies geography={worldMapGeoLocalization}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const info = geo.properties.NAME.slice(0, 13);
              const totalCasos = numTotalCasosDeCadaPais(info);
              // console.log(geo);
              return (
                <Geography
                  key={geo.properties.ABBREV}
                  geography={geo}
                  onMouseEnter={() => {
                    const total = numTotalCasosDeCadaPais(info);
                    teste.forEach((pais) =>
                      pais.location === info
                        ? setTipTool(
                            `Pais: ${teste.location || info} | ${
                              pais.num_sequences_total
                            }`
                          )
                        : null
                    );
                  }}
                  fill={
                    totalCasos <= 10
                      ? "#35e876"
                      : totalCasos < 300
                      ? "#DFE835"
                      : totalCasos <= 1500
                      ? "##EB1A01"
                      : "##F2C038"
                  }
                  stroke={"#fff"}
                  outline="none"
                  onMouseLeave={() => setTipTool("")}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
