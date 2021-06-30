window.addEventListener('DOMContentLoaded', () => {

    const player = document.querySelector('.player'),
        video = player.querySelector('.viewer'),
        progress = player.querySelector('.progress'),
        progressBar = player.querySelector('.progress__filled'),
        toggle = player.querySelector('.toggle'),
        skipButtons = player.querySelectorAll('[data-skip]'),
        ranges = player.querySelectorAll('.player__slider'),
        fullscreen = player.querySelector('.fullscreen');

    function togglePlay() {
        video[video.paused ? 'play' : 'pause']();

        toggle.textContent = video.paused ? 'Play' : 'Pause';
    }

    function skip() {
        video.currentTime += parseInt(this.dataset.skip);
    }

    function handleRangeUpdate() {
        video[this.name] = this.value;
    }
    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.flexBasis = `${percent}%`;
    }
    function scrub(e) {
        video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
    }

    toggle.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);
    video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('dblclick', () => {
        video.requestFullscreen();
    });

    skipButtons.forEach(btn => {
        btn.addEventListener('click', skip);
    });
    ranges.forEach(range => {
        range.addEventListener('input', handleRangeUpdate);
    });
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousedown', scrub);
    fullscreen.addEventListener('click', () => {
             video.requestFullscreen();
    });
});
