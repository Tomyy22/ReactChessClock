import { useState } from "react";
import { useConfig } from "./configContext";
import Swal from "sweetalert2";
import "./Config.css";

export const Config = ({ onStartClick }) => {
  const { time, setTime, incremento, setIncremento, color, setColor } =
    useConfig();
  const [toastHasValue, setToastHasValue] = useState(true);

  const closeToast = () => {
    Swal.close();
  };

  const handleStartClick = (e) => {
    e.preventDefault();
    if (isNaN(time) || time === 0) {
      Swal.fire({
        title: "Ingrese Un Tiempo",
        input: "radio",
        color: "#000",
        toast: true,
        position: "top",
        icon: "error",
      });
    } 
    else if (isNaN(incremento)) {
      Swal.fire({
        title: "Ingrese un valor para incremento",
        input: "radio",
        color: "#000",
        toast: true,
        position: "top",
        icon: "error",
      });
    }
    else if (toastHasValue === false) {
      Swal.fire({
        title: "Eliga Un Color",
        color: "#000",
        toast: true,
        position: "top",
        icon: "error",
      });
    } else {
      onStartClick();
    }
  };

  const handleTime = (e) => {
    const newValue = parseInt(e.target.value);
    setTime(newValue);
  };

  const handleIncremento = (e) => {
    const newIncrementValue = parseInt(e.target.value);
    setIncremento(newIncrementValue);
  };

  const handleColor = (e) => {
    e.preventDefault();
    setToastHasValue(false);
    (async () => {
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            "#CCA7A2": "Rosa",
            "#E1EFF6": "Blanco",
            "#DCE2AA": "Vainilla",
            "#B57F50": "Cobre",
            "#F6828C": "Coral",
            "#878787": "Gris",
            "#aeae": "Default",
          });
        }, 1000);
      });

      const { value: color } = await Swal.fire({
        title: "Selecionar Color",
        input: "radio",
        color: "#000",
        toast: true,
        position: "top",
        inputOptions: inputOptions,
      });

      if (color) {
        setColor(color);
        setToastHasValue(true);
      }
    })();
  };
  return (
    <>
      <section className="menu-container">
        <form className="form">
          <label>
            <h4>
              <span className="spanText">Tiempo (s)</span>
            </h4>
            <input
              type="number"
              className="input"
              id="tiempo"
              min={0}
              onChange={handleTime}
              value={time}
            />
          </label>
          <label>
            <h4>
              <span className="spanText">Incremento (s)</span>
            </h4>
            <input
              type="number"
              className="input"
              min={0}
              onChange={handleIncremento}
              value={incremento}
            />
          </label>
          <br />
          <button className="button" id="comenzar" onClick={handleColor}>
            Elegir Color
          </button>
          <br />
          <button className="button" id="comenzar" onClick={handleStartClick}>
            Comenzar
          </button>
        </form>
      </section>
    </>
  );
};
