import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [finalStep, setFinalStep] = useState(false);
  const [answeredYes, setAnsweredYes] = useState(false);

  const startProposal = () => {
    const audio = new Audio(import.meta.env.BASE_URL + "bg-music.mp3");
    audio.loop = true;
    audio.volume = 0.9;
    audio.currentTime = 19;
    audio.play().catch(() => {});
    setStarted(true);
    createFloatingHearts();
    setTimeout(() => setShowMessage(true), 1000);
    setTimeout(() => setFinalStep(true), 25000);
  };

  const createFloatingHearts = () => {
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.setProperty("--i", Math.random());
      document.body.appendChild(heart);
    }
  };

  const handleYes = () => {
    setAnsweredYes(true);
    confetti();
  };

  const confetti = () => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      const colors = ["#ff69b4", "#ffb6c1", "#ffc0cb"];
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  if (!unlocked) {
    return (
      <div className={`password-screen ${unlocking ? "fade-out" : ""}`}>
        <h2>💌 Hey love, this surprise is just for you.</h2>
        <input
          type="password"
          placeholder="Enter secret word..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
        <button
          className="unlock-btn"
          onClick={() => {
            if (password.toLowerCase() === "sreevu") {
              setUnlocking(true);
              setError("");
              setTimeout(() => {
                setUnlocked(true);
              }, 1000);
            } else {
              setError("❌ Oops! That’s not it, my love 💭 Try again!");
            }
          }}
        >
          Unlock ✨
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      {!started ? (
        <div className="reveal-box" onClick={startProposal}>
          <span className="click-text">Click to begin 💖</span>
        </div>
      ) : !showMessage ? (
        <h2 className="fade">Starting your surprise...</h2>
      ) : !finalStep ? (
        <div className="love-message typewriter">
          <h1>Dear Sree,</h1>
          <p>
            From the very first moment I met you, I felt something shift in my
            soul. <br />
            It was as if the universe paused for a second just to let me
            realize— <br />
            that you, Sree, were going to mean more to me than I could ever
            explain. <br />
            <br />
            And now, watching you go through this pain, seeing you sick, <br />
            it kills me every moment. I wish I could take it all away, <br />
            hold your hand and absorb every ounce of discomfort you're feeling.{" "}
            <br />
            Please take care of yourself, my love. Rest, heal, and know that{" "}
            <br />
            I am right here beside you — always. <br />
            <br />
            Your smile still lights up my heart even on your hardest days,{" "}
            <br />
            and your strength through all of this makes me love you even more.{" "}
            <br />
            I miss your voice, your energy, your little chaos — everything about
            you. <br />
            <br />
            You are my peace, my fire, my softest place to land and the
            brightest part of my future. <br />
            No distance, no illness, no tough time can ever lessen what I feel
            for you. <br />
            <br />
            You're not just the love of my life... <br />
            You are my life. 💖
          </p>
        </div>
      ) : !answeredYes ? (
        <div className="final-screen">
          <h1>Will you be my love forever?? 💍</h1>
          <div className="btn-group">
            <button className="yes-btn" onClick={handleYes}>
              Yes, Shivvu ❤️
            </button>
            <button
              className="no-btn"
              onClick={() => alert("Wrong choice 😜 Try again!")}
            >
              Hmm... Think again 😜
            </button>
          </div>
        </div>
      ) : (
        <div className="final-screen">
          <h1>You said YES!!! 🥹❤️</h1>
          <p>
            This is the happiest moment of my life.
            <br />
            Forever yours, Shivvu 💘
          </p>
        </div>
      )}
    </div>
  );
}
