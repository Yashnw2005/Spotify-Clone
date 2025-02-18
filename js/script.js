let currentSong = new Audio();
let songs = [];
let currFolder = "";

// Function to format time in MM:SS
const secondsToMinutesSeconds = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

// Updated song list
const songList = {
    "Pritam": ["Kesariya-Pritam.mp3", "O_Maahi-Pritam.mp3", "Tum Kya Mile -Pritam.mp3", "Tum se hi - Pritam.mp3"],
    "Arijit": ["O Sajni Re-Arijit Singh.mp3", "Satranga -Arijit Singh.mp3", "tere hawale-Arijit Singh.mp3", "Tujhe Kitna Chahane Lage -Arijit Singh.mp3"],
    "A.R.Rehman": ["Kun Faya Kun - A.R.Rehman.mp3", "Maahi Ve - A.R Rehman.mp3", "tere bina - A R rehman.mp3", "Ye Haseen Wadiyan -AR Rehman.mp3"],
    "Vishal-Shekhar": ["Dil Diyan Gallan - Vishal Shekhar.mp3", "Dus Bahane 2.0 - Vishal Shekhar.mp3", "Jai Jai Shivshankar -Vishal Shekhar.mp3", "Tu Meri -Vishal Shekhar.mp3"]
};

// Function to fetch and display songs
async function getSongs(folder) {
    currFolder = folder;
    songs = songList[folder] || [];
    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = "";
    for (const song of songs) {
        let songName = song.replace(".mp3", "");
        let parts = songName.split("-");
        let title = parts[0].trim();
        let artist = parts.length > 1 ? parts[1].trim() : "Unknown Artist";

        songUL.innerHTML += `
            <li data-song="${song}">
                <img class="invert" width="34" src="img/music.svg" alt="">
                <div class="info">
                    <div>${title}</div>
                    <div>${artist}</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="img/play.svg" alt="">
                </div>
            </li>`;
    }
    document.querySelectorAll(".songList li").forEach(item => {
        item.addEventListener("click", () => {
            playMusic(item.dataset.song);
        });
    });
    return songs;
}

// Play a song
const playMusic = (track, pause = false) => {
    currentSong.src = `songs/${currFolder}/` + track;
    currentSong.load();
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    let songName = track.replace(".mp3", "").split("-")[0].trim();
    document.querySelector(".songinfo").innerHTML = decodeURI(songName);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

// Hamburger Menu Functionality
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
});

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
});

document.addEventListener("click", (event) => {
    if (!document.querySelector(".left").contains(event.target) && !document.querySelector(".hamburger").contains(event.target)) {
        document.querySelector(".left").style.left = "-120%";
    }
});

// Main function
async function main() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", async (event) => {
            let folder = event.currentTarget.dataset.folder;
            songs = await getSongs(folder);
            if (songs.length > 0) {
                playMusic(songs[0], true);
            }
        });
    });
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });
    currentSong.addEventListener("timeupdate", () => {
        let progress = (currentSong.currentTime / currentSong.duration) * 100;
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = progress + "%";
    });
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });
    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        document.querySelector(".volume>img").src = currentSong.volume > 0 ? "img/volume.svg" : "img/mute.svg";
    });
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = "img/mute.svg";
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = "img/volume.svg";
            currentSong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });
    previous.addEventListener("click", () => {
        let index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").slice(-1)[0]));
        playMusic(index > 0 ? songs[index - 1] : songs[songs.length - 1]);
    });
    next.addEventListener("click", () => {
        let index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").slice(-1)[0]));
        playMusic(index + 1 < songs.length ? songs[index + 1] : songs[0]);
    });
    currentSong.addEventListener("ended", () => {
        let index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").slice(-1)[0]));
        playMusic(index + 1 < songs.length ? songs[index + 1] : songs[0]);
    });
    document.getElementById("previous").style.display = "inline-block";
    document.getElementById("next").style.display = "inline-block";
}
main();
