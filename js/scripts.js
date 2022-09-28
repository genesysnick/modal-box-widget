/**
 * js/scripts.js
 * 
 * Contains custom script functionality for Web Messenger.
 */

window.g_conversation_started = false;

$(document).ready( function() {
	$('#start_chat').click( function() {
		if ( typeof( Genesys ) == 'undefined' ) {
			var env = $('#user-select').val().split("||");

			(function (g, e, n, es, ys) {
				g['_genesysJs'] = e;
				g[e] = g[e] || function () {
				(g[e].q = g[e].q || []).push(arguments)
				};
				g[e].t = 1 * new Date();
				g[e].c = es;
				ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8';

				ys.onload = function() {
					$('#start_chat').val( 'Please wait...' );
					$('#start_chat').attr( 'disabled', 'disabled' );

					Genesys( "subscribe", "Messenger.ready", function( e ) {
					    setTimeout( function() {
						    	Genesys( "command", "Messenger.open", {},
								function(o){
									// Success
								},
								function(o) {
									// Fail
								}
							);
						}, 2500 );
					});

					Genesys( "subscribe", "Messenger.opened", function( e ) {
						$('#close').click();

						$('#start_chat').val( 'Start Chat' );
						$('#start_chat').removeAttr( 'disabled' );
					});

					Genesys( "subscribe", "Conversations.started", function( e ) {
						window.g_conversation_started = true;
					});
				}

				document.head.appendChild(ys);
			})(window, 'Genesys', 'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js', {
				environment: env[0],
				deploymentId: env[1]
			});
		}
	});

	$('#hackathon-widget-button').click( function() {
		if ( window.g_conversation_started ) {
			// If conversation has already started, toggle Web Messenger.
			Genesys( "command", "Messenger.open", {}, function() {

			}, function () {
				Genesys( "command", "Messenger.close" );
			});
		} else {
			var modal = $($(this).data('target') );

			modal
				.css( 'visibility', 'visible' )
				.removeClass( 'animate__slideOutDown' )
				.addClass( 'animate__animated animate__slideInUp' );
		}
	});

	$('#close').click( function() {
		$('#modal')
			.removeClass( 'animate__slideInUp' )
			.addClass( 'animate__slideOutDown' );
	});
});