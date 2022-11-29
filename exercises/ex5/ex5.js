function fakeAjax(url, cb) {
	const fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function () {
		cb(fake_responses[url]);
	}, randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

const getFile = ASQ.wrap(fakeAjax, { simplecb: true })

// request all files at once in "parallel"

getFile("file1")
	.val(output)
	.seq(getFile("file2"))
	.val(output)
	.seq(getFile("file3"))
	.val(output)
	.val(() => output('Complete!'));