import React, { useState } from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, DollarSign, Users, Clock, BarChart3 } from 'lucide-react';

const TrustLayerMVP = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);

  // Reputation scoring engine (simplified)
  const calculateScore = (metrics) => {
    const maturityScore = Math.min((metrics.accountAge / 365) * 100 + (metrics.activeMonths / 12) * 100, 250);
    const patternsScore = Math.min((metrics.txCount / 10) + (metrics.volume / 100000) * 50 + (metrics.uniqueCounterparties * 2), 300);
    const behaviorScore = Math.min((metrics.contractInteractions * 4) + (80 - (metrics.failedTx / metrics.txCount * 80)), 250);
    const networkScore = Math.min((metrics.avgCounterpartyScore) + (metrics.protocolsUsed * 10), 200);
    
    return {
      total: Math.round(Math.min(maturityScore + patternsScore + behaviorScore + networkScore, 1000)),
      maturity: Math.round(maturityScore),
      patterns: Math.round(patternsScore),
      behavior: Math.round(behaviorScore),
      network: Math.round(networkScore)
    };
  };

  // Pre-built demo wallets with stories
  const demoWallets = [
    {
      id: 1,
      name: "Alice (Elite Trader)",
      address: "0x7a8f...9b2c",
      story: "Active DeFi user for 2+ years, consistent trading history",
      metrics: {
        accountAge: 730,
        activeMonths: 24,
        txCount: 2500,
        volume: 5000000,
        uniqueCounterparties: 150,
        contractInteractions: 45,
        failedTx: 25,
        avgCounterpartyScore: 95,
        protocolsUsed: 12
      },
      avatar: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Bob (New User)",
      address: "0x3f1d...4e8a",
      story: "Just started 2 weeks ago, exploring the ecosystem",
      metrics: {
        accountAge: 14,
        activeMonths: 1,
        txCount: 25,
        volume: 50000,
        uniqueCounterparties: 8,
        contractInteractions: 3,
        failedTx: 2,
        avgCounterpartyScore: 50,
        protocolsUsed: 2
      },
      avatar: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Carol (Steady Holder)",
      address: "0x9c2b...7d3f",
      story: "1 year active, prefers holding over trading",
      metrics: {
        accountAge: 365,
        activeMonths: 12,
        txCount: 180,
        volume: 800000,
        uniqueCounterparties: 35,
        contractInteractions: 15,
        failedTx: 5,
        avgCounterpartyScore: 70,
        protocolsUsed: 5
      },
      avatar: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Dave (Suspicious)",
      address: "0x5e9a...1c4d",
      story: "High volume but repetitive patterns, many failed txs",
      metrics: {
        accountAge: 45,
        activeMonths: 2,
        txCount: 500,
        volume: 2000000,
        uniqueCounterparties: 5,
        contractInteractions: 2,
        failedTx: 100,
        avgCounterpartyScore: 30,
        protocolsUsed: 1
      },
      avatar: "bg-gradient-to-br from-red-500 to-orange-500"
    },
    {
      id: 5,
      name: "Eve (Protocol Builder)",
      address: "0x2d7f...8b9e",
      story: "Developer with deep ecosystem engagement",
      metrics: {
        accountAge: 540,
        activeMonths: 18,
        txCount: 1200,
        volume: 1500000,
        uniqueCounterparties: 200,
        contractInteractions: 80,
        failedTx: 30,
        avgCounterpartyScore: 85,
        protocolsUsed: 20
      },
      avatar: "bg-gradient-to-br from-yellow-500 to-amber-500"
    }
  ];

  const getInterestRate = (score) => {
    if (score >= 800) return "3.00%";
    if (score >= 600) return "6.00%";
    if (score >= 400) return "9.00%";
    if (score >= 200) return "12.00%";
    return "15.00%";
  };

  const getMaxLeverage = (score) => {
    if (score >= 800) return "10x";
    if (score >= 600) return "5x";
    if (score >= 400) return "2x";
    if (score >= 200) return "1.5x";
    return "1x (fully collateralized)";
  };

  const getScoreColor = (score) => {
    if (score >= 800) return "text-purple-400";
    if (score >= 600) return "text-green-400";
    if (score >= 400) return "text-blue-400";
    if (score >= 200) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBadge = (score) => {
    if (score >= 800) return { label: "Elite", color: "bg-purple-600" };
    if (score >= 600) return { label: "Trusted", color: "bg-green-600" };
    if (score >= 400) return { label: "Established", color: "bg-blue-600" };
    if (score >= 200) return { label: "Emerging", color: "bg-yellow-600" };
    return { label: "New/Untrusted", color: "bg-red-600" };
  };

  const wallet = selectedWallet || demoWallets[0];
  const score = calculateScore(wallet.metrics);
  const badge = getScoreBadge(score.total);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TrustLayer
            </h1>
          </div>
          <p className="text-xl text-blue-200">Decentralized Reputation Infrastructure for Qubic</p>
          <p className="text-sm text-slate-400 mt-2">Proof of Concept - Hackathon Demo</p>
        </div>

        {/* Wallet Selection */}
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 mb-6 border border-slate-700">
          <h2 className="text-lg font-bold mb-4">Select Demo Wallet</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {demoWallets.map((w) => {
              const wScore = calculateScore(w.metrics);
              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedWallet(w)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    wallet.id === w.id
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-slate-600 bg-slate-800 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full ${w.avatar} mx-auto mb-2`}></div>
                  <p className="font-bold text-sm">{w.name.split(' ')[0]}</p>
                  <p className={`text-2xl font-bold ${getScoreColor(wScore.total)}`}>{wScore.total}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Score Display */}
          <div className="md:col-span-2 space-y-6">
            {/* Wallet Info */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{wallet.name}</h2>
                  <p className="text-slate-400 font-mono text-sm">{wallet.address}</p>
                  <p className="text-slate-300 mt-2 text-sm">{wallet.story}</p>
                </div>
                <div className={`${wallet.avatar} w-16 h-16 rounded-full`}></div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6 text-center">
                <div className="mb-2">
                  <span className={`${badge.color} text-white text-sm px-3 py-1 rounded-full font-bold`}>
                    {badge.label}
                  </span>
                </div>
                <div className={`text-7xl font-bold ${getScoreColor(score.total)} mb-2`}>
                  {score.total}
                </div>
                <div className="text-slate-400 text-sm">Reputation Score (out of 1000)</div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Score Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Account Maturity', score: score.maturity, max: 250, color: 'blue' },
                  { label: 'Transaction Patterns', score: score.patterns, max: 300, color: 'purple' },
                  { label: 'Behavioral Trust', score: score.behavior, max: 250, color: 'green' },
                  { label: 'Network Effects', score: score.network, max: 200, color: 'yellow' }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-sm font-bold">{item.score}/{item.max}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`bg-${item.color}-500 h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${(item.score / item.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4">On-Chain Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <Clock className="w-5 h-5 text-blue-400 mb-2" />
                  <p className="text-2xl font-bold">{wallet.metrics.accountAge}d</p>
                  <p className="text-xs text-slate-400">Account Age</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
                  <p className="text-2xl font-bold">{wallet.metrics.txCount}</p>
                  <p className="text-xs text-slate-400">Transactions</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <Users className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-2xl font-bold">{wallet.metrics.uniqueCounterparties}</p>
                  <p className="text-xs text-slate-400">Connections</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Panel */}
          <div className="space-y-6">
            {/* Lending Benefits */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur rounded-xl p-6 border border-green-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Lending Benefits
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Interest Rate</p>
                  <p className="text-3xl font-bold text-green-400">{getInterestRate(score.total)}</p>
                  <p className="text-xs text-slate-500 mt-1">APR on borrowing</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Max Leverage</p>
                  <p className="text-3xl font-bold text-blue-400">{getMaxLeverage(score.total)}</p>
                  <p className="text-xs text-slate-500 mt-1">Borrowing power</p>
                </div>
              </div>
            </div>

            {/* Improvement Tips */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                How to Improve
              </h3>
              <div className="space-y-3">
                {score.total < 400 && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Stay Active</p>
                      <p className="text-xs text-slate-400">Regular transactions improve consistency</p>
                    </div>
                  </div>
                )}
                {score.total < 600 && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Diversify Interactions</p>
                      <p className="text-xs text-slate-400">Use more protocols and interact with more addresses</p>
                    </div>
                  </div>
                )}
                {score.total < 800 && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Build Long-term History</p>
                      <p className="text-xs text-slate-400">Time and consistent activity matter</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Maintain Good Track Record</p>
                    <p className="text-xs text-slate-400">Minimize failed transactions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Flags */}
            {score.total < 400 && (
              <div className="bg-red-900/30 backdrop-blur rounded-xl p-6 border border-red-700">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Risk Signals
                </h3>
                <div className="space-y-2">
                  {wallet.metrics.accountAge < 90 && (
                    <p className="text-sm text-red-300">⚠️ New account (&lt;90 days)</p>
                  )}
                  {wallet.metrics.uniqueCounterparties < 20 && (
                    <p className="text-sm text-red-300">⚠️ Limited interaction diversity</p>
                  )}
                  {(wallet.metrics.failedTx / wallet.metrics.txCount) > 0.1 && (
                    <p className="text-sm text-red-300">⚠️ High failure rate (&gt;10%)</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comparison View */}
        <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold mb-4">Quick Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-3 text-sm font-medium text-slate-400">User</th>
                  <th className="text-center p-3 text-sm font-medium text-slate-400">Score</th>
                  <th className="text-center p-3 text-sm font-medium text-slate-400">Interest Rate</th>
                  <th className="text-center p-3 text-sm font-medium text-slate-400">Max Leverage</th>
                </tr>
              </thead>
              <tbody>
                {demoWallets.map((w) => {
                  const wScore = calculateScore(w.metrics);
                  return (
                    <tr key={w.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${w.avatar}`}></div>
                          <span className="font-medium">{w.name.split(' ')[0]}</span>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`text-xl font-bold ${getScoreColor(wScore.total)}`}>
                          {wScore.total}
                        </span>
                      </td>
                      <td className="p-3 text-center font-bold text-green-400">
                        {getInterestRate(wScore.total)}
                      </td>
                      <td className="p-3 text-center font-bold text-blue-400">
                        {getMaxLeverage(wScore.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-200">
            <strong>Note:</strong> This is a proof-of-concept demo using simulated data. Production version will integrate with actual Qubic blockchain data and smart contracts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustLayerMVP;