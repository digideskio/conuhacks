$(function() {
	$('form').submit(function(e) {
		if (!grecaptcha.getResponse()) {
			e.preventDefault();
		}
	});
});
