import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedbacks</h2>
      <Button text="good" action={() => setGood(good + 1)} />
      <Button text="neutral" action={() => setNeutral(neutral + 1)} />
      <Button text="bad" action={() => setBad(bad + 1)} />
      <h2>statitistics</h2>
      {good || neutral || bad ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        'No feedback given'
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
