var userId = localStorage.getItem("userId");
var any_user = $('#user_id').attr("value");

 $( document ).ready(function() {
	 $("#where_id").attr("value","users_profile");
    $('.users_profile').show();
	$('#logo_img').hide();
	$('#user_name').html("Likes");
	$('#nav').hide();
	getUserLikes();
	
});



function getUserLikes() {

        $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/likes/"+any_user,
            dataType: 'json',
            crossDomain: true,

            success: function (response) {
                console.log('success');
			
                console.log(response);
		console.log(response[0]);
                console.log("here");
		for(i=0;i<response.length; i++)
			{
			
			if(response[i].image_id == response[0].image_id )
		{
		$('#likeslist').append('<li id="li'+i+'"><a href="#photo_comments" value="'+response[i].image_id+'"><img class="large"  src="http://www.idesignarch.net/important/CodeIgniter-3.0.0/assets/uploads/'+response[i].image+'" /></a></li>');
		}else
		{
			$('#likeslist').append('<li id="li'+i+'"><a href="#photo_comments" value="'+response[i].image_id+'"><img   src="http://www.idesignarch.net/important/CodeIgniter-3.0.0/assets/uploads/'+response[i].image+'" /></a></li>');
		}
               		}

		
            }
        });
}