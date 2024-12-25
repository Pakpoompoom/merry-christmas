const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let isPlaying = false;

// ฟังก์ชันสลับระหว่างเล่นและหยุดเพลง
playButton.addEventListener('click', () => {
    if (!audio.src) {
        alert('ไม่พบไฟล์เพลง!');
        return;
    }
    if (isPlaying) {
        audio.pause();
        playButton.textContent = 'Play';
    } else {
        audio.play();
        playButton.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

// โหลดข้อมูลเมื่อไฟล์พร้อม
audio.addEventListener('loadedmetadata', () => {
    if (audio.duration) {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
        durationEl.textContent = `${minutes}:${seconds}`;
    } else {
        durationEl.textContent = "Loading...";
        audio.addEventListener('canplaythrough', () => {
            const duration = audio.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
            durationEl.textContent = `${minutes}:${seconds}`;
        });
    }
});


// อัปเดตเวลาเล่นปัจจุบัน
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime || 0;
    const duration = audio.duration || 1;

    // อัปเดต Progress Bar
    progressBar.value = (currentTime / duration) * 100;

    // อัปเดตเวลา
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    currentTimeEl.textContent = `${minutes}:${seconds}`;
});

// ปรับตำแหน่งการเล่นเมื่อเลื่อน Progress Bar
progressBar.addEventListener('input', () => {
    const duration = audio.duration || 1;
    audio.currentTime = (progressBar.value / 100) * duration;
});

// ตรวจสอบการโหลดไฟล์เสียง
audio.addEventListener('error', () => {
    alert('ไม่สามารถโหลดไฟล์เสียงได้!');
});

// เลือก container สำหรับหิมะ
const snowContainer = document.querySelector('.snow');

// ฟังก์ชันสร้างหิมะ
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // กำหนดขนาด, ตำแหน่ง, และความเร็วแบบสุ่ม
    const size = Math.random() * 5 + 5; // ขนาด 5-10px
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    const position = Math.random() * 100; // ตำแหน่ง X แบบสุ่ม
    snowflake.style.left = `${position}vw`;

    const duration = Math.random() * 3 + 7; // เวลา 7-10 วินาที
    snowflake.style.animationDuration = `${duration}s`;

    snowContainer.appendChild(snowflake);

    // ลบ snowflake เมื่อสิ้นสุด
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

// เริ่มสร้างหิมะทุก 200ms
setInterval(createSnowflake, 200);

document.addEventListener("DOMContentLoaded", function () {
    // Swiper.js
    const swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: false,
    });

    // Music Player
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');

    let isPlaying = false;

    playButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playButton.textContent = 'Play';
        } else {
            audio.play();
            playButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
        durationEl.textContent = `${minutes}:${seconds}`;
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        progressBar.value = (currentTime / duration) * 100;

        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
        currentTimeEl.textContent = `${minutes}:${seconds}`;
    });

    progressBar.addEventListener('input', () => {
        const duration = audio.duration;
        audio.currentTime = (progressBar.value / 100) * duration;
    });
});
