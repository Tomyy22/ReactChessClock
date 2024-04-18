import React, { useState, useEffect } from "react";
import { useConfig } from "./configContext";
import Swal from "sweetalert2";
import "./Clock.css";

export const Clock = ({ onSettingsClick }) => {
  const { time } = useConfig();
  const { incremento } = useConfig();
  const { color } = useConfig();

  const [isWhiteActive, setIsWhiteActive] = useState(true);
  const [isBlackActive, setIsBlackActive] = useState(false);
  const [whiteTime, setWhiteTime] = useState(time);
  const [blackTime, setBlackTime] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [player, setPlayer] = useState("white");
  const warningTime = (time * 15) / 100;

  const alert = (win, lose) => {
    Swal.fire({
      title: `Se termino el tiempo de las ${lose} ganan las ${win}`,
      toast: true,
      position: "top",
      icon: "error",
    });
  };

  const closeToast = () => {
    Swal.close();
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (isBlackActive) {
          if (whiteTime > 0) {
            setWhiteTime((prevTime) => prevTime - 1);
          } else {
            setIsRunning(false);
          }
        } else {
          if (blackTime > 0) {
            setBlackTime((prevTime) => prevTime - 1);
          } else {
            setIsRunning(false);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isWhiteActive, whiteTime, blackTime]);

  const whiteElement = document.getElementById("white");
  const blackElement = document.getElementById("black");
  const menuElement = document.getElementById("menu");

  useEffect(() => {
    const handleWarning = () => {
      const whiteElement = document.getElementById("white");
      const blackElement = document.getElementById("black");
      const menuElement = document.getElementById("menu");

      if (whiteTime <= warningTime && isBlackActive) {
        whiteElement.classList.add("warning-color");
        menuElement.classList.add("warning-container");
      } else {
        menuElement.classList.remove("warning-container");
        whiteElement.classList.remove("warning-color");
      }

      if (blackTime <= warningTime && isWhiteActive) {
        blackElement.classList.add("warning-color");
        menuElement.classList.add("warning-container");
      }
    };

    const handleZeroTime = () => {
      if (whiteTime === 0) {
        setIsRunning(false);
        alert("Negras", "Blancas");
        whiteElement.classList.remove("warning-color");
        blackElement.classList.remove("warning-color");
        menuElement.classList.remove("warning-container");
      }
      if (blackTime === 0) {
        setIsRunning(false);
        alert("Blancas", "Negras");
        whiteElement.classList.remove("warning-color");
        blackElement.classList.remove("warning-color");
        menuElement.classList.remove("warning-container");
      }
    };

    handleWarning();
    handleZeroTime();
  }, [whiteTime, blackTime, isWhiteActive, isBlackActive]);

  const handleSwitch = (newPlayer) => {
    if (!isRunning) {
    } else if (newPlayer === 'white' && !isWhiteActive) {
      setWhiteTime((prevTime) => prevTime + incremento);
      setIsWhiteActive(true);
      setIsBlackActive(false);
    } else if (newPlayer === 'black' && !isBlackActive) {
      setBlackTime((prevTime) => prevTime + incremento);
      setIsBlackActive(true);
      setIsWhiteActive(false);
    }
  };

  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState);
    closeToast();
  };

  const handleReset = () => {
    setWhiteTime(time);
    setBlackTime(time);
    setIsRunning(false);
    setIsWhiteActive(true);
    setIsBlackActive(false);
    closeToast();
  };

  const handleSettingsClick = () => {
    setBlackTime(0);
    setWhiteTime(0);
    onSettingsClick();
    closeToast();
  };

  return (
    <>
      <section
        className="menu-container"
        id="menu"
        style={{ borderColor: color }}
      >
        <div className="timer-container">
          <h4 className="timer">
            Blancas {Math.floor(whiteTime / 60)}:
            {(whiteTime % 60).toString().padStart(2, "0")}
          </h4>
          <h4 className="timer">
            Negras {Math.floor(blackTime / 60)}:
            {(blackTime % 60).toString().padStart(2, "0")}
          </h4>
        </div>

        <div className="switch-button-container ">
          <button
            className={`${
              isWhiteActive ? "active" : ""
            } button switchs-buttons`}
            onClick={() => {
              setPlayer("white");
              setPlayer((newPlayer) => {
                handleSwitch(newPlayer);
                return newPlayer;
              });
            }}
            id="white"
            style={
              color !== "#aeae"
                ? { backgroundColor: color }
                : { backgroundColor: "rgba(129, 129, 129)" }
            }
          >
            Blancas
          </button>
          <button
            className={`${
              isBlackActive ? "active" : ""
            } button switchs-buttons`}
            onClick={() => {
              setPlayer("black");
              setPlayer((newPlayer) => {
                handleSwitch(newPlayer);
                return newPlayer;
              });
            }}
            id="black"
            style={
              color !== "#aeae"
                ? { backgroundColor: color }
                : { backgroundColor: "rgba(129, 129, 129)" }
            }
          >
            Negras
          </button>
        </div>

        <div className="button-container">
          <button
            className="button control-button"
            onClick={handleStartPause}
            style={
              color !== "#aeae"
                ? { backgroundColor: color }
                : { backgroundColor: "rgba(129, 129, 129)" }
            }
          >
            {isRunning ? "Pausa" : "Iniciar"}
          </button>
          <button
            className="button control-button"
            onClick={handleSettingsClick}
            style={
              color !== "#aeae"
                ? { backgroundColor: color }
                : { backgroundColor: "rgba(129, 129, 129)" }
            }
          >
            <ion-icon name="settings-outline"></ion-icon>
          </button>
          <button
            className="button control-button"
            onClick={handleReset}
            style={
              color !== "#aeae"
                ? { backgroundColor: color }
                : { backgroundColor: "rgba(129, 129, 129)" }
            }
          >
            Reset
          </button>
        </div>
      </section>
    </>
  );
};
