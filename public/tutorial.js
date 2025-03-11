const tuto_images = [
    'info/tutorial 1.png',
    'info/tutorial 2.png',
    'info/tutorial 3.png',
    'info/tutorial 4.png',
    'info/tutorial 5.png',
    'info/tutorial 6.png',
    'info/tutorial 7.png',
    'info/tutorial 8.png',
    'info/tutorial 9.png',
    'info/tutorial 10.png',
]; // Replace with your images

const tuto_slider = document.getElementById('tuto_slider');
const tuto_dotsContainer = document.getElementById('tuto_dots');
const tuto_playButton = document.getElementById('tuto_playButton');
const tuto_arrow_r = document.querySelector(".tuto_arrow.tuto_right");
const tuto_arrow_l = document.querySelector(".tuto_arrow.tuto_left");

let tuto_currentIndex = 0;

function tuto_renderSlider() {
    tuto_slider.style.width = `100%`;
    tuto_slider.innerHTML = tuto_images.map(src => `<img src="${src}" alt="Tutorial Image">`).join('');

    tuto_dotsContainer.innerHTML = tuto_images.map((_, index) => 
        `<div class="tuto_dot ${index === 0 ? 'tuto_active' : ''}" data-index="${index}"></div>`
    ).join('');
}

function tuto_updateSlider() {
    tuto_slider.style.transform = `translateX(-${tuto_currentIndex * 100}%)`;

    document.querySelectorAll('.tuto_dot').forEach((dot, index) => {
        dot.classList.toggle('tuto_active', index === tuto_currentIndex);
    });

    tuto_arrow_r.classList.remove('arrow_dis');
    tuto_arrow_r.disabled = false;
    tuto_arrow_l.classList.remove('arrow_dis');
    tuto_arrow_l.disabled = false;

    tuto_playButton.classList.add('tuto_show');

    // if ((tuto_currentIndex === tuto_images.length - 1)) {
    //     tuto_playButton.classList.add('tuto_show');
    // } else{
    //     tuto_playButton.classList.remove('tuto_show');
    // }

    if (tuto_currentIndex === tuto_images.length - 1) {
        tuto_arrow_r.classList.add('arrow_dis');
        tuto_arrow_r.disabled = true;
    }else if(tuto_currentIndex == 0) {
        tuto_arrow_l.classList.add('arrow_dis');
        tuto_arrow_l.disabled = true;
    }
}

tuto_arrow_l.addEventListener('click', () => {
    tuto_currentIndex = (tuto_currentIndex - 1 + tuto_images.length) % tuto_images.length;
    tuto_updateSlider();
});

tuto_arrow_r.addEventListener('click', () => {
    tuto_currentIndex = (tuto_currentIndex + 1) % tuto_images.length;
    tuto_updateSlider();
});

tuto_dotsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('tuto_dot')) {
        tuto_currentIndex = parseInt(event.target.dataset.index, 10);
        tuto_updateSlider();
    }
});

tuto_playButton.addEventListener('click', closeTutorial);

tuto_renderSlider();
tuto_updateSlider();