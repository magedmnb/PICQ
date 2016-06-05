var userId = localStorage.getItem("userId");
var serviceURL = "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/Images/user_images/"+userId;


$( document ).ready(function() {
	$(".active").removeAttr("id");
	$(".active2").removeAttr("id");
	$(".active3").removeAttr("id");
	$(".active1").attr("id","nav_links_background");

	
	getUserImages();
	getUserData();
});
function getUserData() {
 $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/users/user_info/"+userId,
	      dataType:'json',		
           crossDomain: true,
		   
 async:false,
                cache:false,
            success: function (response)
            {
			
			$("#user_profile_facebook").attr("src","http://graph.facebook.com/"+response[0].user_id+ "/picture");
			$("#user_name").html(response[0].user_name);
			$("#profile_name").html(response[0].user_name);
		$("#profile_quote span").html(response[0].user_bio);
		
			

			



	}
	});
	}

function getUserImages() {
  $.ajax({
         url: serviceURL,
         type: "GET",
         crossDomain: true,
         async:false,
                cache:false,
         success: function (result) {
	
             $("#cont").append(result);
				$(".loader").hide();
		 },
         error: function (xhr, ajaxOptions, thrownError) {
		 alert(ajaxOptions);
         }
     });
}