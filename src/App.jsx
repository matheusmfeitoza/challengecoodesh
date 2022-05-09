import { useState, useEffect } from "react";
import axios from "axios";
import { Slider } from "@mui/material";

const marks = [
  {
    value: 0,
    label: "jan/2020",
    interval: {
      start: "2021-04-05",
      end: "2021-05-05",
    },
  },
  {
    value: 25,
    label: "jul/2020",
    interval: {
      start: "2021-06-05",
      end: "2021-07-05",
    },
  },
  {
    value: 55,
    label: "jan/2021",
    interval: {
      start: "2021-08-05",
      end: "2021-09-05",
    },
  },
  {
    value: 75,
    label: "jul/2021",
    interval: {
      start: "2021-10-05",
      end: "2021-12-05",
    },
  },
  {
    value: 100,
    label: "jan/2022",
    interval: {
      start: "2022-01-05",
      end: "2022-02-05",
    },
  },
];
export function App() {
  let today = new Date();
  const [dados, setDados] = useState(null);
  const [getInputvalue, setGetInputValue] = useState("");
  const [mark, setMark] = useState(marks[0]);

  const valuetext = (value) => {
    return `${value}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleSliderOnChange = (_, value) => {
    console.log(value);
    const selectedMark = marks.find((mark) => mark.value === value);
    setMark(selectedMark);
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/covid", {
        params: {
          _sort: "date",
          _order: "asc",
          _limit: 10,
          date_gte: mark.interval.start,
          date_lte: mark.interval.end,
        },
      })
      .then((r) => console.log(r));
  }, [mark.interval.start, mark.interval.end]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button>teste</button>
        <button>teste</button>
        <button>teste</button>
        <Slider
          aria-label="Custom marks"
          defaultValue="0"
          getAriaValueText={(currentMark) => currentMark.label}
          step={0}
          value={mark.value}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={handleSliderOnChange}
        />
        <button>Buscar dados</button>
      </form>
    </div>
  );
}
