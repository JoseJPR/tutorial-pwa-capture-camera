window.onload = function(e){ 

  // Declare init HTML elements
  const camera = document.querySelector('#camera');
  const photo = document.querySelector('#photo');
  const open = document.querySelector('#open');

  // Event to active input type file
  open.addEventListener('click', function(){
    camera.click();
  });
  
  // Event on change content type file
  camera.addEventListener('change', function(e) {
    // Create url object and show Photo from BLOB Object.
    photo.src = URL.createObjectURL(e.target.files[0]);

    // Create Http Request Instance.
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) console.log(xhttp.responseText);
    };
    // Create Data Form Instance.
    const formData = new FormData();
    // Add blob object into instance.
    formData.append("photo", e.target.files[0]);
    // Open and send data to endpoint /upload
    xhttp.open('POST', window.location.href + 'upload', true);
    xhttp.send(formData);
  });
}