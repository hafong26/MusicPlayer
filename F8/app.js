// 1. Render songs
// 2. Scroll top
// 3. Play / pause / seek
// 4. CD rotate
// 5. Next / prev
// 6. Random
// 7. Next / repeat when ended
// 8. Active song
// 9. Scroll active song into view
// 10. Play song when click
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player")
const cd = $(".cd");
const heading = $("header h2")
const cdThumb = $(".cd-thumb")
const audio = $("#audio")
const progress = $("#progress")

const randomBtn = $(".btn-random")
const prevBtn = $(".btn-prev")
const playBtn = $(".btn-toggle-play")
const nextBtn = $(".btn-next")
var app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    songs: [{
            name: "Đa Tình",
            singer: "Quinn x Phong DN",
            src: "./music/remixDaTinh.mp3",
            img: "./img/DaTinh.webp",
            id: 1,
        },
        {
            name: "Đêm Định Mệnh",
            singer: "Minh Lý Remix",
            src: "./music/remixDemDinhMenh.mp3",
            img: "./img/DemDinhMenh.webp",
            id: 2,
        },
        {
            name: "Em Là Hoàng Hôn",
            singer: "Vang x Cloud 5",
            src: "./music/remixEmLaHoangHon.mp3",
            img: "./img/EmLaHoangHon.webp",
            id: 3,
        },
        {
            name: "Happy New Year",
            singer: "ABBA",
            src: "./music/remixHappyNewYear.mp3",
            img: "./img/HappyNewYear.webp",
            id: 4,
        },
        {
            name: "In The End",
            singer: "Linkin Park",
            src: "./music/remixInTheEnd.mp3",
            img: "./img/InTheEnd.webp",
            id: 5,
        },
        {
            name: "Khi Anh Qua Thung Lũng",
            singer: "Đạt G",
            src: "./music/remixKhiAnhQuaThungLung.mp3",
            img: "./img/KhiAnhQuaThungLung.webp",
            id: 6,
        },
        {
            name: "Quên Một Người Từng Yêu",
            singer: "Tú Na Cover",
            src: "./music/remixQuenMotNguoiTungYeu.mp3",
            img: "./img/QuenMotNguoiTungYeu.webp",
            id: 7,
        },
        {
            name: "Xem Như Em Chẳng May",
            singer: "Chu Thuý Quỳnh",
            src: "./music/remixXemNhuEmChangMay.mp3",
            img: "./img/XemNhuEmChangMay.webp",
            id: 8,
        },
        {
            name: "Yêu Đừng Sợ Đau",
            singer: "Ngô Lan Hương",
            src: "./music/remixYeuDungSoDau.mp3",
            img: "./img/YeuDungSoDau.webp",
            id: 9,
        },
    ],
    render: function() {
        const htmls = this.songs.map(
            (song) =>
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
        );
        $(".playlist").innerHTML = htmls.join("");
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth;

        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        };

        // Xử lý khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying)
                audio.pause()
            else audio.play()
        };
        // Khi phát bài hát
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumb.style.animationPlayState = 'running'
        }

        // Khi dừng bài hát
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumb.style.animationPlayState = 'paused'
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        };
        // Khi next bài hát
        nextBtn.onclick = function() {
            _this.nextSong()
            audio.play()
        }

        // Khi prev bài hát
        prevBtn.onclick = function() {
            _this.prevSong()
            audio.play()
        }

        // Khi  
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
    },
    loadCurrentSong: function() {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`
        audio.src = this.currentSong.src
    },
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    start: function() {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lăng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI
        this.loadCurrentSong()

        // Render playlist
        this.render();
    },
};
app.start();