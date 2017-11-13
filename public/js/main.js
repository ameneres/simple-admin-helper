$( document ).ready(function() {

	console.log('está a funcionar');

	function activateSearch(){
		$( ".version-row" ).click(function() {
			$(".version-row").removeClass("selected");
		    $(this).addClass("selected");
		    var term = '';

		    $(this).each(function() {
  				$.each(this.attributes, function() {
				    // this.attributes is not a plain object, but an array
				    // of attribute nodes, which contain both the name and value
				    if(this.specified && this.name.includes('data')) {
				      term += this.value + ' ';
				    }
				});
  			});
		    var csrf = $('meta[name=csrf_token]').attr("content");
		    var url = '/search';

		 	console.log(term);
		  // Send the data using post
		  var posting = $.post( url, { _csrf: csrf, search: term } );
		 
		  // Put the results in a div
		  posting.done(function( data ) {
		  	//console.log(data);
		    //var content = $( data ).find( "#content" );
		    $( "#result" ).empty().append( data );
		  });
		});	
	}
	

	$( ".brand" ).click(function(){
		$(".brand").removeClass("selected");
		$( ".brand" ).attr('disabled',true);
		$(this).addClass('selected');
		console.log('estou a clicar na brand');
		brand_id = $(this).attr("data-id");
		csrf = $('meta[name=csrf_token]').attr("content");
		url = '/products?brand_id=' + brand_id;

		console.log("this is ",brand_id, url);
		
		// Send the data using post
	  $.get( url, function( data ) {
	  	//console.log(data);
	    //var content = $( data ).find( "#content" );
	    $('#p-products').nextAll('.product-row').remove();
	    $( ".products_div" ).append( data );

	    //window.history.pushState(null, null, url);
	    $( ".brand" ).attr('disabled',false);
	    activateProducts();
	  });
		
		//$( ".brand" ).attr('disabled',true); 
	});

	function activateProducts() {$( ".product-row" ).click(function(){
			$(".product-row").removeClass("selected");
			$( ".product-row" ).attr('disabled',true);
			$(this).addClass('selected');
			console.log('estou a clicar no produto');
			product_id = $(this).attr("data-id");
			brand_id = $(this).attr("data-brand_id").replace(/\s+/g, '');
			url = '/versions?product_id=' + product_id + '&' + 'brand_id=' + brand_id;
	
			console.log("this is ", url);
			
			// Send the data using post
		  $.get( url, function( versionData ) {
		  	//console.log(versionData);
		    //var content = $( data ).find( "#content" );
		    $('#p-versions').nextAll('.version-row').remove();
	    	$( ".versions_div" ).append( versionData );
	
		    //window.history.pushState(null, null, url);
		    $( ".product-row" ).attr('disabled',false);
		    activateSearch();
		  });
			
			//$( ".brand" ).attr('disabled',true); 
		})}

});