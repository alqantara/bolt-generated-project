import React, { useState, useEffect } from 'react';
import GroupStage from './components/GroupStage';
import KnockoutStage from './components/KnockoutStage';

const App = () => {
  const [teams, setTeams] = useState([]);
  const [groups, setGroups] = useState([]);
  const [knockoutStage, setKnockoutStage] = useState(null);

  useEffect(() => {
    // Generate 32 teams
    const generatedTeams = Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      name: `Team ${i + 1}`,
    }));
    setTeams(generatedTeams);

    // Create 8 groups of 4 teams each
    const generatedGroups = [];
    for (let i = 0; i < 8; i++) {
      generatedGroups.push(generatedTeams.slice(i * 4, (i + 1) * 4));
    }
    setGroups(generatedGroups);
  }, []);

  const handleGroupStageComplete = (results) => {
    // Sort teams based on their performance in the group stage
    const sortedTeams = results.flat().sort((a, b) => b.points - a.points);

    // Divide teams into two levels
    const topLevel = sortedTeams.slice(0, 16);
    const bottomLevel = sortedTeams.slice(16);

    // Create knockout stages for both levels
    setKnockoutStage({
      topLevel: createKnockoutBracket(topLevel),
      bottomLevel: createKnockoutBracket(bottomLevel),
    });
  };

  const createKnockoutBracket = (teams) => {
    return {
      roundOf16: teams.map((team, i) => ({
        team1: team,
        team2: teams[teams.length - 1 - i],
      })),
      quarterFinals: [],
      semiFinals: [],
      final: null,
    };
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Padel Tournament</h1>
      {knockoutStage ? (
        <KnockoutStage knockoutStage={knockoutStage} />
      ) : (
        <GroupStage groups={groups} onComplete={handleGroupStageComplete} />
      )}
    </div>
  );
};

export default App;
