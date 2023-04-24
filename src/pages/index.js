import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import NotInstalled from "@/components/NotInstalled";

const Home = () => {
  // create a timer 25 to 0 seconds
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [sound, setSound] = useState(null);
  const [cycle, setCycle] = useState(1);
  const [standAlone, setStandAlone] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  useEffect(() => {
    if (timer === 0 && !isBreak) {
      setIsActive(false);
      setIsBreak(true);
      setTimer(5 * 60);
      if (sound) {
        sound.play();
      }
    }
  }, [timer, isBreak, sound]);

  useEffect(() => {
    if (timer === 0 && isBreak) {
      setIsActive(false);
      setIsBreak(false);
      setIsWork(true);
      setCycle(cycle + 1);
      setTimer(0.2 * 60);
      if (sound) {
        sound.play();
      }
    }
  }, [timer, isBreak, sound]);

  //covert seconds to minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  // secons 2 digits
  const seconds2digits = (seconds) => {
    return seconds < 10 ? "0" + seconds : seconds;
  };

  //handle play and pause
  const handlePlayPause = () => {
    setIsActive(!isActive);
    const newSound = new Howl({
      src: ["/success.mp3"],
      volume: 1.0,
      onloaderror: (error) => console.error("Erro ao carregar o áudio:", error),
    });

    setSound(newSound);
  };

  //handle reset
  const handleReset = () => {
    setTimer(25 * 60);
    setIsActive(false);
    setIsBreak(false);
    setIsWork(false);
    setCycle(0);
  };

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setStandAlone(true);
    }
  }, []);

  return (
    <>
      {standAlone ? (
        <main className="w-screen min-h-screen bg-red-600 overflow-hidden ">
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-16">
                <h1 className="text-4xl text-white font-thin">
                  {isActive && "Work"}
                  {isBreak && "Break"}
                  {!isActive && !isBreak && "Ready?"}
                </h1>
                <p className="text-6xl text-white font-black">
                  {minutes}:{seconds2digits(seconds)}
                </p>
                <div className="flex gap-9">
                  <button
                    className={`bg-black text-white ${
                      !isActive ? "bg-black text-white" : "bg-black text-white "
                    } py-2 px-8 text-xl rounded-sm font-bold `}
                    onClick={handlePlayPause}
                  >
                    {isActive ? "Pause" : "Start"}
                  </button>
                  <button
                    className="bg-white text-black py-2 px-8 text-xl rounded-sm font-bold"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
                <div>
                  {isWork && (
                    <p className="text-xl text-white font-medium">
                      You have completed {cycle} cycle!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <NotInstalled />
      )}
    </>
  );
};

export default Home;
