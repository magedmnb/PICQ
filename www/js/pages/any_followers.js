var userId = localStorage.getItem("userId");
var any_user = $('#user_id').attr("value");

 $( document ).ready(function() {
 $("#where_id").attr("value","users_profile");
	$('#user_name').html("Followers");
	
	getUserFollowers();
	
});



function getUserFollowers() {

        $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/user_followers/"+any_user+"/"+userId,
            dataType: 'json',
            crossDomain: true,

            success: function (response) {
                console.log('success');
			
                console.log(response);
                console.log("here");
		for(i=0;i<response.length; i++)
			{
			if(response[i].stauts==="follow"){

		$('#comment_ul').append('<li id="li'+i+'"><img src="http://graph.facebook.com/'+response[i].user_id+ '/picture"  id="q-image4" /> <a class="follower_name">'+response[i].user_name+'</a> <button id="unfollow" class="follow-unfollow"  x="'+response[i].user_id+'">unfollow</button></li></br>');

}
else if(response[i].stauts==="unfollow"){

$('#comment_ul').append('<li id="li'+i+'"><img src="http://graph.facebook.com/'+response[i].user_id+ '/picture"  id="q-image4" /> <a class="follower_name">'+response[i].user_name+'</a> <button id="follow" class="follow-unfollow"  x="'+response[i].user_id+'">follow</button></li></br>');


}else{

	$('#comment_ul').append('<li id="li'+i+'"><img src="http://graph.facebook.com/'+response[i].user_id+ '/picture"  id="q-image4" /> <a class="follower_name">'+response[i].user_name+'</a> </li></br>');
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
                url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/follow_user",
                dataType: 'json',
                crossDomain: true,
                data: {user_id:userId, follow_id: followerid},
                success: function (response) {
                    console.log('ajax2');

                }

            });
        });
            }
        });
}