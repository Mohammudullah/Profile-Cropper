'use strict';
  var CropperModal = document.getElementById('imageCropperModal');
  var imageCropperModal =  new bootstrap.Modal(CropperModal);
  var boxWidth; var boxHeight;
  if(screen.width > 768) {
    boxWidth = 600;
    boxHeight = 400;
  }
  else {
    boxWidth = screen.width - 20;
    boxHeight = 400;
  }

  document.getElementsByClassName('img-container')[0].style.maxWidth = (screen.width - 20)+'px';

  var image = document.getElementById('ImageCropCanvas');
  var actions = document.getElementById('actions');
  var options = {
      aspectRatio: 1 / 1,
      minContainerWidth: boxWidth,
      minContainerHeight: boxHeight,
      maxWidth: boxWidth,
      maxHeight: boxHeight,
      dragMode: 'move',
    };
  
  
    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var uploadedImageType = 'image/jpeg';
    var uploadedImageURL;
    var uploadedImageName;
    var cropper = new Cropper(image, options);

    if (cropper) {
      cropper.destroy();
    }
  
    // Import image
    var inputImagetwo = document.getElementById('imageUploadtwo');
    var inputImage = document.getElementById('imageUpload');

  
  
    // // Buttons
    // if (!$.isFunction(document.createElement('canvas').getContext)) {
    //   $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    // }
  
    // if (typeof document.createElement('cropper').style.transition === 'undefined') {
    //   $('button[data-method="rotate"]').prop('disabled', true);
    //   $('button[data-method="scale"]').prop('disabled', true);
    // }
  
  



  // Methods
  actions.querySelector('.docs-buttons').onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropped;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option') || undefined,
      secondOption: target.getAttribute('data-second-option') || undefined
    };

    cropped = cropper.cropped;

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.clear();
          }

          break;

        case 'getCroppedCanvas':
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }

          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break;
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.crop();
          }

          break;

        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!download.disabled) {
              download.download = uploadedImageName;
              download.href = result.toDataURL(uploadedImageType);
            }
          }

          break;

        case 'destroy':
          cropper = null;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            image.src = originalImageURL;
          }

          break;
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  document.body.onkeydown = function (event) {
    // alert();
    var e = event || window.event;

    if (!cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        cropper.move(0, 1);
        break;
    }
  };
  
  
    // Import image
    var inputImage = document.getElementById('inputImage');
    var URL = window.URL || window.webkitURL;
    var blobURL;
  
    if (URL) {
      inputImage.onchange = function () {
      var files = this.files;
      var file;
  
      if (files && files.length) {
        file = files[0];
  
        if (/^image\/\w+/.test(file.type)) {
          uploadedImageType = file.type;
          uploadedImageName = file.name;
  
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }
  
          image.src = uploadedImageURL = URL.createObjectURL(file);
  
          if (cropper) {
            cropper.destroy();
          }
  
          cropper = new Cropper(image, options);
          imageCropperModal.show();
          inputImage.value = null;
          document.getElementById('cropper_check').style.display = 'block';
          document.getElementById('cropper_loading').style.display = 'none';
        } else {
          window.alert('Please choose an image file.');
        }
      }
    };
  } 

  else {
    inputImage.disabled = true;
    inputImage.parentNode.className += ' disabled';
  };

  document.getElementById('cropper_submit').addEventListener('click', function(){
    document.getElementById('cropper_check').style.display = 'none';
    document.getElementById('cropper_loading').style.display = 'block';
  });

  document.getElementById('cropper_re_upload').addEventListener('click', function(){
    document.getElementById('upload_btn').click();
  });

  CropperModal.addEventListener('hidden.bs.modal', function(){
    if (cropper) {
      cropper.destroy();
    }

      document.getElementById('cropper_check').style.display = 'block';
      document.getElementById('cropper_loading').style.display = 'none';
  });

  