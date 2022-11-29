function fakeAjax(url,cb) {
	const fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

ASQ()
	.runner(function*() {
		const texts = [getFile('file1'), getFile('file2'), getFile('file3')];
		for(let text of texts) {
			output(yield text);
		}
		output('Complete!'); 
	});
