
const boxes = document.querySelectorAll(".title--large > div.eli");
boxes.forEach((box,i) => {
  const delay = ((i+1)*200)+'ms';
  box.style.transitionDelay = delay;
  box.style.transform = `translate3d(0,${window.innerHeight}px,0)`;
});

window.addEventListener("scroll", checkBoxes);
checkBoxes();
function checkBoxes() {
  const triggerBottom = (window.innerHeight);
  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if(boxTop > 0){
      if(boxTop < triggerBottom){
        box.style.transform = `translate3d(0,0,0)`
      } else{
        box.style.transform = `translate3d(0,${window.innerHeight}px,0)`
      }
    } 

  });
}



const projectsHandled = document.querySelectorAll(".projects__item ");
projectsHandled.forEach((project,i) => {
  const delay = ((i+1)*200)+'ms';
  project.style.transitionDelay = delay;
});


window.addEventListener("scroll", projectsLoad);
projectsLoad();

function projectsLoad() {
    const triggerBottom = (window.innerHeight/5 )* 4;
    projectsHandled.forEach((project,i) => {
      const projectTop = project.getBoundingClientRect().top;
      if(projectTop > 0){
        if(projectTop < triggerBottom){
          project.style.transform = `translate3d(0,0,0)`
        } else{
          project.style.transform = `translate3d(0,100%,0)`
        }
      } 
  
    });
  }
