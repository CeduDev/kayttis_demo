import React from 'react';
import stats from '../resources/stats.png';

const Stats = () => {
  return (
    <div className="stats-div">
      <img src={stats} alt="stats" className="stats-image" />
    </div>
  );
};

export default Stats;
