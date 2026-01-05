interface Player {
  username: string;
  xp: number;
}

export default function LeaderboardTable({ players }: { players: Player[] }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800/50">
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Rank</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400">Player</th>
            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-slate-400">Experience</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {players.map((player, index) => {
            const rank = index + 1;
            return (
              <tr 
                key={player.username} 
                className="group hover:bg-blue-500/5 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <span className={`
                    flex h-8 w-8 items-center justify-center rounded-full text-sm font-black
                    ${rank === 1 ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 
                      rank === 2 ? 'bg-slate-300 text-black' : 
                      rank === 3 ? 'bg-amber-600 text-black' : 
                      'text-slate-500 border border-slate-700'}
                  `}>
                    {rank}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-600 to-purple-600" />
                    <span className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                      {player.username}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-mono font-bold text-blue-400">
                    {player.xp.toLocaleString()} <span className="text-[10px] text-slate-500 uppercase ml-1">XP</span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {players.length === 0 && (
        <div className="p-10 text-center text-slate-500 italic">
          No data available. Season starting soon!
        </div>
      )}
    </div>
  );
}