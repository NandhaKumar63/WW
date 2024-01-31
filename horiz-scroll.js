
const scrollContainer = document.querySelector('.index__section.projects');
const projectContent = document.querySelector('.projects__wrap');
const projectTitle = document.querySelector('.projects__title__wrap');

let scrollPosition = 0;

scrollContainer.addEventListener('wheel', (event) => {
   
    if (event.deltaY > 0) {
        // Scroll right
        if(scrollPosition <= (projectTitle.clientWidth - scrollContainer.clientWidth)){
            scrollPosition += 100;
        }
       
    } else {
        // Scroll left
        if(scrollPosition >= 100){
            scrollPosition -= 100;
        }
    }

    // Limit scroll position to stay within content bounds
    scrollPosition1 = Math.min(
        projectContent.clientWidth - scrollContainer.clientWidth,
        Math.max(0, scrollPosition)
    );
    scrollPosition2 = Math.min(
        projectTitle.clientWidth - scrollContainer.clientWidth,
        Math.max(0, scrollPosition)
    )
  
    // Apply the scroll using translate3d
    projectContent.style.transform = `translate3d(-${scrollPosition1}px, 0, 0)`;
    projectTitle.style.transform = `translate3d(-${scrollPosition2}px, 0, 0)`;
});
