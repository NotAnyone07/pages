
gsap.set('.cursor',{xPercent:-50, yPercent: -50})

let cursor = document.querySelector('.cursor')
let hand = document.querySelector('.hand')
let title = document.querySelector('.slider-title')

let mouseX;
let mouseY;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(cursor, 0.5, {x: mouseX, y:mouseY})
})

title.addEventListener('mouseenter', () => {
    gsap.to(hand, 1, {
        scale: 1,
        opacity: 1,
        top: '-25px',
        left: '-25px',
        rotate: 0,
        ease: Elastic.easeOut.config(1, 0.3)
    })
})
title.addEventListener('mouseenter', () => {
    gsap.to(cursor, 1, {
        scale: 0,
        opacity: 0,
    })
})

title.addEventListener('mousemove', () => {
    gsap.to(hand, 1, {
        x: mouseX,
        y: mouseY
    })
})

title.addEventListener('mouseleave', () => {
    gsap.to(hand, 0.2, {
        scale: 0,
        opacity: 0,
        top: '10',
        left: '40',
        rotate: 45,
    })
})

title.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
        scale: 1,
        opacity: 1,
    })
})






document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1"
    );

    const slider = document.querySelector(".slider");
    const sliderTitle = document.querySelector(".slider-title");
    const sliderCounter = document.querySelector(
        ".slider-counter p span:first-child"
    );
    const sliderItems = document.querySelector(".slider-items");
    const sliderPreview = document.querySelector(".slider-preview");
    const totalSlides = 7;
    let activeSlideIndex = 1;
    let isAnimating = false;

    const sliderContent = [
        {name: "Resume Purrfect", img: "./assets/img1-1.jpg", link: "https://resume-purrfect-hackhathon-nabirah-siddiqui.vercel.app"},
        {name: "Obys Agency", img: "./assets/img1-2.jpg", link: "https://resume-purrfect-hackhathon-nabirah-siddiqui.vercel.app"},
        {name: "Serene Space", img: "./assets/img2-1.jpg", link: "https://example.com/serene-space"},
        {name: "Gentle Horizon", img: "./assets/img2-2.jpg", link: "https://example.com/gentle-horizon"},
        {name: "Quiet Flow", img: "./assets/img3-1.jpg", link: "https://example.com/quiet-flow"},
        {name: "Meow Meow", img: "./assets/img3-2.jpg", link: "https://example.com/meow-meow"},
        {name: "Soft Whisper", img: "./assets/img4-1.jpg", link: "https://example.com/soft-whisper"},
    ];
    
    
    //stopped at 8:26

    const clipPath = {
        closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%)",
        open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    };

    const slidePositions = {
        prev: {left: "15%", rotation: -90},
        active: {left: "50%", rotation:0},
        next: {left: "85%", rotation: 90},
    };

    function splitTextIntoSpans(element){
        element.innerHTML = element.innerText.split("").map((char)=> `<span>${char === " " ? "&nbsp;&nbsp" : char}</span>`)
        .join("");
    }

    function createAndAnimateTitle(content, direction){
        const newTitle = document.createElement("h1");
        newTitle.innerText = content.name;//issue here
        sliderTitle.appendChild(newTitle);
        splitTextIntoSpans(newTitle);

        newTitle.addEventListener("click", () => {
            window.open(content.link, "_blank");
        });

        const yOffset = direction === "next" ? 60 : -60;
        gsap.set(newTitle.querySelectorAll("span"), {y: yOffset});
        gsap.to(newTitle.querySelectorAll("span"), {
            y:0,
            duration: 1.25,
            stagger: 0.02,
            ease: "hop",
            delay: 0.25,
        });

        const currentTitle = sliderTitle.querySelector("h1:not(:last-child)");
        if (currentTitle) {
            gsap.to(currentTitle.querySelectorAll("span"),{
                y: -yOffset,
                duration: 1.25,
                stagger: 0.02,
                ease: "hop",
                delay: 0.25,
                onComplete: () => currentTitle.remove(),
            })
        }
    }

    function createSlide(content, className) {
        const slide = document.createElement("div");
        slide.className = `slide-container ${className}`;
        slide.innerHTML = `
            <div class="slide-img">
                <img src="${content.img}" alt="${content.name}">
            </div>`;
        return slide;
    }    


    function getSlideIndex(increment) {
        return((activeSlideIndex + increment - 1 + totalSlides)% totalSlides)+1;
    }

    function updateCounterAndHighlight(index){
        sliderCounter.textContent = index;
        sliderItems.querySelectorAll("p").forEach((item, i) => item.classList.toggle("activeItem", i === index - 1));
    }

    function updatePreviewImage(content) {
        const newImage = document.createElement("img");
        newImage.src = content.img;
        newImage.alt = content.name;
        sliderPreview.appendChild(newImage);

        gsap.fromTo(
            newImage, {
                opacity:0
            }, {
                opacity: 1,
                duration: 1,
                ease: "power2.inOut",
                delay : 0.5,
                onComplete: () => sliderPreview.querySelector("img:not(:last-child)")?.remove(),
            }
        );
    }


    function animateSlide(slide,props){
        gsap.to(slide, {...props, duration: 2, ease: "hop"});
        gsap.to(slide.querySelector(".slide-img"),{
            rotation: -props.rotation,
            duration:2,
            ease: "hop",
        });
    }

    function transitionSlides(direction){
        if(isAnimating) return;
        isAnimating = true;

        const [outgoingPos, incomingPos] = direction === "next" ? ["prev", "next"] : ["next", "prev"];


        const outgoingSlide = slider.querySelector(`.${outgoingPos}`);
        const activeSlide = slider.querySelector(".active");
        const incomingSlide = slider.querySelector(`.${incomingPos}`);



        animateSlide(incomingSlide,{
            ...slidePositions.active,
            clipPath: clipPath.open,
        });

        animateSlide(activeSlide,{
            ...slidePositions[outgoingPos],
            clipPath: clipPath.closed,
        });
        gsap.to(outgoingSlide, {scale: 0, opacity:0, duration:2, ease: "hop"});

        const newSlideIndex = getSlideIndex(direction ==="next" ? 2 : -2);
        const newSlide = createSlide(sliderContent[newSlideIndex - 1], incomingPos);
        slider.appendChild(newSlide);
        gsap.set(newSlide,{
            ...slidePositions[incomingPos],
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            opacity: 0,
            clipPath: clipPath.closed,
        });
        gsap.to(newSlide, {scale: 1, opacity: 1, duration: 2, ease: "hop"});


        const newActiveIndex = getSlideIndex(direction === "next" ? 1: -1);
        createAndAnimateTitle(sliderContent[newActiveIndex - 1], direction); //original code had slidepositions instead of slidercontent. But it doesnt work when doing that
        updatePreviewImage(sliderContent[newActiveIndex - 1]);

        setTimeout(() => updateCounterAndHighlight(newActiveIndex), 1000);

        setTimeout(()=> {
            outgoingSlide.remove();
            activeSlide.className = `slide-container ${outgoingPos}`;
            incomingSlide.className = "slide-container active";
            newSlide.className = `slide-container ${incomingPos}`;
            activeSlideIndex = newActiveIndex;
            isAnimating = false;
        },2000);
    }
    slider.addEventListener("click", (e) => {
        const clickedSlide = e.target.closest(".slide-container");
        if (clickedSlide && !isAnimating) {
            transitionSlides(
                clickedSlide.classList.contains("next") ? "next" : "prev"
            );
        }
    });

    Object.entries(slidePositions).forEach(([key, value]) => {
        gsap.set(`.slide-container.${key}`,{
            ...value,
            xPercent: -50,
            yPercent: -50,
            clipPath: key === "active" ? clipPath.open : clipPath.closed,
        });
        if (key !== "active"){
            gsap.set(`.slide-container.${key} .slide-img`,{
                rotation: -value.rotation,
            });
        }
    })

    const initialTitle = sliderTitle.querySelector("h1");
    splitTextIntoSpans(initialTitle);
    gsap.fromTo(
        initialTitle.querySelectorAll("span"),{
            y:60,
        },{
            y: 0,
            duration: 1,
            stagger: 0.02,
            ease: "hop",
        }
    );

    updateCounterAndHighlight(activeSlideIndex);

    sliderItems.querySelectorAll("p").forEach((item, index)=>{
        item.addEventListener("click",()=>{
            if (index + 1 !== activeSlideIndex && !isAnimating) {
                transitionSlides(index + 1 > activeSlideIndex ? "next" : "prev");
            }
        })
    })
})