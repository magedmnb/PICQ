/*html=$('article').html();

for(i=0; i<5; i++){
	html+=html;
}

$('#xx').html(html);
*/
var imgId;
	
	
     $( document ).ready(function() {
		 $(".active").attr("id","nav_links_background");
	$(".active2").removeAttr("id");
	$(".active3").removeAttr("id");
	$(".active1").removeAttr("id");
		
		 var userId = localStorage.getItem("userId");
		 
		
		 	 //click to show rate
		$(".post-data").on("click", "#rate", function(event){
			var iddd = $(this).attr("value");
			$("#"+iddd).toggleClass("active_rate");
			
});        
		 
		 
		 //click to show textarea
		$(".post-data").on("click", "#add_comment", function(event){

			var div_id = $(this).attr("value");
			var comment_img_id = $(this).attr("x");
			
		 //add comment
		 $("#single_post_data"+div_id).append(' <div class="comment1" style="position: static"><img id="q-image2" src="" /> <textarea class="comment_textarea" id="comment_text" ></textarea><button id="button_comment" value="'+comment_img_id+'" x="'+div_id+'" class="add_comment">Comment</button></div> ');
          $(this).removeAttr('id');
});                
                       
                   //click to comment    
           		$(".post-data").on("click", "#button_comment", function(event){
						
			var comment = $(this).parent().find('textarea').val();
			
		var imageId=$(this).attr('value');
			var cc_count= $("#conn"+imageId).text();
			
			cc_count=parseInt(cc_count)+1;
			$("#conn"+imageId).html(cc_count+"&nbspComments &nbsp&nbsp");
		
		$.ajax({
            type: "POST",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/images/add_comment",
	      dataType:'json',		
           crossDomain: true,
		      async:false,
                cache:false,
		data:{u_id:userId,img_id:imageId,comment:comment},
            success: function (response)
            {


 	    }
        });
	
		
	$(this).parent().append('<div class="comment_row"><div style="color:red;" class="comm_avatar"></div><div class="comm_content"><p>' + comment + ' <a href="#"></a></p></div></div>');
       $(this).parent().find('textarea').val(" ");
          
});                
           
                
                    
                
                

        //var id = localStorage.getItem("userId");
$('.users_profile').hide();
	$('#logo_img').show();
	$('#nav').show();

        $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/images/home_images/"+userId,
	      dataType:'json',		
           crossDomain: true,
		   async:false,
                cache:false,

            success: function (response)
            {

			$(".loader").hide();
		$(".post-data").empty();
		for(i=0;i<response.data.length; i++)
		{	
		time = new Date();
      			var hours = time.getHours();
        		var minutes = time.getMinutes();
        		var seconds = time.getSeconds() ;
			var yyyy = time.getFullYear().toString();
       			var mm = (time.getMonth()+1).toString(); // getMonth() is zero-based
        		var dd  = time.getDate().toString();
			 var test = yyyy +"/"+ (mm[1]?mm:"0"+mm[0]) +"/"+ (dd[1]?dd:"0"+dd[0])+" "+hours+":"+minutes+":"+seconds;
			var cal_time = Math.abs(new Date(test)-new Date(response.data[i].image_date.replace(/-/g,'/')));
			
			var date = new Date(cal_time);
       			var str = '';
			if(date.getUTCDate()-1 >0)
			{
        		str = date.getUTCDate()-1 + " Day ";
				
			}
			else if(date.getUTCHours()>0)
			{
        		str = date.getUTCHours() + " HOUR "; 
				
			}else
			{
        		str = date.getUTCMinutes() + " MINUTE  ";
				
			}
	    var avg = response[response.data[i].image_id][3].average_rate ;
		if(avg<2)
		{
			img_src="fav.png";
		}
		else if(avg>=2&&avg<4)
		{
			img_src="favorite.png";
		}else
		{
			img_src="favfull.png";
		}
		var img = response.data[i].image_id;
		$(".post-data").attr("id","li"+i);
		$(".post-data").append('<div id="single_post_data'+i+'" ><div class="post-user"><img class="server_image" src="http://graph.facebook.com/' +response.data[i].user_id+ '/picture" />  <div class="user-text menu"><span class="name" style="font-weight:bold;font-size:15px;  margin-top: 7%;margin-left: -7%;"><a  href="#users_profile" value="'+response.data[i].user_id+'" >'+response.data[i].user_name+'</a></span><span class="desc">'+response.data[i].image_description+'</span> <span class="tags"></span></div></div><div class="post-time">'+str+'</div> <div class="z1 menu"> <div class="active_rate" id="'+response.data[i].image_id+'"> <div class="rate"   id="score" x="'+response.data[i].image_id+'" y="'+response[response.data[i].image_id][3].average_rate+'"></div></div><a href="#photo_comments" value="'+response.data[i].image_id+'" ><img src="http://www.idesignarch.net/important/CodeIgniter-3.0.0/assets/uploads/tmp/'+response.data[i].image+'" style=" width: 87%;  height: 202px;border:2px solid #ebebec;" /></a><div class="social-btns"><img id="like'+i+'" x="'+response.data[i].image_id+'" name="'+response[img][5]+'" class="like-unlike" src=""/> <img id="add_comment"  value='+i+' x="'+response.data[i].image_id+'" src="images/comment.png"/><img id="rate" value="'+response.data[i].image_id+'" src="images/'+img_src+'"/></div> </div> <div class="a-meta" style="  margin-left: 7%;margin-top: 0%;;width:100%;"> <input type="hidden"/>  </div><input id="'+i+'"type="hidden" value="'+response.data[i].image_id+'" time="'+str+'" class="hidden_date_element"/></div><hr>');
			setInterval(myTimer,60000);
			if(response[img][5]=='like'  )
			{
			
			$("#like"+i).attr("src","images/heart full.png");
			} else 
			{
			$("#like"+i).attr("src","images/heart.png");
			}
			imgId=$('#'+i).val();
			console.log("count comments");
			$('#single_post_data'+i).append('<span style="color: #38c;font-size: smaller;font-weight: bold;" id="conn'+response.data[i].image_id+'" class="'+img+'" >'+response[imgId][1].count_comments+' comments  </span>');
			for(j=0;j<response[imgId][4].length; j++)
			{
			$('#single_post_data'+i+' .tags').append('&nbsp;&nbsp;'+response[imgId][4][j].tag_name);
			console.log(response[imgId][4][j].tag_name);
			}
			
			//$('#li'+i).append('<span>'+response[imgId][3].average_rate+' rate </span>');
			
			$('#single_post_data'+i).append('<span style="color: #38c;font-size: smaller;font-weight: bold;" class="like'+img+'" >'+response[imgId][2][0].count_likes+' likes </span>');
			
			
		
			
							  
			
			
		}
		//onclick like button 
		
		
		$(".like-unlike").click(function (e) {
		var imageId=$(this).attr('x');
		var like_or_unlike = $(this).attr("name");
		if(like_or_unlike == 'like')
		{
			$(this).attr("src","images/heart.png");
			$(this).attr("name","unlike");
			var like_count= $(".like"+imageId).text();
			like_count=parseInt(like_count)-1;
			$(".like"+imageId).html(like_count+"Likes");
			
			
			} else 
			{
			$(this).attr("src","images/heart full.png");
			$(this).attr("name","like");
			var like_count= $(".like"+imageId).text();
			like_count=parseInt(like_count)+1;
			$(".like"+imageId).html(like_count+"Likes");
			
				
			}
		$.ajax({
            type: "POST",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/api/users/user_likes",
	      dataType:'json',
                async:false,
                cache:false,		  
           crossDomain: true,
		data:{user_id:userId,img_id:imageId},
            success: function (response)
            {
			
				

 	},
                                                          
        });
		
		
	
		});
				

                

            }
			
        });
		
		 $.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/users/user_info/"+userId,
	      dataType:'json',		
           crossDomain: true,
		   
 async:false,
                cache:false,
            success: function (response)
            {
			
			
			$("#user_name_send").attr("value",response[0].user_name);
			
		
	}
	
	});
	function myTimer(){
			 $(".hidden_date_element").each(function(index) {
        
			time = new Date();
      			var hours = time.getHours();
        		var minutes = time.getMinutes();
        		var seconds = time.getSeconds() ;
			var yyyy = time.getFullYear().toString();
       			var mm = (time.getMonth()+1).toString(); // getMonth() is zero-based
        		var dd  = time.getDate().toString();
			 var test = yyyy +"/"+ (mm[1]?mm:"0"+mm[0]) +"/"+ (dd[1]?dd:"0"+dd[0])+" "+hours+":"+minutes+":"+seconds;
			var cal_time = Math.abs(new Date(test)-new Date(response.data[index].image_date.replace(/-/g,'/')));
			
			var date = new Date(cal_time);
       			var str = '';
			if(date.getUTCDate()-1 >0)
			{
        		str = date.getUTCDate()-1 + " Day ";
				
			}
			else if(date.getUTCHours()>0)
			{
        		str = date.getUTCHours() + " HOUR "; 
				
			}else
			{
        		str = date.getUTCMinutes() + " MINUTE  ";
				
			}
			 $(this).attr('time',str);
       			 var x= $(this).attr('time');
        		
        		$(".post-time").eq(index).text(x);
			});
			}
			
			$('.rate').raty({
			 score: function(){return $(this).attr('y');},
			 click: function(score, evt) {
				imagid=this.getAttribute('x');
    			
				$.ajax({
            type: "POST",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/images/image_rates",
	      dataType:'json',		
           crossDomain: true,
		data:{user_id:userId,image_id:imagid,rate:score},
            success: function (response)
            {
	console.log('rate');
	

 	    }
        });
		
	console.log(evt);
		}
		 });
    });