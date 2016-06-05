var userId = localStorage.getItem("userId");

var serviceURL = "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/likes/"+userId;


$( document ).ready(function() {
$('.users_profile').show();
	$('#logo_img').hide();
	$("#back_id").attr("href","#profile");
	$('#user_name').html("Likes");
	$('#nav').hide();
	getUserLikes();
	
});



function getUserLikes() {
    $.ajax({
            type: "GET",
            url: serviceURL ,
            dataType: 'json',
            crossDomain: true,

            success: function (response) {
                console.log('success');
                console.log(response);
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