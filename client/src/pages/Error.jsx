import React from 'react';
import eye from '../assets/images/eye.png';
import eyes from '../assets/images/eyes.png';

const Error = () => {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const eyes = document.querySelectorAll('.eye');
    const anchor = document.getElementById('anchor');
    const rect = anchor.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    const anchorY = rect.top + rect.height / 2;

    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

    console.log(angleDeg);

    eyes.forEach((eye) => {
      eye.style.transform = `rotate(${90 + angleDeg}deg)`;
    });
  });

  const angle = (cx, cy, ex, ey) => {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    return deg;
  };

  return (
    <div className='Error'>
      <div>
        <h1>OOPS!</h1>
        <h3>Looks like we can't find you that page</h3>
      </div>
      <div className='eyeContainer'>
        <img id='anchor' src={eyes} />
        <div id='eyes'>
          <img className='eye' src={eye} style={{ top: -48, left: 29 }} />
          <img className='eye' src={eye} style={{ top: -48, left: -137 }} />
        </div>
      </div>
      <span>
        <a href='http://localhost:8080'>
          Let's go Login
          <svg viewBox='0 0 70 36'>
            <path
              d='M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471
35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153
54.5169 -6.68469 23.489 9.31527'
            />
          </svg>
        </a>
      </span>
    </div>
  );
};

export default Error;
