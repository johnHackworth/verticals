var updateTitle = function() {
	$( '#siteTitleTop .titleTopBar' ).html( $( '#title' ).val() );
	$( '#siteTitleTop .domainTopBar' ).html( $( '#title' ).val().toLowerCase().replace(/\s/g, '')  + '.wordpress.com' );
}

var acquireIntentContinue = function() {
	$( '#vertical' ).val( $( '#verticalAcquireSelect' ).val() );
	$( '#title' ).val( $( '#titleAcquire' ).val() );
	$( '#acquireIntent' ).fadeOut();
	$( '#designPicker' ).fadeIn();
	updateTitle();
}

var designPickerContinue = function( el ) {
	$( '#acquireIntent' ).fadeOut();
	$( '#designPicker' ).fadeOut();	
	$( '#verticalContent' ).fadeIn();
	$( '#topbar button' ).fadeIn();

	$( '#templates img').removeClass( 'selected' );
	$( '#templates img#' + $( el.target ).data( 'value' ) ).addClass( 'selected' );
	selectVertical();

}

var selectVertical = function() {
	refresh( $( '#vertical' ).val(), $( '#templates img.selected' ).attr( 'id' ) );
}
var togglePannel = function() {
	$( '#sidebar' ).toggle();
}

var selectTemplate = function( img, dos ) { 
	$( '#templates img' ).removeClass( 'selected' );
	$( img.target ).addClass( 'selected' );
}

var refresh = function( verticalTemplate, selectedTemplate ) {
	updateTitle();
	$.when( 
		$.getJSON( verticalTemplate + ".json"),
		$.get( selectedTemplate + ".html" )
	)
	.done( function( verticalRequest, templateRequest ) {
		var dom = $( templateRequest[ 0 ] );
		var vertical = verticalRequest[ 0 ];

		var layers = [ 'primary', 'secondary', 'tertiary', 'cuaternary', 'quintinary' ];
		var sections = [ 'title', 'subtitle', 'description' ];

		layers.forEach( function( layer ) {
			sections.forEach( function( section ) {
				$( dom ).find( '*[data-vertical="text-' + section + '-' + layer + '"]' ).each( function( index, node) { $( node ).html( vertical.text[ section ][ layer ].pop() ); } );	
			} )
		} );

		$( dom ).find( '*[data-vertical="link-contact"]' ).each( function( index, node) { $( node ).html( vertical.link.contact.pop() ); } );	
		$( dom ).find( '*[data-vertical="link-section"]' ).each( function( index, node) { $( node ).html( vertical.link.section.pop() ); } );

		vertical.testimonial && $( dom ).find( '*[data-vertical="testimonial-title"]' ).each( function( index, node) { $( node ).html( vertical.testimonial.title.pop() ); } );					


		vertical.testimonial && $( dom ).find( '*[data-vertical="testimonial-description"]' ).each( function( index, node) { $( node ).html( vertical.testimonial.description.pop() ); } );				

		vertical.testimonial && $( dom ).find( '*[data-vertical="testimonial-name"]' ).each( function( index, node) { $( node ).html( vertical.testimonial.name.pop() ); } );

		$( dom ).find( '*[data-vertical="image-big"]' ).each( function( index, img ) { $( img ).attr( 'src', vertical.image.big.pop() ) } );

		$( dom ).find( '*[data-vertical="image-medium"]' ).each( function( index, img ) { $( img ).attr( 'src', vertical.image.medium.pop() ) } );

		$( dom ).find( '*[data-vertical="image-small"]' ).each( function( index, img ) { $( img ).attr( 'src', vertical.image.small.pop() ) } );

		$( dom ).find( '*[data-vertical="background-big"]' ).each( 
			function( index, img ) { 
				console.log('back-big', img )
				$( img ).attr( 'style', 'background-image:url(' + vertical.background.big.pop() + ')' );
			} );
		$( dom ).find( '*[data-vertical="background-medium"]' ).each( function( index, img ) { $( img ).attr( 'style', 'background-image:url(' + vertical.background.medium.pop() + ')' ) } ),

		dom = $( dom.html().split('{{title}}').join( $( '#title' ).val() ) );

		$('#template').html( dom );
	} );

}


var init = function()  {
	$( '#verticalContent' ).hide();
	$( '#topbar button' ).hide();
	$( '#designPicker' ).hide();
	$( '#verticalAcquireSelect' ).selectmenu( {
		appendTo: '#selectorAcquire',
		close: function( event, ui ) { 
			$( '#selectorAcquire' ).removeClass( 'open' );
		},
		open: function( event, ui ) { 
			$( '#selectorAcquire' ).addClass( 'open' );
		},
		select: function() {
			var titles = {
				"surf": "Big Wave",
				"cake": "Le Pomme Confiserie",
				"tour": "Dale Pedales News"
			};
			$( '#titleAcquire' ).val( titles[ $( '#verticalAcquireSelect' ).val() ]);
		}
	});
	$( '#verticalAcquireSelect' ).selectmenu( "open" );


/*		$.get( "barnsbury.html" )
	.done( function( templateRequest ) {
		$('#template').html( templateRequest );
	} );*/

}

$( '#selectVertical' ).click( selectVertical );
$( '#topbar button' ).click( togglePannel );
$( '#templates img').click( selectTemplate );
$( '#continueButton1' ).click( acquireIntentContinue );
$( '#designPicker img' ).click( designPickerContinue );
init();