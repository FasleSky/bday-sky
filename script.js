/* ==========================================================
   VRUTTI BIRTHDAY EXPERIENCE
   Royal Gold + Cosmic Sapphire
   ========================================================== */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

/* ==========================================================
   LOADER
   ========================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

            startTimeline();

        }, 1000);

    }, 1800);

});

/* ==========================================================
   RESIZE
   ========================================================== */

window.addEventListener("resize", () => {

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

});

/* ==========================================================
   STARFIELD
   ========================================================== */

const stars = [];

const STAR_COUNT =
    window.innerWidth < 768
        ? 900
        : 1500;

for (let i = 0; i < STAR_COUNT; i++) {

    stars.push({

        x: Math.random() * width,
        y: Math.random() * height,

        size:
            Math.random() * 2.2,

        speed:
            0.1 + Math.random() * 0.4,

        opacity:
            0.2 + Math.random() * 0.8

    });

}

function drawStars() {

    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {

        star.y += star.speed;

        if (star.y > height) {

            star.y = 0;
            star.x = Math.random() * width;

        }

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,255,255,${star.opacity})`;

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

}

/* ==========================================================
   SHOOTING STARS
   ========================================================== */

function createShootingStar() {

    const holder =
        document.getElementById(
            "shooting-stars"
        );

    const star =
        document.createElement("div");

    star.classList.add(
        "shooting-star"
    );

    star.style.left =
        Math.random() * width + "px";

    star.style.top =
        Math.random() * height * 0.4 + "px";

    holder.appendChild(star);

    gsap.fromTo(

        star,

        {
            x: 0,
            y: 0,
            opacity: 0
        },

        {
            x: -500,
            y: 300,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",

            onComplete: () => {
                star.remove();
            }
        }

    );

}

setInterval(
    createShootingStar,
    5000
);

/* ==========================================================
   PETALS
   ========================================================== */

const petalContainer =
    document.getElementById(
        "petal-container"
    );

function createPetal() {

    const petal =
        document.createElement("div");

    petal.className = "petal";

    petal.style.left =
        Math.random() * width + "px";

    petal.style.top = "-20px";

    petalContainer.appendChild(
        petal
    );

    gsap.to(

        petal,

        {

            y: height + 100,

            x:
                (Math.random() - 0.5) * 250,

            rotation:
                Math.random() * 720,

            duration:
                8 + Math.random() * 8,

            ease: "none",

            onComplete: () =>
                petal.remove()

        }

    );

}

setInterval(
    createPetal,
    700
);

/* ==========================================================
   BUTTERFLIES
   ========================================================== */

const butterflyContainer =
    document.getElementById(
        "butterfly-container"
    );

function spawnButterfly() {

    const butterfly =
        document.createElement("div");

    butterfly.className =
        "butterfly";

    butterfly.innerHTML = "🦋";

    butterfly.style.left =
        Math.random() * width + "px";

    butterfly.style.top =
        Math.random() * height + "px";

    butterflyContainer.appendChild(
        butterfly
    );

    function fly() {

        gsap.to(

            butterfly,

            {

                x:
                    (Math.random() - 0.5)
                    * 300,

                y:
                    (Math.random() - 0.5)
                    * 200,

                duration:
                    4 + Math.random() * 4,

                ease:
                    "sine.inOut",

                onComplete:
                    fly

            }

        );

    }

    fly();

}

for (let i = 0; i < 5; i++) {

    spawnButterfly();

}

/* ==========================================================
   FIREWORKS
   ========================================================== */

function firework(x, y) {

    for (let i = 0; i < 50; i++) {

        const particle =
            document.createElement("div");

        particle.style.position =
            "fixed";

        particle.style.left =
            x + "px";

        particle.style.top =
            y + "px";

        particle.style.width =
            "6px";

        particle.style.height =
            "6px";

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            Math.random() > 0.5
                ? "#ffd979"
                : "#ff89d6";

        particle.style.zIndex =
            "999";

        document.body.appendChild(
            particle
        );

        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            60 +
            Math.random() * 150;

        gsap.to(

            particle,

            {

                x:
                    Math.cos(angle)
                    * distance,

                y:
                    Math.sin(angle)
                    * distance,

                opacity: 0,

                duration:
                    1.5 +

                    Math.random(),

                ease:
                    "power2.out",

                onComplete: () =>
                    particle.remove()

            }

        );

    }

}

document
.getElementById(
    "celebrateBtn"
)
.addEventListener(
    "click",
    () => {

        firework(
            width / 2,
            height / 2
        );

    }
);

document
.addEventListener(
    "click",
    e => {

        firework(
            e.clientX,
            e.clientY
        );

    }
);

/* ==========================================================
   EASTER EGG
   ========================================================== */

let crownClicks = 0;

document
.getElementById("crown")
.addEventListener(
    "click",
    () => {

        crownClicks++;

        if (crownClicks === 5) {

            showPopup(
                "Duck Off 🦆"
            );

        }

        if (crownClicks === 10) {

            showPopup(
                "Lmao 😂"
            );

            crownClicks = 0;

        }

    }
);

function showPopup(text) {

    const popup =
        document.createElement("div");

    popup.innerHTML = text;

    popup.style.position =
        "fixed";

    popup.style.top = "50%";
    popup.style.left = "50%";

    popup.style.transform =
        "translate(-50%,-50%)";

    popup.style.padding =
        "20px 30px";

    popup.style.background =
        "rgba(0,0,0,.8)";

    popup.style.border =
        "1px solid gold";

    popup.style.borderRadius =
        "20px";

    popup.style.zIndex =
        "99999";

    popup.style.fontSize =
        "1.4rem";

    document.body.appendChild(
        popup
    );

    gsap.fromTo(

        popup,

        {
            opacity: 0
        },

        {
            opacity: 1,
            duration: 0.4
        }

    );

    setTimeout(() => {

        gsap.to(

            popup,

            {

                opacity: 0,

                duration: 0.4,

                onComplete: () =>
                    popup.remove()

            }

        );

    }, 2000);

}

/* ==========================================================
   RABBIT CONSTELLATION
   ========================================================== */

function showRabbitConstellation() {

    const rabbit =
        document.createElement("div");

    rabbit.innerHTML = "🐇";

    rabbit.style.position =
        "fixed";

    rabbit.style.right =
        "10%";

    rabbit.style.top =
        "15%";

    rabbit.style.fontSize =
        "40px";

    rabbit.style.opacity =
        "0";

    rabbit.style.zIndex =
        "50";

    document.body.appendChild(
        rabbit
    );

    gsap.to(

        rabbit,

        {

            opacity: 1,

            duration: 2,

            y: -20,

            repeat: 1,

            yoyo: true,

            onComplete: () => {

                rabbit.remove();

            }

        }

    );

}

setTimeout(
    showRabbitConstellation,
    18000
);

/* ==========================================================
   TIMELINE
   ========================================================== */

function startTimeline() {

    gsap.from(
        "#intro",
        {

            opacity: 0,

            y: 50,

            duration: 2

        }
    );

    gsap.from(
        "#vruttiName",
        {

            scale: 0.5,

            opacity: 0,

            duration: 2,

            delay: 2
        }
    );

    gsap.from(
        "#crown",
        {

            y: -80,

            opacity: 0,

            duration: 1.5,

            delay: 2.5
        }
    );

    gsap.from(
        ".glass-card",
        {

            y: 100,

            opacity: 0,

            duration: 2,

            delay: 4
        }
    );

}

/* ==========================================================
   ANIMATION LOOP
   ========================================================== */

function animate() {

    drawStars();

    requestAnimationFrame(
        animate
    );

}

animate();