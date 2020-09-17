import React from 'react'

import Statistic from './Statistic'

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good + neutral + bad} />
      <Statistic
        text="average"
        value={(good + bad * -1) / (good + neutral + bad)}
      />
      <Statistic
        text="positive"
        value={(good * 100) / (good + neutral + bad) + '%'}
      />
    </>
  )
}

export default Statistics
