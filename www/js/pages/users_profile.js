var userId_profile = $('#user_id').attr("value"); 
var serviceURL = "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/Images/user_images/"+userId_profile;
var userId = localStorage.getItem("userId");

$( document ).ready(function() {
	getUserImages();
	getUserData();
	//onclick follow button 
		
		$(".follow-unfollow").click(function (e) {
            
            var unfollow = $.trim($(this).text())
            if (unfollow == "unfollow") {
                $(this).contents().filter(function () {  // find the text node inside the button
                    return this.nodeType == 3
                }).replaceWith('follow');
				$(".follow-unfollow").attr("id","")
				$(".follow-unfollow").attr("id","user_profile_follow")


            } else {
                $(this).contents().filter(function () {
                    return this.nodeType == 3
                }).replaceWith('unfollow');
$(".follow-unfollow").attr("id","")
				$(".follow-unfollow").attr("id","user_profile_unfollow")
            }
            $.ajax({
                type: "POST",
                url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/follow_user",
                dataType: 'json',
                crossDomain: true,
                data: {user_id:userId, follow_id:userId_profile},
                success: function (response) {
                    console.log('ajax2');

                }

            });
        });
	
});

function getUserData() {
 $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/users/is_follow/"+userId+"/"+userId_profile,
	      dataType:'json',		
           crossDomain: true,
           async:false,
                cache:false,
            success: function (response)
            {
			
			$("#user_profile_facebook").attr("src","http://graph.facebook.com/"+response[0][0].user_id+ "/picture");
			var newname=response[0][0].user_name.substr(0,response[0][0].user_name.indexOf(' '));
			$("#user_name").html(newname);
			$("#profile_name").html(response[0][0].user_name);
		$("#profile_quote span").html(response[0][0].user_bio);
		if(response[1]==true)
		{
									
				$('#users_profile_follow').append('<button type="button" id="user_profile_unfollow" class="follow-unfollow">unfollow</button>');
		} else 
		{
			
			$('#users_profile_follow').append('<button type="button" id="user_profile_follow"   class="follow-unfollow">follow</button>');
							
		}	
		
		
			

			



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
         },
         error: function (xhr, ajaxOptions, thrownError) {
		 alert(ajaxOptions);
         }
     });
}