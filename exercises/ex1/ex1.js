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
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file, function (text) {
		handleResponse(file, text);
	});
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");

const responses = {};

const handleResponse = (file, text) => {
	if (!responses[file]) {
		responses[file] = text;
	}
	const fileNames = ['file1', 'file2', 'file3'];
	for (const fileName of fileNames) {
		if (responses[fileName] !== undefined) {
			if (typeof responses[fileName] === 'string') {
				output(responses[fileName]);
				responses[fileName] = false;
			}
		}
		else {
			return;
		}
	}
	output('Complete');
}
