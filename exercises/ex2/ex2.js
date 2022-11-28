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
	let text, fn;

	fakeAjax(file, response => {
		if (fn) fn(response);
		else text = response;
	});

	return (cb) => {
		if (text) cb(text);
		else fn = cb;
	}
}

const file1Thunk = getFile("file1");
const file2Thunk = getFile("file2");
const file3Thunk = getFile("file3");

file1Thunk(text1 => {
	output(text1);
	file2Thunk(text2 => {
		output(text2);
		file3Thunk(text3 => {
			output(text3);
			output('Complete!')
		})
	})
})