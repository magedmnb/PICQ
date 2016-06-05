var userId = localStorage.getItem("userId");

var serviceURL = "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/Images/user_images/"+userId;


$( document ).ready(function() {
$('.users_profile').show();
	$('#logo_img').hide();
	$("#back_id").attr("href","#profile");
	$('#user_name').html("Followers");
	$('#nav').hide();
	getUserFollowers();
	
});



function getUserFollowers() {
 $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/users/followers/"+userId,
            dataType: 'json',
            crossDomain: true,
					async:false,
                                                            cache:false,
            success: function (response) {
                console.log('success');
			
                console.log(response);
                console.log("here");
		for(i=0;i<response.length; i++)
			{
			if(response[i].stauts==="follow"){

		$('#followinglist').append('<div class="followerNum1"> <div class="basics"><div class="userPhoto"><img class ="img" src= "http://graph.facebook.com/' +response[i].user_id+ '/picture" width="90%" height="95%"/> </div><div class="userDetails"><div class="userName"> <div class="name"><span>'+response[i].user_name+'</span></div> <div class="info"><span> Quote.</span></div></div><div class="action"> <div class="follow"><button type="button"  x="'+response[i].user_id+'" class="follow-unfollow">unfollow</button></div></div></div></div> <div class="underLine"> <img src="images/line .png" width="100%" height="80%" />  </div></div>');

}
else{

$('#followinglist').append('<div class="followerNum1"><div class="basics"><div class="userPhoto"><img class ="img" src= "http://graph.facebook.com/' +response[i].user_id+ '/picture" width="90%" height="95%"/></div><div class="userDetails"><div class="userName"> <div class="name"><span>'+response[i].user_name+'</span></div> <div class="info"><span> Quote.</span></div></div><div class="action"> <div class="follow"><button type="button"  x="'+response[i].user_id+'" class="follow-unfollow">follow</button></div></div></div></div> <div class="underLine"> <img src="images/line .png" width="100%" height="80%" />  </div></div>');


}




               }

		//onclick follow button 
		
		$(".follow-unfollow").click(function (e) {
            var followerid = $(this).attr('x');
            console.log(followerid);
            var unfollow = $.trim($(this).text())
            if (unfollow == "unfollow") {
                $(this).contents().filter(function () {  // find the text node inside the button
                    return this.nodeType == 3
                }).replaceWith('follow');


            } else {
                $(this).contents().filter(function () {
                    return this.nodeType == 3
                }).replaceWith('unfollow');

            }
            $.ajax({
                type: "POST",
                url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/users/follow_user",
                dataType: 'json',
                crossDomain: true,
					async:false,
                                                            cache:false,
                data: {user_id:userId, follow_id: followerid},
                success: function (response) {
                    console.log('ajax2');

                }

            });
        });
            }
        });
}