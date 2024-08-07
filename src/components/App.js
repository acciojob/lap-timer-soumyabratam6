
import React,{useState,useEffect,useRef} from "react";
import './../styles/App.css';

const App = () => {
  const[time,setTime] = useState(0);
  const[laps,setLaps] = useState([]);
  const[isRunning,setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = ()=>{
    if(!isRunning){
      setIsRunning(true);
      timerRef.current = setInterval(()=>{
        setTime(prevTime =>prevTime +1)
      },10)
    }
  };
  const stopTimer = ()=>{
    if(isRunning){
      setIsRunning(false);
      clearInterval(timerRef.current);
    }
  };
  const recordLap = ()=>{
    if(isRunning){
      setLaps([...laps,time]);
    }
  };
  const resetTimer = () => {
    stopTimer();
    setTime(0);
    setLaps([]);
  };
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);
  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const centis = centiseconds % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centis).padStart(2, '0')}`;
  }
  return (
    <div>
      <h1>Lap Timer</h1>
      <div>
        <h2>{formatTime(time)}</h2>
      </div>
      <div>
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div>
        <h2>Laps</h2>
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
