$( document ).ready(function() {
$('.users_profile').hide();
var userId = localStorage.getItem("userId");
if(userId!=null)
{
	//load home page
	$('.content').load('home.html');
	$.getScript('js/pages/home.js');
}else
{
	//load home page
	
	$('#main_header').hide();
	$('#home').load('login.html');
	$.getScript('js/pages/login.js');
}


$( "body" ).on( "click", '.menu a', function() {
		page=$(this).attr('href');
		user_id = $(this).attr('value');
		$('#user_id').attr("value",user_id);
		
		page = page.slice( 1 );
		// load selected page on click
		$('.content').load(page+'.html', function( response, status, xhr ) {
		// load script on click
		$.getScript('js/pages/'+page+'.js');
  if ( status == "error" ) {
    var msg = "Sorry but there was an error: ";
    $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
  }
});




	});
})