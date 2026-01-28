const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

gsap.registerPlugin(ScrollTrigger);
scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

document.querySelectorAll('nav a, .footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            scroll.scrollTo(targetId);
        }
    });
});

const cursor = document.querySelector("#cursor");
const main = document.querySelector("#main");

document.addEventListener("mousemove", function(dets) {
    gsap.to(cursor, {
        x: dets.x - 7,
        y: dets.y - 7,
        duration: 0.1,
        ease: "power2.out"
    });
});

const interactives = document.querySelectorAll("nav a, button, .custom-file-upload, .stat-box, .team-card, .elem");

interactives.forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 3, backgroundColor: "transparent", border: "1px solid #ff2e2e", duration: 0.2 });
    });
    elem.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, backgroundColor: "#ff2e2e", border: "none", duration: 0.2 });
    });
});

const loaderText = document.querySelector(".loader-text");
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const originalText = loaderText.dataset.value;

let interval = null;
let iteration = 0;

interval = setInterval(() => {
    loaderText.innerText = originalText
    .split("")
    .map((letter, index) => {
        if(index < iteration) return originalText[index];
        return chars[Math.floor(Math.random() * 36)];
    })
    .join("");
    
    if(iteration >= originalText.length) clearInterval(interval);
    iteration += 1/3;
}, 30);

setTimeout(() => {
    gsap.to("#loader", { top: "-100%", duration: 1, ease: "power4.inOut" });
    animateHero();
}, 3500);

function animateHero() {
    gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    });
    gsap.from(".hero-sub h5", {
        x: -50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        stagger: 0.1
    });
}

const page5 = document.querySelector("#page5");
const fixedImage = document.querySelector("#fixed-image");
const elems = document.querySelectorAll(".elem");

page5.addEventListener("mouseenter", function() {
    fixedImage.style.display = "block";
});

page5.addEventListener("mouseleave", function() {
    fixedImage.style.display = "none";
});

elems.forEach(function(e) {
    e.addEventListener("mouseenter", function() {
        var image = e.getAttribute("data-image");
        fixedImage.style.backgroundImage = `url(${image})`;
    });
});

page5.addEventListener("mousemove", function(dets) {
    gsap.to(fixedImage, {
        left: dets.clientX - 150,
        top: dets.clientY - 200,
        duration: 0.2,
        ease: "power2.out"
    });
});

const eventForm = document.getElementById('event-form');
if(eventForm) {
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('event-submit-btn');
        const email = document.getElementById('event-email').value;
        const game = document.getElementById('event-game').value;
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@christuniversity\.in$/;
        if (!emailRegex.test(email)) {
            alert('ACCESS DENIED: Please use your @christuniversity.in email.');
            return;
        }

        btn.innerText = "PROCESSING...";
        btn.style.backgroundColor = "#fff";
        
        setTimeout(() => {
            btn.innerText = "REGISTRATION SUCCESSFUL";
            btn.style.backgroundColor = "#00ff00";
            alert(`HQ CONFIRMED.\nAgent registered for ${game}.\nCheck your email for briefing.`);
            eventForm.reset();
            
            setTimeout(() => {
                btn.innerText = "CONFIRM REGISTRATION";
                btn.style.backgroundColor = "#fff";
            }, 3000);
        }, 2000);
    });
}

const recruitForm = document.getElementById('recruitment-form');
if(recruitForm) {
    recruitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = document.getElementById('recruit-submit-btn');
        const email = document.getElementById('recruit-email').value;
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@christuniversity\.in$/;
        if (!emailRegex.test(email)) {
            alert('ACCESS DENIED: Please use your @christuniversity.in email.');
            return;
        }

        btn.innerText = "TRANSMITTING DOSSIER...";
        btn.style.backgroundColor = "#fff";
        
        setTimeout(() => {
            btn.innerText = "APPLICATION SENT";
            btn.style.backgroundColor = "#00ff00";
            alert('PROTOCOL INITIATED.\nOur Directors will review your application.');
            recruitForm.reset();
            
            setTimeout(() => {
                btn.innerText = "SUBMIT APPLICATION";
                btn.style.backgroundColor = "#fff";
            }, 3000);
        }, 2000);
    });
}

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();