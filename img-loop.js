

// JavaScript
const projects = document.querySelectorAll(".projects__item");
projects.forEach((container)=>{
  const images = container.querySelectorAll(".projects__item__loop picture, .projects__item__logo");
  let currentIndex = 0;
  let timer;
  
// Function to display the next image
function showNextImage() {
  images[currentIndex].style.opacity = 0;
  images[currentIndex].style.visibility = 'hidden';
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].style.opacity = 1;
  images[currentIndex].style.visibility = 'visible';
  timer = setTimeout(()=>{
    showNextImage();
  }, 2000);
  
}

// Add hover event listeners
container.addEventListener("mouseenter", showNextImage);
container.addEventListener("mouseleave", ()=>{
clearTimeout(timer);
images[currentIndex].style.opacity = 0;
images[currentIndex].style.visibility = 'hidden';
currentIndex=0;
images[currentIndex].style.opacity = 1;
images[currentIndex].style.visibility = 'visible';
});
});



// Initialize the display
// images[currentIndex].style.display = "block";
