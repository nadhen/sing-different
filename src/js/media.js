document.addEventListener('DOMContentLoaded', function() { 
    const audio = document.querySelectorAll('.audio');

    const buttonHiddenClass = 'audio__button--hidden';
    const detailsHiddenClass = 'audio__details--hidden';
    const audioPlaying = 'audio--playing';

    if (audio) {
        audio.forEach((element, index) => {
            let playButton = element.querySelector('.audio__button--play');
            let pauseButton = element.querySelector('.audio__button--pause');
            let durationTime = element.querySelector('.audio__time--duration');
            let playbackBar = element.querySelector('.audio__bar-outer');
            let playbackBarInner = element.querySelector('.audio__bar-inner');
            let currentTimeDisplay = element.querySelector('.audio__time--current');

            let updateInterval;

            let player = element.querySelector('audio');

            player.addEventListener('loadeddata', function () {
                durationTime.innerHTML = formatTime(player.duration);
            });

            player.pause();
            player.load();

            playButton.addEventListener('click', function () {
                pauseEverything();
                playAudio(element, updateInterval);
            });

            pauseButton.addEventListener('click', function () {
                pauseAudio(element, updateInterval);
            });

            playbackBar.addEventListener('click', function (event) {
                const clickX = event.offsetX; // Get click position within the playback bar
                const totalWidth = playbackBar.offsetWidth; // Get total width of the playback bar
                const clickPositionPercent = (clickX / totalWidth); // Calculate click position as a percentage of total width
                const newTime = clickPositionPercent * player.duration; // Calculate new time based on click position

                console.log(clickX);
                console.log(totalWidth);
                console.log(clickPositionPercent);
                console.log(newTime);

                player.currentTime = newTime; // Set the audio current time to new time
                updateProgressBar(currentTimeDisplay, playbackBarInner, player); // Update the progress bar and current time display
            });

            /* player.addEventListener('play', function() {
                console.log('Audio wird abgespielt.');
            });

            player.addEventListener('pause', function() {
                console.log('Audio ist pausiert.');
            });

            player.addEventListener('ended', function() {
                console.log('Audio-Wiedergabe beendet.');
            }); */
        });
    }

    function updateProgressBar(currentTime, playbackBar, player) {
        let percentage = (player.currentTime / player.duration) * 100;
        playbackBar.style.width = `${percentage}%`;
        currentTime.innerHTML = formatTime(player.currentTime);
    }


    function pauseEverything() {
        audio.forEach((element, index) => {
            pauseAudio(element);
        });
    }

    function playAudio(element, updateInterval) {
        let playButton = element.querySelector('.audio__button--play');
        let pauseButton = element.querySelector('.audio__button--pause');
        let player = element.querySelector('audio');
        let audioDetails = element.querySelector('.audio__details');
        let playbackBar = element.querySelector('.audio__bar-inner');
        let currentTime = element.querySelector('.audio__time--current');

        element.classList.add(audioPlaying);

        updateInterval = setInterval(() => {
            updateProgressBar(currentTime, playbackBar, player);
        }, 1000);

        audioDetails.classList.remove(detailsHiddenClass);
       
        playButton.classList.add(buttonHiddenClass);
        pauseButton.classList.remove(buttonHiddenClass);

        player.play();
    }

    function pauseAudio(element, updateInterval) {
        let playButton = element.querySelector('.audio__button--play');
        let pauseButton = element.querySelector('.audio__button--pause');
        let player = element.querySelector('audio');
        let audioDetails = element.querySelector('.audio__details');

        audioDetails.classList.add(detailsHiddenClass);

        playButton.classList.remove(buttonHiddenClass);
        pauseButton.classList.add(buttonHiddenClass);

        element.classList.remove(audioPlaying);

        if (updateInterval) {
            clearInterval(updateInterval);
            updateInterval = undefined;
        }
        
        player.pause();
        player.currentTime = 0
    }

    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secondsLeft = Math.floor(seconds % 60);
        return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    }
});
