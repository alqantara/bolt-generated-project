import React from 'react';

const KnockoutStage = ({ knockoutStage }) => {
  const renderBracket = (level, title) => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Round of 16</h4>
          {level.roundOf16.map((match, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <p>{match.team1.name} vs {match.team2.name}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-semibold mb-2">Quarter Finals</h4>
          {level.quarterFinals.map((match, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <p>{match ? `${match.team1.name} vs ${match.team2.name}` : 'TBD'}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-semibold mb-2">Semi Finals</h4>
          {level.semiFinals.map((match, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <p>{match ? `${match.team1.name} vs ${match.team2.name}` : 'TBD'}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-semibold mb-2">Final</h4>
          <div className="border p-2 rounded mb-2">
            <p>{level.final ? `${level.final.team1.name} vs ${level.final.team2.name}` : 'TBD'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Knockout Stage</h2>
      {renderBracket(knockoutStage.topLevel, "Top Level")}
      {renderBracket(knockoutStage.bottomLevel, "Bottom Level")}
    </div>
  );
};

export default KnockoutStage;
