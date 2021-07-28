const keys = document.querySelectorAll('.key');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const fullscreen = document.querySelector('.fullscreen');

btnNotes.addEventListener('click', function (e) {
    btnLetters.classList.remove('btn-active');
    btnNotes.classList.add('btn-active');

    keys.forEach(key => {
        key.classList.remove('letter');
        key.classList.add('note');
    });
});

btnLetters.addEventListener('click', function (e) {
    btnNotes.classList.remove('btn-active');
    btnLetters.classList.add('btn-active');

    keys.forEach(key => {
        key.classList.remove('note');
        key.classList.add('letter');
    });
});

fullscreen.addEventListener('click', function (e) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    };
});

document.body.onmousedown = function () {
    keys.forEach(key => {
        key.addEventListener('mouseover', playAudio);
    });
};

document.body.onmouseup = function () {
    keys.forEach(key => {
        key.removeEventListener('mouseover', playAudio);
    });
};

keys.forEach(key => {
    key.addEventListener('click', playAudio);
});


function playAudio(e) {
    const key = e.target;
    const note = document.getElementById(key.dataset.note);
    key.classList.add('active');

    note.currentTime = 0;
    note.play();
    note.addEventListener('ended', () => {
        key.classList.remove('active');
    });
};

window.addEventListener('keydown', function (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if (key === null) return;
    if (!audio) return;
    if (e.repeat === true) {
        return;
    };

    audio.currentTime = 0;
    audio.play();

    key.classList.add('active');
    audio.addEventListener('ended', () => {
        key.classList.remove('active');
    });
});
