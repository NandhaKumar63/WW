
import * as THREE from 'three';



  var mouseX = 0,
      mouseY = 0,
      windowHalfX = window.innerWidth / 2,
      windowHalfY = window.innerHeight / 2,
      SEPARATION = 200,
      AMOUNTX = 10,
      AMOUNTY = 10,
      camera,
      scene,
      renderer;
      var autoRotationSpeed = 0.25; // Adjust the automatic rotation speed as needed
      var cameraRadius = 500; // Adjust the camera radius as needed
      var cameraSpeed = 0.5; // Adjust the camera movement speed as needed
      var easingFactor = 0.05; // Adjust the easing factor for smooth interpolation
  init();
  animate();

	function init() {

    
  	var container,
        separation = 100,
        amountX = 50,
        amountY = 50,
        particle;
    
    container = document.createElement( 'div' );
    // document.body.appendChild( container );
    const ele= document.getElementById('webgl--banner');
ele.appendChild(container);

    scene = new THREE.Scene();

    const headerEle = document.querySelector('.header__el');
    renderer = new THREE.WebGLRenderer({ alpha: true }); // gradient; this can be swapped for WebGLRenderer
    renderer.setSize( window.innerWidth, window.innerHeight- headerEle.offsetHeight );
    container.appendChild( renderer.domElement );
    
    camera = new THREE.PerspectiveCamera(
    	75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 100;

		// particles
    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteMaterial({
        map: createCircleTexture(70, '#febd01'), // Create a circle texture
        color: 0xfebd01,
      });
    
    
    const vertices = [];
    for ( var i = 0; i < 85; i ++ ) {
      particle = new THREE.Sprite( material );
      particle.position.x = Math.random() * 2 - 1;
      particle.position.y = Math.random() * 2 - 1;
      particle.position.z = Math.random() * 2 - 1;
      particle.position.normalize();
      particle.position.multiplyScalar( Math.random() * 10 + 450 );
      particle.scale.x = particle.scale.y = 10;
      scene.add( particle );

     const vector = new THREE.Vector3(particle.position.x, particle.position.y, particle.position.z);
     vertices.push(vector);
    //   vertices.push( + 0.10);
    //   vertices.push( + 0.10);
    //   vertices.push( + 0.10);
    }
// Create 10 random triangles
// for (let i = 0; i < 2; i++) {
//   const randomIndices = getRandomTriangleIndices(vertices.length);
  
//   const geometry = new THREE.BufferGeometry();
//   const verticesArray = [
//     0, 0, 0,
//     vertices[randomIndices[0]].x, vertices[randomIndices[0]].y, vertices[randomIndices[0]].z,
//     vertices[randomIndices[1]].x, vertices[randomIndices[1]].y, vertices[randomIndices[1]].z,
//     vertices[randomIndices[2]].x, vertices[randomIndices[2]].y, vertices[randomIndices[2]].z
//   ];
//   geometry.setAttribute('position', new THREE.Float32BufferAttribute(verticesArray, 3));
//   const material = new THREE.MeshBasicMaterial({ color: 0xfebd01, side: THREE.DoubleSide });
//   const triangle = new THREE.Mesh(geometry, material);
//   scene.add(triangle);
// }

// Function to get random indices for a triangle
function getRandomTriangleIndices(maxIndex) {
const indices = [];
while (indices.length < 3) {
  const randomIndex = Math.floor(Math.random() * maxIndex);
  if (!indices.includes(randomIndex)) {
    indices.push(randomIndex);
  }
}
return indices;
}

    console.log(vertices);
    var lineGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    // lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(vertices), 3))

    // lines
    var line = new THREE.Line( lineGeometry, new THREE.LineBasicMaterial( { color: 0xfebd01, opacity: 0.4, transparent: true}) );
    scene.add( line );

    // mousey
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		// document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    // document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		
 		// window.addEventListener( 'resize', onWindowResize, false );

	} // end init();


    // function isValid(value){
    //     if(value !== undefined && value !== null && !isNaN(value)){
    //         return true;
    //     } else {
    //         return false;
    //     }

    // }

	function onWindowResize() {


    const headerEle = document.querySelector('.header__el');

    windowHalfX = window.innerWidth / 2;
    windowHalfY = (window.innerHeight- headerEle.offsetHeight) / 2;

    camera.aspect = window.innerWidth / (window.innerHeight- headerEle.offsetHeight);
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight- headerEle.offsetHeight );

	}

	function onDocumentMouseMove(event) {

  	mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

  }

  function onDocumentTouchStart( event ) {

		if ( event.touches.length > 1 ) {

    	event.preventDefault();

      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }
	}

  function onDocumentTouchMove( event ) {

  	if ( event.touches.length == 1 ) {

    	event.preventDefault();

      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;

		}
	}

	function animate() {
    requestAnimationFrame(animate);
    // updateParticles(); // Add this line to update particle positions
    render();
  }
  
  // function updateParticles() {
  //   const time = Date.now() * 0.0005;
  
  //   for (let i = 0; i < scene.children.length; i++) {
  //     const object = scene.children[i];
  
  //     if (object instanceof THREE.Sprite) {
  //       object.position.x = Math.sin(time * rotationSpeed + i * 0.1) * 500;
  //       object.position.y = Math.cos(time * rotationSpeed + i * 0.1) * 500;
  //       object.position.z = Math.cos(time * rotationSpeed + i * 0.1) * 500;
  //     }
  //   }
  // }


  function render() {
    const time = Date.now() * 0.0005;
  
    // Automatic rotation
    const autoRotationX = Math.sin(time * autoRotationSpeed) * cameraRadius;
    const autoRotationZ = Math.cos(time * autoRotationSpeed) * cameraRadius;
  
    // User interaction control
    const userInteractionX = (mouseX - camera.position.x) * cameraSpeed;
    const userInteractionY = (-mouseY + 200 - camera.position.y) * cameraSpeed;
  
    // Update camera position with smooth interpolation
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, autoRotationX + userInteractionX, easingFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, userInteractionY, easingFactor);
  
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function createCircleTexture(size, color) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
  
    // Draw a circle on the canvas
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  
    // Create a texture from the canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
  
    return texture;
  }
  
  