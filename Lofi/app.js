const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const player = $('.player')
const waveSound = $('.wave-sound')
const audio = $('#audio')

const btnPrev = $('.btn-prev')
const btnPlay = $('.btn-toggle-play')
const btnNext = $('.btn-next')

const title = $('header h2')
const singer = $('header h3')

const startMinute = $('.start-minute')
const startSecond = $('.start-second')
const endMinute = $('.end-minute')
const endSecond = $('.end-second')
const range = $('.progress input')

var a = setInterval(this.progress, 1000)
var app = {
    songs: lofi,
    currentIndex: 0,
    isPlaying: false,
    loadCurrentSong: function() {
        title.textContent = this.songs[this.currentIndex].name
        singer.textContent = this.songs[this.currentIndex].singer
        audio.src = `./Lofi/${this.currentIndex}.mp3`

    },
    handleEvents: function() {
        _this = this
        btnPlay.onclick = function() {
            if (this.isPlaying) {
                audio.pause()
                this.isPlaying = false
            } else {
                audio.play()
                this.isPlaying = true

            }

        }
        btnNext.onclick = () => {
            this.currentIndex = this.currentIndex == this.songs.length - 1 ? 0 : this.currentIndex + 1
            this.loadCurrentSong()
        }
        btnPrev.onclick = () => {
            this.currentIndex = this.currentIndex == 0 ? this.songs.length - 1 : this.currentIndex - 1
            this.loadCurrentSong()
        }
        audio.onplay = () => {
            player.classList.add('playing')
            waveSound.classList.add('active')
            setInterval(this.progress, 1000)

        }
        audio.onpause = () => {
            player.classList.remove('playing')
            waveSound.classList.remove('active')
            clearInterval(a)
        }

    },
    playing: function() {
        audio.play()
    },
    progress: function() {
        let start = audio.currentTime
        let a = (start / 120).toFixed().padStart(2, 0)
        let b = (start % 60).toFixed().padStart(2, 0)
        console.log(start, start.toFixed(), a, b)
        startMinute.innerText = a
        startSecond.innerText = b
    },
    logger: function() {
        console.log(1)
    },
    start: function() {
        this.loadCurrentSong()
        this.handleEvents()
    }
}
app.start()