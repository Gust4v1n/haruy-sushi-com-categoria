const aborgue       = document.getElementById('aborgue');
const paineis       = document.getElementById('paineis');
const btnCategorias = document.querySelectorAll('#btnCategorias');
const categorias    = document.querySelectorAll('#categorias > div');

const categoriasOrdem = ['Sushis', 'Temakis', 'HotRolls', 'Ramens', 'Bebidas', 'Sobremesas'];
let categoriaAtual = 0; 

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  const smoother = ScrollSmoother.create({ smooth: 1, effects: true });

  document.querySelectorAll('a[href="#cardapio"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      smoother.scrollTo(smoother.scrollTop() + 500, true);
    });
  });
});

aborgue.addEventListener('click', () => {
  aborgue.classList.toggle('open');
  paineis.classList.toggle('hidden');
});

function ativarCategoria(index) {
  const categoriaId = categoriasOrdem[index];

  btnCategorias.forEach((btn, i) => {
    const ativo = i === index;
    btn.classList.toggle('bg-red-600', ativo);
    btn.classList.toggle('text-white',  ativo);
    btn.classList.toggle('bg-gray-200', !ativo);
  });

  categorias.forEach(cat => {
    cat.classList.toggle('hidden', cat.id !== categoriaId);
  });

  categoriaAtual = index;
}

btnCategorias.forEach((button, index) => {

  button.addEventListener('mousedown',   () => aplicarFeedbackTouch(button, true));
  button.addEventListener('mouseup',     () => aplicarFeedbackTouch(button, false));
  button.addEventListener('touchstart',  () => aplicarFeedbackTouch(button, true),  { passive: true });
  button.addEventListener('touchend',    () => aplicarFeedbackTouch(button, false), { passive: true });

  button.addEventListener('click', () => ativarCategoria(index));
});

function aplicarFeedbackTouch(elemento, pressionado) {
  elemento.style.transform  = pressionado ? 'scale(0.93)' : '';
  elemento.style.transition = 'transform 0.1s ease';
}

const areaCategorias = document.getElementById('categorias');

let touchStartX = 0;
let touchStartY = 0;
let touchEndX   = 0;
let touchEndY   = 0;

const SWIPE_THRESHOLD    = 50;
const SWIPE_MAX_VERTICAL = 80; 

areaCategorias.addEventListener('touchstart', e => {
  const toque = e.changedTouches[0];  
  touchStartX = toque.clientX;
  touchStartY = toque.clientY;

  areaCategorias.style.opacity    = '0.85';
  areaCategorias.style.transition = 'opacity 0.1s ease';
}, { passive: true });

areaCategorias.addEventListener('touchmove', e => {
  const toque       = e.changedTouches[0];
  const deltaX      = toque.clientX - touchStartX;
  const deltaY      = toque.clientY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
    e.preventDefault();
  }
}, { passive: false });

areaCategorias.addEventListener('touchend', e => {
  const toque  = e.changedTouches[0];
  touchEndX    = toque.clientX;
  touchEndY    = toque.clientY;

  areaCategorias.style.opacity = '1';

  processarSwipe();
});


function processarSwipe() {
  const deltaX = touchEndX - touchStartX; 
  const deltaY = touchEndY - touchStartY;

  const ehSwipeHorizontal =
    Math.abs(deltaX) >= SWIPE_THRESHOLD &&
    Math.abs(deltaY) <= SWIPE_MAX_VERTICAL;

  if (!ehSwipeHorizontal) return;

  if (deltaX < 0) {
    const proximo = (categoriaAtual + 1) % categoriasOrdem.length;
    ativarCategoria(proximo);
    animarTransicao('left');
  } else {
    const anterior = (categoriaAtual - 1 + categoriasOrdem.length) % categoriasOrdem.length;
    ativarCategoria(anterior);
    animarTransicao('right');
  }
}

function animarTransicao(direcao) {
  const categoriaVisivel = document.getElementById(categoriasOrdem[categoriaAtual]);
  if (!categoriaVisivel) return;

  const translateInicio = direcao === 'left' ? '40px' : '-40px';

  categoriaVisivel.style.opacity   = '0';
  categoriaVisivel.style.transform = `translateX(${translateInicio})`;
  categoriaVisivel.style.transition = 'none';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      categoriaVisivel.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      categoriaVisivel.style.opacity    = '1';
      categoriaVisivel.style.transform  = 'translateX(0)';
    });
  });
}

document.querySelectorAll('.produto').forEach(produto => {
  produto.addEventListener('mousedown', () => {
    produto.style.boxShadow = '0 0 0 2px #dc2626';
    produto.style.transition = 'box-shadow 0.1s ease';
  });
  produto.addEventListener('mouseup', () => {
    produto.style.boxShadow = '';
  });

  produto.addEventListener('touchstart', e => {
    const toque = e.touches[0];
    const x = toque.clientX;
    const y = toque.clientY;

    console.log(`[Touch] produto tocado em x: ${x.toFixed(0)}, y: ${y.toFixed(0)}`);

    produto.style.backgroundColor = '#fef2f2';  
    produto.style.transition       = 'background-color 0.1s ease';
  }, { passive: true });

  produto.addEventListener('touchend', () => {
    produto.style.backgroundColor = '';
  }, { passive: true });
});
