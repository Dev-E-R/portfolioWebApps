import { animate, utils, createDraggable, spring } from '/node_modules/animejs/dist/bundles/anime.esm.js';

const __avatars__ = document.querySelectorAll('.avatar-item');
const __iconButtons__ = document.querySelectorAll('.icon-btn');
const [ ____$popuimg____ ] = utils.$('.popular-game-image');

// Animación de loop para la imagen popular
animate('.popular-game-image', {
    rotate:[
        {to: '-0.01turn', duration: 4000 },
        {to: '0turn', duration: 3000}
    ],
    scale: [
        { to: 1.05, ease: 'in(0.5)', duration: 2000 },
        { to: 1, ease: '(2)' }
    ],
    loop: true,
    loopDelay: 250,
});

// Hacer draggable la ventana del juego popular
createDraggable('.popular-game-window', {
    container: [0, 0, 0, 0],
    releaseEase: spring({ bounce: .7 })
});

// Animación lateral para avatares
__avatars__.forEach(avatar => {
    avatar.addEventListener('mouseenter', () => {
        animate(avatar, {
            translateX: 10,
            duration: 300,
            ease: 'out(2)'
        });
    });

    avatar.addEventListener('mouseleave', () => {
        animate(avatar, {
            translateX: 0,
            duration: 300,
            ease: 'out(2)'
        });
    });
});

// Animación lateral para botones de iconos
__iconButtons__.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        animate(btn, {
            translateX: 10,
            duration: 300,
            ease: 'out(2)'
        });
    });

    btn.addEventListener('mouseleave', () => {
        animate(btn, {
            translateX: 0,
            duration: 300,
            ease: 'out(2)'
        });
    });
});

// === NUEVAS ANIMACIONES ===

const __menuButtons__ = document.querySelectorAll('.menu-options > button');
const __carouselButtons__ = document.querySelectorAll('.carousel-btn');
const __otherGames__ = document.querySelectorAll('.other-games-window > div');
const __newGamesCards__ = document.querySelectorAll('.newgames > div');

// Animación para botones del menú lateral izquierdo
__menuButtons__.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        animate(btn, {
            scale: 1.15,
            rotate: '5deg',
            duration: 400,
            ease: 'out(3)'
        });
    });

    btn.addEventListener('mouseleave', () => {
        animate(btn, {
            scale: 1,
            rotate: '0deg',
            duration: 400,
            ease: 'out(3)'
        });
    });
});

// Animación para botones del carrusel
__carouselButtons__.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        animate(btn, {
            scale: 1.2,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            duration: 300,
            ease: 'out(2)'
        });
    });

    btn.addEventListener('mouseleave', () => {
        animate(btn, {
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.393)',
            duration: 300,
            ease: 'out(2)'
        });
    });
});

// Animación hover para otros juegos
__otherGames__.forEach(game => {
    game.addEventListener('mouseenter', () => {
        animate(game, {
            translateX: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            duration: 300,
            ease: 'out(2)'
        });
    });

    game.addEventListener('mouseleave', () => {
        animate(game, {
            translateX: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.308)',
            duration: 300,
            ease: 'out(2)'
        });
    });
});

// Animación hover para tarjetas de nuevos juegos
__newGamesCards__.forEach(card => {
    card.addEventListener('mouseenter', () => {
        animate(card, {
            scale: 1.05,
            translateY: -5,
            duration: 400,
            ease: 'out(3)'
        });
    });

    card.addEventListener('mouseleave', () => {
        animate(card, {
            scale: 1,
            translateY: 0,
            duration: 400,
            ease: 'out(3)'
        });
    });
});

// Animación de entrada para elementos al cargar
animate('.popular-game-window', {
    translateX: [-50, 0],
    opacity: [0, 1],
    duration: 800,
    ease: 'out(3)'
});

animate('.other-games-window > div', {
    translateX: [30, 0],
    opacity: [0, 1],
    duration: 600,
    ease: 'out(2)',
    delay: animate.stagger(100)
});

animate('.newgames > div', {
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 600,
    ease: 'out(2)',
    delay: animate.stagger(80)
});

animate('.playtime', {
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 800,
    ease: 'out(3)',
    delay: 300
});

// Animación suave para el download section
animate('.downloads', {
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 700,
    ease: 'out(3)',
    delay: 400
});

// Animación pulsante para el círculo de total hours
animate('.totalhours', {
    scale: [1, 2, 1],
    duration: 3000,
    ease: 'inOut(2)',
    loop: true
});

// Animación para el texto de total hours
animate('.totalhours > h2', {
    scale: [1, 1.08, 1],
    duration: 2500,
    ease: 'inOut(3)',
    loop: true
});