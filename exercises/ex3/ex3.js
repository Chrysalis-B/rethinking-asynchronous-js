function fakeAjax(url, cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

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
	return new Promise(resolve => {
		fakeAjax(file, resolve);
	});
}

// request all files at once in "parallel"
const file1Promise = getFile("file1");
const file2Promise = getFile("file2");
const file3Promise = getFile("file3");

file1Promise
	.then(output)
	.then(() => file2Promise)
	.then(output)
	.then(() => file3Promise)
	.then(output)
	.then(() => output('Complete!'));

