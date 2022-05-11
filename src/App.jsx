import { useState, useEffect } from "react";
import axios from "axios";
import { Slider } from "@mui/material";
import MapChart from "./components/MapsChart/MapChart";

//StyledComponent Imports
import { SliderStyle } from "./styles/SliderStyle";
import { MapChartStyle } from "./styles/MapChartStyle";

// Functional code
import { marks } from "./components/Marks/Marks";
import { ColorizeSharp } from "@mui/icons-material";

export function App() {
  //States
  const [dados, setDados] = useState(null);
  const [mark, setMark] = useState(marks[0]);

  // Submit event
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  // OnChange event
  const handleSliderOnChange = (_, value) => {
    const selectedMark = marks.find((mark) => mark.value === value);
    setMark(selectedMark);
  };

  // Effect, load page and bring info
  useEffect(() => {
    axios
      .get("http://localhost:3000/covid", {
        params: {
          _sort: "date",
          _order: "asc",
          date_gte: mark.interval.start,
          date_lte: mark.interval.end,
        },
      })
      .then((r) => setDados(r));
  }, [mark.interval.start, mark.interval.end]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Covid Daily Cases</h1>
      <form onSubmit={handleSubmit}>
        <SliderStyle>
          <Slider
            aria-label="Custom marks"
            defaultValue="0"
            valueLabelFormat={mark.interval.start}
            value={mark.value}
            step={25}
            valueLabelDisplay="auto"
            marks={marks}
            onChange={handleSliderOnChange}
          />
        </SliderStyle>
        <MapChartStyle>
          {dados && <MapChart variantCases={dados} />}
        </MapChartStyle>
      </form>
    </div>
  );
}
