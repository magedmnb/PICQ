$( document ).ready(function() {
	
	$(".active1").removeAttr("id");
	$(".active").removeAttr("id");
	$(".active2").removeAttr("id");
	$(".active3").attr("id","nav_links_background");
	selectOption();
	
	 
	 
            
            function DropDown(el) {
                this.dd = el;
                this.placeholder = this.dd.children('span');
                this.opts = this.dd.find('ul.dropdown > li');
                this.val = '';
                this.index = -1;
                this.initEvents();
            }
            DropDown.prototype = {
                initEvents : function() {
                    var obj = this;

                    obj.dd.on('click', function(event){
                        $(this).toggleClass('active');
                        return false;
                    });

                    obj.opts.on('click',function(){
                        var opt = $(this);
                        obj.val = opt.text();
                        obj.index = opt.index();
                        obj.placeholder.text(obj.val);
						selectedoption = $(this).attr("value");
						if(selectedoption==1)
						{
						selectedoption = "all";
						}
                    });
                },
                getValue : function() {
                    return this.val;
                },
                getIndex : function() {
                    return this.index;
                }
            }

            $(function() {

                var dd = new DropDown( $('#dd') );

                $(document).click(function() {
                    // all dropdowns
                    $('.wrapper-dropdown-3').removeClass('active');
                });

            });

    });
	
	$("#btnsearch").click(function (e) {
	$('#result').find("li").remove();
	$(".loader").show();
	if($('#search_input').val()=="")
	{	
	
		$.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/images/search_category/"+selectedoption,
	      dataType:'json',		
           crossDomain: true,
		async:false,
                cache:false,
            success: function (response)
            {
				$(".loader").hide();
	if(response.length==0){
		$('#result').find("li").remove();
		$('#error').find("span").remove();
		$('#error').append('<span>There Is No Result For "'+name+'"  </span>');
		}else{
		$('#error').find("span").remove();
	for(j=0;j<response.length;j++)
		{
		
		
			$('#result').append('<li class="menu" id="li'+j+'"><a href="#photo_comments" value="'+response[j].image_id+'"><img value="'+response[j].image_id+'" src="http://www.idesignarch.net/important/CodeIgniter-3.0.0/assets/uploads/'+response[j].image+'" /></a></li>');
		
		}
	}
	
		

 	},
	error: function (response)
	{
		
		console.log('error');
	}
        });

	}else{
	
	name=$('#search_input').val();

	
	$.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/images/search/"+name+"/"+selectedoption,
	      dataType:'json',		
           crossDomain: true,
		async:false,
                cache:false,
            success: function (response)
            {
$(".loader").hide();
	if(response.length==0){
		$('#result').find("li").remove();
		$('#error').find("span").remove();
		$('#error').append('<span>There Is No Result For "'+name+'"  </span>');
		}else{
		$('#error').find("span").remove();
	for(j=0;j<response.length;j++)
		{
		
		
		$('#result').append('<li class="menu" id="li'+j+'"><a href="#photo_comments" value="'+response[j].image_id+'"><img class="large" value="'+response[j].image_id+'" src="http://www.idesignarch.net/important/CodeIgniter-3.0.0/assets/uploads/'+response[j].image+'" /></a></li>');
		
		}
	}
	
		

 	},
	error: function (response)
	{
		
		console.log('error');
	}
        });


	}



});

	/*function getCategory() {
$.ajax({
            type: "GET",
            url: "http://www.idesignarch.net/important/CodeIgniter-3.0.0/index.php/api/images/category_info",
	      dataType:'json',		
                      crossDomain: true,
 async:false,
                cache:false,

            success: function (response)
            {

		for(i=0;i<response.length;i++)
		{
		$('#cat').append('<li><a value="'+response[i].category_id+'" > '+response[i].category_name+'</a></li>');
		}

	    }
	});
 } */
 
 function selectOption() {
  selectedoption="all";
$('#cat').on('change', function() {
	selectedoption=this.value;
  // or $(this).val()
});
 
 
 }