// function of tags 
$(function(){
	$(".active1").removeAttr("id");
	$(".active").removeAttr("id");
	$(".active3").removeAttr("id");
	$(".active2").attr("id","nav_links_background");
	//categor 
	cat = 1;
	
$(".loader").hide();
  $('#tags input').on('focusout',function(){    
    var txt= this.value.replace(/[^a-zA-Z0-9\+\-\.\#]/g,''); // allowed characters
    if(txt) {
     $(this).before('<span class="tag">'+ txt.toLowerCase() +','+'</span>');
    }
    this.value="";
  }).on('keyup',function( e ){
    // if: comma,enter (delimit more keyCodes with | pipe)
    if(/(188|13)/.test(e.which)) $(this).focusout(); 

  });
  
  
  $('#tags').on('click','.tag',function(){
     if(confirm("Really delete this tag?")) $(this).remove(); 
  });






// function of dropdown list
     function DropDown(el) {
                this.dd = el;
                this.placeholder = this.dd.children('span');
                this.opts = this.dd.find('ul.dropdown > li');
                this.val = '';
                this.index = -1;
                this.initEvents();
            }
            DropDown.prototype = {
                initEvents : function() {
                    var obj = this;

                    obj.dd.on('click', function(event){
                        $(this).toggleClass('active');
                        return false;
                    });

                    obj.opts.on('click',function(){
                        var opt = $(this);
                        obj.val = opt.text();
                        obj.index = opt.index();
                        obj.placeholder.text(obj.val);
						 cat = $(this).attr("value");
						 
					
                    });
                },
                getValue : function() {
                    return this.val;
                },
                getIndex : function() {
                    return this.index;
                }
            }

            $(function() {

                var dd = new DropDown( $('#dd') );

                $(document).click(function() {
                    // all dropdowns
                    $('.wrapper-dropdown-3').removeClass('active');
                });

            });
});

//get userid from loacl storage
var userId = localStorage.getItem("userId");

    var deviceReady = false;

    /**
     * Take picture with camera
     */
    function takePicture() {
	
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
               
                img.src = uri;
            },
            function(e) {
                console.log("Error getting picture: " + e);
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI});
    };

    /**
     * Select picture from library
     */
    function selectPicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
               
				
                img.src = uri;
            },
            function(e) {
                console.log("Error getting picture: " + e);
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI , sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    };
    
    /**
     * Upload current picture
     */
    function uploadPicture() {
	$(".loader").show();
		
	var userId = localStorage.getItem("userId");

		var alltags=$('#tags span').text();
		var arr = alltags.split(',');
			var txt = '[]';
			 
	 

var data = JSON.parse(txt);
var len = arr.length;

		$.each(arr,function( index, value ) {
		   if (index == len - 1) {
              
          }else{
data.push({        //add the employee
    tag_name:""+value
});
}
  });
  

var txt = data ;

    	var image_name = $("#name").val();
		var desc = $("#desc").val();
		if(!image_name)
		{
			alert("plz enter name");
			$(".loader").hide();
		}else
		{
    	// Get URI of picture to upload
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
		
		var name=imageURI.substr(imageURI.lastIndexOf('/')+1);
		
        if (!imageURI ||(img.style.display == "none")) {
           alert("take pic first");
            return;
        }
        
        // Verify server has been entered
        server = document.getElementById('serverUrl').value;
        if (server) {

            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=image_name;
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
			alert("upload complete");
			$(".loader").hide();
			//var tag_name = $("#tag_name").val();
			
           
                                                        $.ajax({
                                                            type: "POST",
                                                            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/Images/user_image",
                                                            crossDomain: true,
															async:false,
                cache:false,
                                                            beforeSend: function () {
                                                              
																
                                                            },
                                                            complete: function () {
                                                             
																
                                                            },
                                                            data: {name:image_name , description: desc, category: cat, userid: userId, tags_name:txt},
                                                            dataType: 'json',
                                                            success: function (response) {
                                                                //console.error(JSON.stringify(response));
                                                        
                                                              

                                                               
                                                            },
                                                            // error send data to service
                                                            error: function (jqXHR, textStatus, errorThrown) {
                                                             
                                                            }
                                                        });

                                                        // end ajax that send data to web service            	
            }, function(error) {
                //alert( "Upload failed: Code = "+error.code);            	
            }, options);
        }
    }

	}
    
    /**30
     * Function called when page has finished loading.
     */
    function init() {
        document.addEventListener("deviceready", function() {deviceReady = true;}, false);
        window.setTimeout(function() {
            if (!deviceReady) {
                alert("Error: PhoneGap did not initialize.  Demo will not run correctly.");
            }
        },2000);
    }

 


 