document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const videoBtn = document.getElementById('videoBtn'); // make sure you have this in the HTML
  const question = document.getElementById('question');
  const message = document.getElementById('message');
  let noClicks = 0;
  let heartInterval = null;

  // hide the video button initially (but keep it in the DOM)
  if (videoBtn) videoBtn.style.display = 'none';

  yesBtn.addEventListener('click', () => {
    yesBtn.remove();
    noBtn.remove();
    question.textContent = '';
    message.textContent = 'Awww 😍 Give me a hug 😊!';
    // show the video button again
    if (videoBtn) {
      videoBtn.style.display = ''; // blank restores default (or use 'inline-block')
      // optionally set focus to it:
      videoBtn.focus();
    }
    heartEffect();
  });
  
  videoBtn.addEventListener('click', () => {
    const url = videoBtn.dataset.video; // read URL from HTML
    if (!url) return;
    window.open(url, '_blank'); // opens in new tab
  });
  
  noBtn.addEventListener('click', () => {
    noClicks++;

    if (noClicks === 1) {
      question.textContent = 'Please...? 😥';
    } else if (noClicks === 2 || noClicks === 3) {
      question.textContent = noClicks === 3 ? 'Please... 🥺' : question.textContent;
      moveButtonRandomly(noBtn);
    } else if (noClicks === 4) {
      document.body.style.animation = 'glitch 0.3s infinite';
      question.textContent = 'System Error... Accepting is mandatory 😵';
    } else {
      noBtn.remove();
      question.textContent = 'Only one choice remains 😈';
    }
  });

  function moveButtonRandomly(button) {
    const btnWidth = button.offsetWidth;
    const btnHeight = button.offsetHeight;
    const maxX = Math.max(window.innerWidth - btnWidth - 20, 0);
    const maxY = Math.max(window.innerHeight - btnHeight - 20, 0);
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    button.style.position = 'absolute';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
  }

  function heartEffect() {
    if (heartInterval) return; // avoid multiple intervals

    heartInterval = setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, 100);
  }
  
});
