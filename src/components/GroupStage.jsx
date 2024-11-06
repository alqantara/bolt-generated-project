import React, { useState } from 'react';

const GroupStage = ({ groups, onComplete }) => {
  const [groupResults, setGroupResults] = useState(
    groups.map(group => group.map(team => ({ ...team, points: 0 })))
  );

  const handleMatchResult = (groupIndex, team1Index, team2Index, winner) => {
    setGroupResults(prevResults => {
      const newResults = [...prevResults];
      const group = [...newResults[groupIndex]];

      if (winner === 1) {
        group[team1Index].points += 3;
      } else if (winner === 2) {
        group[team2Index].points += 3;
      } else {
        group[team1Index].points += 1;
        group[team2Index].points += 1;
      }

      newResults[groupIndex] = group;
      return newResults;
    });
  };

  const handleComplete = () => {
    onComplete(groupResults);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Group Stage</h2>
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Group {groupIndex + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            {group.map((team1, i) => (
              group.slice(i + 1).map((team2, j) => (
                <div key={`${team1.id}-${team2.id}`} className="border p-2 rounded">
                  <p>{team1.name} vs {team2.name}</p>
                  <div className="mt-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleMatchResult(groupIndex, i, i + j + 1, 1)}
                    >
                      {team1.name} wins
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleMatchResult(groupIndex, i, i + j + 1, 2)}
                    >
                      {team2.name} wins
                    </button>
                    <button
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                      onClick={() => handleMatchResult(groupIndex, i, i + j + 1, 0)}
                    >
                      Draw
                    </button>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      ))}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleComplete}
      >
        Complete Group Stage
      </button>
    </div>
  );
};

export default GroupStage;
