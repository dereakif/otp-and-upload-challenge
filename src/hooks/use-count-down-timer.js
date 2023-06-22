import { useEffect, useState } from "react";

const useCountDownTimer = ({ deadline }) => {
  const initialTime = Math.max(
    0,
    Math.floor((deadline.getTime() - Date.now()) / 1000)
  );

  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const [time, setTime] = useState(initialTime);

  const decrement = () =>
    setTime((prevTime) => {
      if (prevTime === 0) {
        setIsTimerStopped(true);
        return prevTime;
      }
      return prevTime - 1;
    });

  useEffect(() => {
    const id = setInterval(decrement, 1000);
    return () => clearInterval(id);
  }, []);

  const format = (num) => (num < 10 ? `0${num}` : num.toString());

  const resetTimer = () => {
    setIsTimerStopped(false);
    setTime(initialTime);
  };

  const stopTimer = () => {
    setIsTimerStopped(true);
    setTime(0);
  };

  return {
    days: format(Math.floor(time / (3600 * 24))),
    hours: format(Math.floor((time / 3600) % 24)),
    minutes: format(Math.floor((time / 60) % 60)),
    seconds: format(time % 60),
    resetTimer,
    stopTimer,
    isTimerStopped,
  };
};

export default useCountDownTimer;
