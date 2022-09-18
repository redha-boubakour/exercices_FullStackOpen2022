import { useState } from "react";

const Button = (props) => {
    return (
        <>
            <button onClick={props.onClick}>{props.text}</button>
        </>
    );
};

const StatisticLine = (props) => (
    <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </tr>
);

const Statistics = (props) => {
    return (
        <>
            <table>
                <tbody>
                    <StatisticLine text="good" value={props.good} />
                    <StatisticLine text="neutral" value={props.neutral} />
                    <StatisticLine text="bad" value={props.bad} />

                    <tr>
                        <td>all</td>
                        <td>{props.all}</td>
                    </tr>
                    <tr>
                        <td>average</td>
                        <td>{props.average}</td>
                    </tr>
                    <tr>
                        <td>positive</td>
                        <td>{props.positive} %</td>
                    </tr>
                </tbody>
            </table>
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

            <h3>Statistics</h3>
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
