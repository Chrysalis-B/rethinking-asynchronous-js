$(document).ready(function () {
	var $btn = $("#btn"),
		$list = $("#list"),
		clicks = ASQ.react.of(),
		msgs = ASQ.react.of(),
		clicked;

	$btn.click(function (evt) {
		clicks.push(evt);
	});

	clicks.val(evt => {
		clicked = evt;
	});

	setInterval(() => {
		if (clicked) {
			msgs.push("clicked!");
			clicked = null;
		}
	}, 1000);

	msgs.val(msg => $list.append($("<div>" + msg + "</div>")))
});
