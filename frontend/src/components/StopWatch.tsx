import React, { useState, useEffect } from 'react';
import styles from '../keypad.module.css'; 

const Stopwatch: React.FC = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning]);

    const startStopwatch = () => {
        setIsRunning(true);
    };

    const stopStopwatch = () => {
        setIsRunning(false);
    };

    const resetStopwatch = () => {
        setTime(0);
        setIsRunning(false);
    };

    const formatTime = (): string => {
        const minutes: number = Math.floor(time / 60);
        const seconds: number = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className={styles.modeContainer}>
            <h1 className={styles.modeLabel} >Stopwatch:</h1>
            <p className={styles.modeLabel} style={{textAlign:'center'}}>{formatTime()}</p>        
            <div className={styles.modeSection}>
                <button className={styles.actionButton} onClick={startStopwatch}>Start</button>
                <button className={styles.actionButton} onClick={stopStopwatch}>Stop</button>
                <button className={styles.actionButton} onClick={resetStopwatch}>Reset</button>
            </div>
        </div>
        
    );
};

export default Stopwatch;