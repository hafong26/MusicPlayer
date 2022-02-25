const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player');
const playlist = $('.playlist')

const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const title = $('header h2')

const btnPlay = $('.btn-toggle-play')
const btnPrev = $('.btn-prev')
const btnNext = $('.btn-next')

const btnRepeat = $('.btn-repeat')
const btnRandom = $('.btn-random')

const audio = $('#audio')
const progress = $('#progress')

var app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    indexRandom: 0,
    randoms: ranNums(0, songs.length - 1),
    loadCurrentSong: function() {
        cdThumb.style.backgroundImage = `url('${songs[this.currentIndex].img}')`
        title.innerText = songs[this.currentIndex].name
        audio.src = songs[this.currentIndex].src
        this.activeSong()
    },
    render: () => {
        var htmls = songs.map((song) =>
            `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.img}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>
            `
        )
        playlist.innerHTML = htmls.join('')
    },
    handleEvents: function() {
        const that = this
        const cdWidth = cd.offsetWidth
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth < 0 ? 0 : newCdWidth + 'px'
            cd.style.opacity = newCdWidth / cdWidth
        }
        btnPlay.onclick = function() {
            if (that.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        audio.onplay = function() {
            player.classList.add("playing");
            that.isPlaying = true
        }
        audio.onpause = function() {
            player.classList.remove("playing");
            that.isPlaying = false
        }

        btnPrev.onclick = function() {

            that.prev()
            that.random()
        }
        btnNext.onclick = function() {
            that.next()
            that.random()
        }
        btnRepeat.onclick = function() {
            if (!that.isRandom) {
                that.isRepeat = !that.isRepeat;
                this.classList.toggle('active', that.isRepeat);
            }
        }
        btnRandom.onclick = function() {
            if (!that.isRepeat) {
                that.isRandom = !that.isRandom;
                this.classList.toggle('active', that.isRandom);
            }

        }
        audio.onended = function() {
            that.repeat();
            that.random()
        }
        audio.ontimeupdate = function() {
            var currentRange = audio.currentTime * 100 / audio.duration
            if (currentRange)
                progress.value = currentRange
        }
        progress.oninput = function() {
            audio.currentTime = this.value * audio.duration / 100
        }
    },
    prev: function() {
        if (this.currentIndex == 0) {
            this.currentIndex = songs.length - 1;
        } else {
            this.currentIndex--
        }
        this.loadCurrentSong();
        audio.play();
    },
    next: function() {
        if (this.currentIndex == songs.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++
        }
        this.loadCurrentSong();
        audio.play();
    },
    repeat: function() {
        if (this.isRepeat) {
            audio.play()
        } else {
            this.next()
        }
    },
    random: function() {
        if (this.isRandom) {
            this.currentIndex = this.randoms[this.indexRandom % this.randoms.length]
            this.indexRandom++;
        }
    },
    activeSong: function() {
        const that = this;
        const songs = $$('.song')
        songs.forEach(function(song, index) {
            song.classList.remove('active')
            song.onclick = function() {
                that.currentIndex = index
                for (i = 0; i < songs.length; i++)
                    songs[i].classList.remove('active')
                song.classList.add('active')
                song.scrollIntoView({ block: "end", behavior: 'smooth' })
                that.loadCurrentSong();
                audio.play()

            }
        })
        songs[this.currentIndex].classList.add('active')
        songs[this.currentIndex].scrollIntoView({ block: "end", behavior: 'smooth' })
    },
    start: function() {
        this.render()
        this.loadCurrentSong()
        this.handleEvents()
    }
}
app.start()
