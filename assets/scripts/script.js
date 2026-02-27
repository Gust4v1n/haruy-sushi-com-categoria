const aborgue = document.getElementById('aborgue');
const paineis = document.getElementById('paineis');
const btnCategorias = document.querySelectorAll('#btnCategorias');
const  categorias = document.querySelectorAll('#categorias > div');

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  const smoother = ScrollSmoother.create({
    smooth: 1,
    effects: true
  });

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

btnCategorias.forEach(button => {
  button.addEventListener('click', () => {
    btnCategorias.forEach(btn => {
      btn.classList.remove('bg-red-600');
      btn.classList.add('bg-gray-200');
      btn.classList.remove('text-white');
    });
    button.classList.remove('bg-gray-200');
    button.classList.add('bg-red-600');
    button.classList.add('text-white');
    
    const categoriaNome = button.textContent.trim();
    const categoriaId = categoriaNome === 'Hot Rolls' ? 'HotRolls' : categoriaNome;
    
    categorias.forEach(categoria => {
      if (categoria.id === categoriaId) {
        categoria.classList.remove('hidden');
      } else {
        categoria.classList.add('hidden');
      }
    });
  });
});
