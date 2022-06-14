/*
  Main page for for study timer -> displays Settings.js if no timer ongoing and vice-versa
  Features to be added (to the cogwheel button as an overlay)
  -> Total time tracker (stat page) -> also to be added to end of session time 
  -> Option to skip break
  -> Option to repeat after break time
*/
import React, { Fragment, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Timer from "./Timer";
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";

const StudyTimer = () => {
  const [showSettings, setShowSettings] = useState(true);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);

  const formatTimeHandler = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTimeHandler = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime < 300 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
    }
  };

  return (
    <Fragment>
      <SideBar select={4} />
      <SettingsContext.Provider
        value={{
          showSettings,
          sessionTime,
          breakTime,
          setSessionTime,
          setShowSettings,
          setBreakTime,
          changeTimeHandler,
          formatTimeHandler,
        }}
      >
        {showSettings ? <Settings /> : <Timer formatTime={formatTimeHandler}/>}
      </SettingsContext.Provider>
    </Fragment>
  );
};

export default StudyTimer;
