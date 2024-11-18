document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
        "hop",
        "MO, 8 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1"
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
        {name: "Resume Purrfect", img: "#"},
        {name: "Resume Purrfect", img: "#"},
        {name: "Resume Purrfect", img: "#"},
        {name: "Resume Purrfect", img: "#"},
        {name: "Resume Purrfect", img: "#"},
        {name: "Resume Purrfect", img: "#"},
        {name: "Resume Purrfect", img: "#"},
    ];
    //stopped at 8:26
})