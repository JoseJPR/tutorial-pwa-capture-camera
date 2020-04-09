window.onload = function(e){ 

  // Declare init HTML elements
  const camera = document.querySelector('#camera');
  const photo = document.querySelector('#photo');
  const open = document.querySelector('#open');

  // Event to active input type file
  open.addEventListener('click', function(e){
    camera.click();
  });
  
  // Event on change content type file
  camera.addEventListener('change', function(e) {
    photo.src = URL.createObjectURL(e.target.files[0]);
  });
}