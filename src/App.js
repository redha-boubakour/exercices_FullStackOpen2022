import { useState } from "react";

const Button = (props) => {
    return (
        <>
            <button onClick={props.onClick}>{props.text}</button>
        </>
    );
};

const StatisticLine = (props) => (
    <p>
        {props.text} : {props.value}
    </p>
);

const Statistics = (props) => {
    return (
        <>
            <h3>Statistics</h3>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} /> / all : {props.all} /
            average : {props.average} / positive : {props.positive} %
        </>
    );
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const all = good + neutral + bad;
    const average = (good - bad) / all;
    const positive = (good / all) * 100;

    const handleClickGood = () => {
        setGood(good + 1);
    };

    const handleClickNeutral = () => {
        setNeutral(neutral + 1);
    };

    const handleClickBad = () => {
        setBad(bad + 1);
    };

    return (
        <>
            <h3>Give feedback</h3>
            <Button onClick={handleClickGood} text={"Good"} />
            <Button onClick={handleClickNeutral} text={"Neutral"} />
            <Button onClick={handleClickBad} text={"Bad"} />

            {good || neutral || bad ? (
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    all={all}
                    average={average}
                    positive={positive}
                />
            ) : (
                <p>No feedback given</p>
            )}
        </>
    );
};

export default App;
