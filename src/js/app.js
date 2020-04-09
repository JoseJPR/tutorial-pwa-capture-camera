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
    console.log(URL.createObjectURL(e.target.files[0]));

    const bufferBlob = new FileReader();
    bufferBlob.onload = function() {
      console.log(this.result);

      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(xhttp.responseText);
          }
      };
      const fileName = 'photo.jpg';
      const fileContent = new Uint8Array(this.result);
      console.log(fileContent);
      xhttp.open('POST', window.location.href + 'upload', true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.send(JSON.stringify({
        fileName,
        fileContent,
      }));
    }
    bufferBlob.readAsArrayBuffer(e.target.files[0]);

    photo.src = URL.createObjectURL(e.target.files[0]);
  });
}