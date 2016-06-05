
	
     $( document ).ready(function() {
		 
		var userId = localStorage.getItem("userId");
		  $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/first_users/"+userId,
            dataType: 'json',
            crossDomain: true,
			async:false,
                                                            cache:false,
            success: function (response) {
           
		for(i=0;i<response.length; i++)
			{
				$('#suggestlist').append('<li id="li'+i+'"><img src="http://graph.facebook.com/' +response[i].user_id+ '/picture" id="q-image4" /><a class="follower_name">'+response[i].user_name+'</a> <span></span><button type="button"  x="'+response[i].user_id+'" id="follow" class="follow-unfollow">follow</button></li></br>');
			



               		}

		//onclick follow button 
		
		$(".follow-unfollow").click(function (e) {
			
            var followerid = $(this).attr('x');
            console.log(followerid);
            var unfollow = $.trim($(this).text())
            if (unfollow == "unfollow") {
				$(this).css("background","#F2B63D");
                $(this).contents().filter(function () {  // find the text node inside the button
                    return this.nodeType == 3
                }).replaceWith('follow');


            } else {
				$(this).css("background","#989692");
                $(this).contents().filter(function () {
					
                    return this.nodeType == 3
                }).replaceWith('unfollow');

            }
            $.ajax({
                type: "POST",
                url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/follow_user",
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


  


    });