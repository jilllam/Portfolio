//Navbar smooth scroll + active

document.querySelectorAll('.Navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href');
        const target = document.querySelector(targetID);
        if (!target) return;

        // Smooth scroll to target section
        window.scrollTo({
            top: target.offsetTop - 50,
            behavior: "smooth"
        });

        // Update active class
        document.querySelectorAll('.Navbar a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

//Auto highlight navbar on scroll

window.addEventListener("scroll", () => {
    let sections = document.querySelectorAll("div[id]");
    let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop - 100 && scrollPos < sec.offsetTop + sec.offsetHeight) {
            let id = sec.getAttribute("id");
            document.querySelectorAll(".Navbar a").forEach(a => {
                a.classList.remove("active");
                if (a.getAttribute("href") === `#${id}`) {
                    a.classList.add("active");
                }
            });
        }
    });
});

// contact form validation

const form = document.getElementById("contactForm");
if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();
        let name = document.getElementById("Name").value.trim();
        let email = document.getElementById("Email").value.trim();
        let message = document.getElementById("Message").value.trim();
        if(!name || !email || !message){
            alert("Please fill all fields!");
            return;
        }
        alert("Submitted!");
        form.reset();
    });
}

//slideshow 
let aboutSlideIndex = 1;
let aboutSlideTimer;

function showAboutSlides(n) {
    let slides = document.getElementsByClassName("aboutSlides");
    let dots = document.getElementsByClassName("aboutDot");

    if (n > slides.length) aboutSlideIndex = 1;
    if (n < 1) aboutSlideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" activeDot", "");
    }

    slides[aboutSlideIndex - 1].style.display = "block";
    dots[aboutSlideIndex - 1].className += " activeDot";
}

// Manual controls
function plusAboutSlides(n) {
    clearTimeout(aboutSlideTimer);
    aboutSlideIndex += n;
    showAboutSlides(aboutSlideIndex);
    startAboutSlidesAuto();
}

function currentAboutSlide(n) {
    clearTimeout(aboutSlideTimer);
    aboutSlideIndex = n;
    showAboutSlides(aboutSlideIndex);
    startAboutSlidesAuto();
}

// Auto play
function startAboutSlidesAuto() {
    aboutSlideTimer = setTimeout(function () {
        aboutSlideIndex++;
        showAboutSlides(aboutSlideIndex);
        startAboutSlidesAuto();
    }, 3500); // 3.5 seconds per slide
}

// Initialize slideshow
showAboutSlides(aboutSlideIndex);
startAboutSlidesAuto();

//Modal contact form
const modal = document.getElementById("contactModal");
const btn = document.getElementById("contactLink");
const span = document.getElementsByClassName("close")[0];

if(btn){
    btn.onclick = function(e){
        e.preventDefault();
        modal.style.display = "block";
    }
}

if(span){
    span.onclick = function(){
        modal.style.display = "none";
    }
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }
}

// Modal form submission
const modalForm = document.getElementById("modalContactForm");
if(modalForm){
    modalForm.addEventListener("submit", function(e){
        e.preventDefault();
        alert("Submitted! Meow~");
        modalForm.reset();
        modal.style.display = "none";
    });
}

//Navbar slide in on load + hide/show 
const navbar = document.querySelector('.Navbar');
let lastScrollTop = 0;

// Initial hidden navbar above viewport
navbar.style.transform = 'translateY(-100%)';
navbar.style.transition = 'transform 0.5s ease-out';

// Slide in on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
    }, 300); // 0.3s delay
});

// Hide on scroll down, show on scroll up
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop && scrollTop > 100){
        // scrolling down -> hide
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // scrolling up -> show
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
