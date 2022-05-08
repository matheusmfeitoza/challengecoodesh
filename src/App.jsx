import { useState } from "react";
import * as ChartGeo from "chartjs-chart-geo";

export function App() {
  const [dados, setDados] = useState(null);
  const [getInputvalue, setGetInputValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/covid");
    const date = await response.json();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={getInputvalue}
          onChange={(event) => {
            setGetInputValue(event.target.value);
          }}
        />
        <input type="range" min="100" max="200" />
        <button>Buscar dados</button>
      </form>
      {dados && dados.map((item) => {})}
    </div>
  );
}
