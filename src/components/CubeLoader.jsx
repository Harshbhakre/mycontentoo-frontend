import React from "react";

export default function CubeLoader() {
  return (
    <>
      <style>{`
        /* COLORS */
:root {
  --cl-bg: #222;
  --cl-left: #D53A33;
  --cl-right: #E79C10;
  --cl-top: #1d9099;
}

/* WRAPPER */
.cubeLoader-container {
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* GRID HOLDER */
.cubeLoader-grid {
  position: relative;
  width: 86px;
  height: 100px;
  transform: scale(0.55);
}

/* EACH CUBE */
.cl-cube {
  position: absolute;
  width: 86px;
  height: 100px;
}

/* FACES */
.cl-face {
  height: 50px;
  width: 50px;
  position: absolute;
  transform-origin: 0 0;
}

.cl-right {
  background: var(--cl-right);
  transform: rotate(-30deg) skewX(-30deg) translate(49px, 65px) scaleY(0.86);
}

.cl-left {
  background: var(--cl-left);
  transform: rotate(90deg) skewX(-30deg) scaleY(0.86) translate(25px, -50px);
}

.cl-top {
  background: var(--cl-top);
  transform: rotate(210deg) skew(-30deg) translate(-75px, -22px) scaleY(0.86);
  z-index: 2;
}

/* ANIMATIONS */
@keyframes cl-move {
  0%   { transform: translate(0, 0); }
  50%  { transform: translate(10px, -20px); }
  100% { transform: translate(0, 0); }
}

.cl-cube {
  animation: cl-move 1.2s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.05s);
}

      `}</style>
    <div className="cubeLoader-container">
      <div className="cubeLoader-grid">
        {Array.from({ length: 27 }).map((_, i) => (
          <div key={i} className={`cl-cube cl-h${Math.floor(i / 9) + 1} cl-w${(Math.floor(i / 3) % 3) + 1} cl-l${(i % 3) + 1}`}>
            <div className="cl-face cl-top"></div>
            <div className="cl-face cl-left"></div>
            <div className="cl-face cl-right"></div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
