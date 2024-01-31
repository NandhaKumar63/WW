
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

const splitTypes = document.querySelectorAll('.index__section.about .paragraph .word .word__inner');
splitTypes.forEach((char) => {
  const text = new SplitType(char, {
    types: 'chars'
  });

  gsap.from(text.chars, {
    backgroundPositionX: 0,
    ease: "none",
    stagger: 0.2,
    y: 0,
    opacity: 0,
    transformOrigin: 'top',
    duration: 3,
    scrollTrigger: {
      trigger: char,
      // markers: true,
      scrub: 0.6,
      start: "top 90%",
      end: "top 50%"
    }
  });
});


const container = document.querySelector(".index__section.projects");
const projectWrap = document.querySelector(".projects__wrap");
gsap.to(".projects__wrap", {
  x: () =>  -(document.querySelector(".projects__wrap").offsetWidth - window.innerWidth),
  ease: "sine.out",
  duration: 0.5,
  scrollTrigger: {
    trigger: ".projects__content",
    start: "top top",
    end: (x) => "+=" + (document.querySelector(".projects__wrap").offsetWidth),
    scrub: true,
    onUpdate: (self) => {
      // console.log(self);
      // if(window.innerWidth<700){
      //   projectWrap.style.transform = 'translate(0, 0)';
      //   projectContent.style.transform = 'translate(0, 0)';
      // }
      // Calculate a color based on scroll progress
      // rgb(20 34 83)
      const progress = self.progress;
      const newColor = `rgb(${Math.round(255 - 255 * progress)}, ${Math.round(255 - 255 * progress)}, ${Math.round(255 - 255 * progress)})`;
      const color = `rgb(${Math.round(255 * progress)}, ${Math.round(255 * progress)}, ${Math.round(255 * progress)})`;
      // Update the background color
      container.style.backgroundColor = newColor;
      container.style.color = color;
    }

  },
});

gsap.to(".projects__title__wrap", {
  x: () => -(document.querySelector(".projects__title__wrap").offsetWidth - window.innerWidth),
  ease: "sine.out",
  duration: 0.2,
  scrollTrigger: {
    trigger: ".projects__content",
    start: "top top",
    end: () => "+=" + document.querySelector(".projects__title__wrap").offsetWidth,
    scrub: true,
    pin: true,
    pinSpacing: false
  },
});



gsap.set('.projects__item', {
  y: '100%'
});

gsap.to('.projects__item', {
  y: 0,
  duration: 0.5,
  stagger: 0.2,
  ease: 'linear',
  scrollTrigger: {
    trigger: '.projects__wrap',
    start: 'top 70%',
    end: "+=500px",
    scrub: 0.5,
    // markers: true,
  }
})

// // Project stack FX
let allProjects = gsap.utils.toArray('.index__section.intro .title div');



gsap.fromTo(".index__section.intro .title div",
  {
    y: window.innerHeight
  }, {
  y: -50 + (allProjects.length - 1),
  ease: "sine.out",
  stagger: 0.5,
  duration: 1,
  scrollTrigger: {
    trigger: ".index__section.intro",
    start: () => "top 50px",
    scrub: 1,
    pin: true,
    pinSpacing: false,
    // markers: true
  }
});


gsap.fromTo(".polygon_section.about_us",
  {
    x: '300px'
  }, {
  x: 0,
  duration: 0.2,
  scrollTrigger: {
    trigger: ".polygon_section.about_us",
    start: () => "top 60%",
    scrub: 0.2,
    // markers: true
  }
});


const bannerCaptionSplit = document.querySelectorAll('.banner-caption');

gsap.fromTo(".logo", {
  scale: 0.9,
  opacity: 0.8
}, {
  scale: 1,
  opacity: 1,
  duration: 2,
  repeat: -1,
  yoyo: true
});


function menuClick(){
  const menu = document.querySelector('.menu.u-abs.u-center');
  if(menu){
    if(menu.classList.contains('open')){
      menu.classList.remove('open');
    } else{
      menu.classList.add('open');
    }
  }
}