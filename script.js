const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let dinoPosition = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (dinoPosition >= 150) {
      clearInterval(upInterval);

      //Falling
      let downInterval = setInterval(() => {
        if (dinoPosition <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          dinoPosition -= 20;
          dino.style.bottom = dinoPosition + 'px';
        }
      }, 20);
    } else {
      //Jumping
      dinoPosition += 20;
      dino.style.bottom = dinoPosition + 'px';
    }

  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  console.log(randomTime);

  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);

  let moveLeftInterval = setInterval(() => {

    if (cactusPosition < -60) {
      clearInterval(moveLeftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && dinoPosition < 60){
      clearInterval(moveLeftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener('keypress', handleKeyUp);