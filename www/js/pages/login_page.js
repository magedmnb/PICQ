


jQuery( "#index" ).on( "pagecreate", function( event ) { 

var userId = localStorage.getItem("userId");
if(userId!=null)
{
window.location.href = 'home.html';
}

 } )
 

                    // Defaults to sessionStorage for storing the Facebook token
                    //openFB.init({appId: '440092482808900'});

                    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
                     openFB.init({appId: '440092482808900', tokenStore: window.localStorage});
                    var x;

                    // facebook onClick Login 
                    function login() {

                        // show loading image
                        $.mobile.loading('show');

                        //call openfb.js to login to facebook
                        openFB.login(
                                //response of call login status connected
                                        function (response) {
                                            //check if connected to facebook success
                                            if (response.status === 'connected') {
                                                //login success
                                                //call openfb.js to get info from facebook
                                                openFB.api({
                                                    path: '/me',
                                                    success: function (data) {
                                                        alert(JSON.stringify(data));
														 localStorage.setItem("userId",data.id);
														   userId = data.id;
                                                      

                                                        //post data to web services to insert it in database
                                                        $.ajax({
                                                            type: "POST",
															async:false,
                                                            cache:false,
                                                            url: "http://semanticplus.com/maged_socailmedia/CodeIgniter-3.0.0/api/Users/users",
                                                            crossDomain: true,
                                                            beforeSend: function () {
                                                                $.mobile.loading('show')
                                                            },
                                                            complete: function () {
                                                                $.mobile.loading('hide')
                                                            },
                                                            data: {id:data.id , name: data.name, email: data.email, pic: data.id},
                                                            dataType: 'json',
                                                            success: function (response) {
                                                                //console.error(JSON.stringify(response));
                                                                if (response.success) {
																
                                                               window.location.href = 'home.html';
                                                                } else if (response.exist) {
																 window.location.href = 'home.html';

                                                                }
                                                              

                                                               
                                                            },
                                                            // error send data to service
                                                            error: function (jqXHR, textStatus, errorThrown) {
                                                                alert(jqXHR.status);
                                                                alert(textStatus);
                                                                alert(errorThrown);
                                                            }
                                                        });

                                                        // end ajax that send data to web service

                                                    }, // end success func to get my account info
                                                    error: errorHandler});

                                                // hide loading image
                                                $.mobile.loading('hide');

                                                // if login to facebook failed

                                            } else {
                                                alert('Facebook login failed: ' + response.error);
                                            }
                                        }, {scope: 'email,user_friends,public_profile'});
                            }
							// end facebook login func

              

                    function errorHandler(error) {
                        alert(error.message);
                    }
