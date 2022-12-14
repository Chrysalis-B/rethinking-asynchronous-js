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

function getFile(file) {
	return ASQ(function (done) {
		fakeAjax(file, done);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

ASQ()
	.seq(
		...['file1', 'file2', 'file3']
			.map(getFile)
			.map(seq => () => seq.val(output))
	)
	.val(() => output('Complete!'))
