import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { QUIZ_DATA } from './quiz_data';

const PASSWORD = 'nsca2026';

// パスワードログイン画面
function PasswordLoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      onLogin();
      setPassword('');
    } else {
      setError('パスワードが正しくありません');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          NSCA-CPT
        </h1>
        <p className="text-center text-gray-600 mb-6">学習アプリ</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="パスワードを入力"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

// ホーム画面
function HomeScreen({ onStartQuiz, stats }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            NSCA-CPT トレーニング
          </h1>
          <p className="text-gray-600">365日の学習習慣を作ろう</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 学習統計</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">連続日数</p>
              <p className="text-2xl font-bold text-blue-600">{stats.streak}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">正答率</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.totalAttempts > 0
                  ? Math.round((stats.correctCount / stats.totalAttempts) * 100)
                  : 0}%
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">解いた問題</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalAttempts}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">苦手な問題</p>
              <p className="text-2xl font-bold text-orange-600">{stats.weakPoints}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onStartQuiz}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition text-lg"
        >
          🎯 今日のクイズを始める
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          毎日の習慣で合格を目指す
        </p>
      </div>
    </div>
  );
}

// クイズ画面
function QuizScreen({ quiz, onAnswer, onSkip, onQuit, progress }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto mt-4">
        {/* プログレスバー */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Q{quiz.id} / {QUIZ_DATA.length}
            </span>
            <span className="text-sm text-gray-600">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 問題 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-6">
            {quiz.text}
          </h2>

          {/* 選択肢 */}
          <div className="space-y-3 mb-6">
            {['A', 'B', 'C', 'D'].map((option) => (
              <button
                key={option}
                onClick={() => {
                  onAnswer(option);
                  setShowAnswer(true);
                }}
                className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition font-medium text-gray-800"
              >
                <span className="font-bold text-blue-600">{option}. </span>
                {quiz.options[option]}
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-bold">正解: {quiz.answer}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">{quiz.explanation}</p>
            </div>
          )}

          {showAnswer && (
            <div className="flex gap-3">
              <button
                onClick={onSkip}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                次へ
              </button>
              <button
                onClick={onQuit}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                やめる
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// リザルト画面
function ResultsScreen({ correctCount, totalCount, onRestart }) {
  const percentage = Math.round((correctCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          📊 結果
        </h2>

        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-blue-600 mb-2">
            {percentage}%
          </p>
          <p className="text-gray-600">
            {correctCount} / {totalCount} 問正解
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            {percentage >= 80 && "素晴らしい!"}
            {percentage >= 60 && percentage < 80 && "良い調子です"}
            {percentage < 60 && "もう一度チャレンジ!"}
          </p>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition"
        >
          もう一度やる
        </button>
      </div>
    </div>
  );
}

// メインアプリ
export default function NSCACPTQuiz() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screen, setScreen] = useState('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [stats, setStats] = useState({
    streak: 0,
    correctCount: 0,
    totalAttempts: 0,
    weakPoints: 0,
  });

  const currentQuiz = QUIZ_DATA[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex) / QUIZ_DATA.length) * 100);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleStartQuiz = useCallback(() => {
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
  }, []);

  const handleAnswer = useCallback((selectedAnswer) => {
    if (selectedAnswer === currentQuiz.answer) {
      setCorrectCount((prev) => prev + 1);
    }
  }, [currentQuiz]);

  const handleSkip = useCallback(() => {
    if (currentQuestionIndex < QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStats({
        ...stats,
        correctCount: stats.correctCount + correctCount,
        totalAttempts: stats.totalAttempts + QUIZ_DATA.length,
        streak: stats.streak + 1,
      });
      setScreen('results');
    }
  }, [currentQuestionIndex, correctCount, stats]);

  const handleQuit = useCallback(() => {
    setScreen('home');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('home');
  }, []);

  if (!isLoggedIn) {
    return <PasswordLoginScreen onLogin={handleLogin} />;
  }

  if (screen === 'home') {
    return <HomeScreen onStartQuiz={handleStartQuiz} stats={stats} />;
  }

  if (screen === 'quiz') {
    return (
      <QuizScreen
        quiz={currentQuiz}
        onAnswer={handleAnswer}
        onSkip={handleSkip}
        onQuit={handleQuit}
        progress={progress}
      />
    );
  }

  if (screen === 'results') {
    return (
      <ResultsScreen
        correctCount={correctCount}
        totalCount={QUIZ_DATA.length}
        onRestart={handleRestart}
      />
    );
  }
}
