/*<script type="text/javascript" charset="utf-8">
	(function (g, e, n, es, ys) {
		g['_genesysJs'] = e;
		g[e] = g[e] || function () {
			(g[e].q = g[e].q || []).push(arguments)
		};
		g[e].t = 1 * new Date();
		g[e].c = es;
		ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
	})(window, 'Genesys', 'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js', {
		environment: 'usw2',
		deploymentId: '56a5ee61-841f-4ef3-9025-b1ef401ac27d'
	});
</script>
<button id="hackathon-widget-button" data-toggle="modal" data-target="#modal"></button>
<script type="text/javascript">
	function toggleMessenger(){
		Genesys("command", "Messenger.open", {},
			function(o){},  // if resolved
			function(o){    // if rejected
				Genesys("command", "Messenger.close");
			}
		);
	}
</script>*/

window.genesys_checker = null;

$(document).ready( function() {
	$('#start_chat').click( function() {
		if ( genesys_checker == null && typeof( Genesys ) == 'undefined' ) {
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
					console.log( "Javascript Loaded: genesys.min.js" )
					console.log( "Notice: Waiting for messenger.min.js..." )

					$('#start_chat').val( 'Please wait...' );

					window.genesys_checker = setInterval( function() {
						if ( $('script[src$="/messenger.min.js"]').length == 1 || $('script[src$="/genesysvendors.min.js"]').length == 1 ) {
							clearInterval( window.genesys_checker );
							window.genesys_checker = null;

							$('#close').click();
							$('#start_chat').val( 'Start Chat' );

							Genesys( "command", "Messenger.open" );
						}
					}, 1000 );
				}


				document.head.appendChild(ys);
			})(window, 'Genesys', 'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js', {
				environment: env[0],
				deploymentId: env[1]
			});
		}
	});
});