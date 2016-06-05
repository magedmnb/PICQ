$( document ).ready(function() {
	
	//callback button
		document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
		// load selected page on click
		var page = $("#where_id").attr("value");
		$('.content').load(page+'.html', function( response, status, xhr ) {
		// load script on click
		$.getScript('js/pages/'+page+'.js');
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
  }
});
}
	
	//hide sub pages header
$('.users_profile').hide();

// get user id from localstorage 
var userId = localStorage.getItem("userId");
var first_time = localStorage.getItem("first_time");
		

//check local storage
if (first_time == 0)
{
	//load home page
	$('#logo_img').hide();
	$('#nav').hide();
	$('.content').load('suggest.html', function() {
		$(".loader").hide();
	});
	$.getScript('js/pages/suggest.js');
	localStorage.removeItem("first_time");
	
}else if(userId!=null)
{
	//load home page
	$('.content').load('home.html', function() {
		$(".loader").hide();
	});
	$.getScript('js/pages/home.js');
	$("#footer_footer").remove();
} 
else{
	//load home page
	
	$('#main_header').hide();
	$('#home').load('login.html');
	$.getScript('js/pages/login.js');
}

// click to go another page
$( "body" ).on( "click", '.menu a', function() {
			
			
		var come = $("#come_id").attr("value");
		$("#where_id").attr("value",come);
		page=$(this).attr('href');
		user_id = $(this).attr('value');
		$('#user_id').attr("value",user_id);
		
		page = page.slice( 1 );
		
		// remove footer 
		if(page == "home" || page == "profile" || page == "search" || page == "upload" )
		{
			$('.users_profile').hide();
			$(".loader").show();
	$('#logo_img').show();
	$('#nav').show();
			$("#footer_footer").remove();
		}
		// where back and come id
		$("#come_id").attr("value",page);
		//remove nav
		if(page == "users_profile" || page =="photo_comments" || page == "any_followers")
	{
		$('.users_profile').show();
	$('#logo_img').hide();
	$('#nav').hide();
	}
		// load selected page on click
		$('.content').load(page+'.html', function( response, status, xhr ) {
		// load script on click
		$(".loader").hide();
		$.getScript('js/pages/'+page+'.js');
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
  }
});




	});
})