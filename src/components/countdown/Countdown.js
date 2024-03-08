import React, { useEffect, useRef, useState } from 'react';
import style from './Countdown.module.scss';

const CountdownCircle = ({ milliseconds,totalTime,sendPing }) => {
    const [timeLeft, setTimeLeft] = useState(milliseconds);
    const timerRef = useRef(null);
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(Math.max(0,timeLeft - 100)), 100);
            if (timeLeft < 5000) {
                setIsUrgent(true);
            }
            return () => clearTimeout(timerRef.current);
        }
        else{
            sendPing();
        }
    }, [timeLeft]);

    useEffect(()=>{
        setIsUrgent(false);
        clearTimeout(timerRef.current);
        setTimeLeft(milliseconds);
    },[milliseconds])

    

    const strokeDashoffset = () => {
        const total = 283; // Approx circumference of the circle
        return total - (timeLeft / totalTime) * total;
    };

    return (
        <div className={style.countdownCircle}>
            <svg className={`${style.countdownSVG} ${isUrgent===true && style.Urgent}`}>
                <circle r="45" cx="50" cy="50" />
                <circle
                    r="45"
                    cx="50"
                    cy="50"
                    style={{
                        strokeDasharray: '283',
                        strokeDashoffset: strokeDashoffset(),
                    }}
                />
            </svg>
            <div className={style.timeLeft}>{(timeLeft/1000).toFixed(2)}</div>
        </div>
    );
};


export default CountdownCircle;
