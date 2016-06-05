var userId_profile = $('#user_id').attr("value"); 
var user_name = $('#user_name_send').attr("value");

var userId = localStorage.getItem("userId");

$( document ).ready(function() {
	$('#user_name').html("Details");
	$("#q-image2").attr("src","http://graph.facebook.com/"+userId+ "/picture");
	getImageData();
	addComment();
	
});

function myTimer(time_now){
			
        
			time = new Date();
      			var hours = time.getHours();
        		var minutes = time.getMinutes();
        		var seconds = time.getSeconds() ;
			var yyyy = time.getFullYear().toString();
       			var mm = (time.getMonth()+1).toString(); // getMonth() is zero-based
        		var dd  = time.getDate().toString();
			 var test = yyyy +"/"+ (mm[1]?mm:"0"+mm[0]) +"/"+ (dd[1]?dd:"0"+dd[0])+" "+hours+":"+minutes+":"+seconds;
			var cal_time = Math.abs(new Date(test)-new Date(time_now.replace(/-/g,'/')));
			
			var date = new Date(cal_time);
       			var str = '';
			if(date.getUTCDate()-1 >0)
			{
        		str = date.getUTCDate()-1 + " Day ";
				return str ;
			}
			else if(date.getUTCHours()>0)
			{
        		str = date.getUTCHours() + " HOUR "; 
				return str ;
			}else
			{
        		str = date.getUTCMinutes() + " MINUTE  ";
				return str ;
			}
			
			}	

function getImageData() {
			     $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/images/image_info/"+userId_profile+"/"+userId,
            dataType: 'json',
            crossDomain: true,
async:false,
                cache:false,
            success: function (response) {
				
				$(".comment_user_img").attr("src","http://graph.facebook.com/"+response[7][0].user_id+ "/picture");
				var time_now =myTimer(response[9][0].image_date);
				$("#timer").html(time_now);
				$("#comment_user_name").html(response[7][0].user_name);
				/*if(response[7][0].user_id != userId)
				{
					$("#comment_user_name").attr("value" , response[7][0].user_id);
					$("#comment_user_name").attr("href" , "#users_profile");
				}else
				{
					$("#comment_user_name").attr("href" , "#profile");
				}*/
				
				$("#comment_img_desc").html(response[8][0].image_description);
				$(".like-unlike").attr("name",response[5]);
				  for(i=0;i<response[4].length;i++)
                {
					$("#comment_img_tags").html(response[4][i].tag_name+",");
					}
				
				$('#post_image').attr('src','http://www.idesignarch.net/important/CodeIgniter-3.0.0/assets/uploads/'+response[6][0].image);
                $("#comment_likes_count").html(response[2][0].count_likes+'Likes &nbsp&nbsp');
                $("#comment_comment_count").html(response[1].count_comments+'Comment');

		if(response[5]=='like'  )
			{
			
			$("#comment_like_png").attr("src","images/heart full.png");
			} else 
			{
			$("#comment_like_png").attr("src","images/heart.png");
			}
                for(i=0;i<response[0].length;i++)
                {
					if(response[0][i].u_id==userId)
					{
						  $("#comment_ul").append('<li> <div class="all_comments menu"><img id="q-image3" src="http://graph.facebook.com/'+response[0][i].u_id+ '/picture" /><p id="comment_time"> </p> <a class="commenter_name" href="#profile" >'+response[0][i].user_name+'</a> <div class="comment_show">' + response[0][i].comment + '</div> </div> </li>');
					}else
					{
						  $("#comment_ul").append('<li> <div class="all_comments menu"><img id="q-image3" src="http://graph.facebook.com/'+response[0][i].u_id+ '/picture" /><p id="comment_time"> </p> <a class="commenter_name" href="#users_profile" value="'+response[0][i].u_id+'">'+response[0][i].user_name+'</a> <div class="comment_show">' + response[0][i].comment + '</div> </div> </li>');
					}
                  

                }


            
	//onclick like button 
		
		
		$(".like-unlike").click(function (e) {
		var imageId=userId_profile;
		var like_or_unlike = $(this).attr("name");
		if(like_or_unlike == 'like')
		{
			$(this).attr("src","images/heart.png");
			$(this).attr("name","unlike");
			var like_count= $("#comment_likes_count").text();
			like_count=parseInt(like_count)-1;
			$("#comment_likes_count").html(like_count+'Likes &nbsp&nbsp');
			
			
			} else 
			{
			$(this).attr("src","images/heart full.png");
			$(this).attr("name","like");
		    var like_count= $("#comment_likes_count").text();
			like_count=parseInt(like_count)+1;
			$("#comment_likes_count").html(like_count+'Likes &nbsp&nbsp');
			
				
			}
		$.ajax({
            type: "POST",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/user_likes",
	      dataType:'json',
                async:false,
                cache:false,		  
           crossDomain: true,
		data:{user_id:userId,img_id:userId_profile},
            success: function (response)
            {
			
				

 	},
                                                          
        });
		
		
	
		});
	}
        });

	}

function addComment() {
  $("#button_comment").on('click', function () {
        var comment = $("#comment_text").val();
		
		 
		if(comment == "")
		{
			
		}else{
			var comnt = $("#comment_comment_count").text();
			comnt=parseInt(comnt)+1;
			$("#comment_comment_count").html(comnt+"Comments");
			alert(comnt);
			//$("#comment_comment_count").html(comnt+1+'Comment');
       // var uid= localStorage.getItem("userId");
        //var picId=$("#pic").attr("x");
        $.ajax({
            type: "POST",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/images/add_comment",
            dataType:'json',
            crossDomain: true,
			async:false,
                cache:false,
            data:{u_id:userId,img_id:userId_profile,comment:comment},
            success: function (response)
            {
                console.log('ajax2');


            }
        });
		
			     $("#comment_ul").append('<li> <div class="all_comments menu"><img id="q-image3" src="http://graph.facebook.com/'+userId+ '/picture" /><p id="comment_time"> </p> <a class="commenter_name" href="#profile">'+user_name+'</a> <div class="comment_show">' + comment + '</div> </div> </li>');
				 $("#comment_text").val("");
					
       
        

		}


    });
       
        


}