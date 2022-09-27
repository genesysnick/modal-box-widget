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
	(async() => {
		while( $('script[src$="/messenger.min.js"]').length == 0 && $('script[src$="/genesysvendors.min.js"]').length == 0 ) {
		// while( !window.hasOwnProperty( "Genesys" ) ) {
			await new Promise(resolve => setTimeout(resolve, 500));
		}

		Genesys( "subscribe", "Messenger.opened", function( e ) {
			$('#start_chat').val( 'Start Chat' );
			$('#start_chat').removeAttr( 'disabled' );
			$('#close').click();
		});
	})();

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
					$('#start_chat').val( 'Please wait...' );
					$('#start_chat').attr( 'disabled', 'disabled' );
				}

				document.head.appendChild(ys);
			})(window, 'Genesys', 'https://apps.usw2.pure.cloud/genesys-bootstrap/genesys.min.js', {
				environment: env[0],
				deploymentId: env[1]
			});
		}
	});
});