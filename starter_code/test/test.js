var request = require('request')
var expect = require('chai').expect
var cheerio = require('cheerio')

var samplePhrase = {id: 10, word: "This is a Test", definition: "Test"};
var sampleSet = { id: 3, title: "Acronyms", phraseIds: [1,6], notes:[]};


describe('localhost', function() {

	// HTML
	it('should have title Catchphrasely', function(done) {
		request('http://localhost:3000/', function(err, res, body) {
			var $ = cheerio.load(body);
			var title = $('title').text();
			expect(title).to.equal('Catchphrasely');
			done();
		});
	});

	// api/hrases get
	it("should give a positive error msg", function(done) {
		request.get('http://localhost:3000/api/phrases', function(err, res, body) {
	 		expect(res.statusCode).to.equal(200);
			done();
		});
	});

	// api/study-sets get
	it("should give a positive error msg", function(done) {
		request.get('http://localhost:3000/api/study-sets', function(err, res, body) {
	 		expect(res.statusCode).to.equal(200);
			done();
		});
	});

	// api/study-sets post
	it("should succeed at posting a studySet", function(done) {
	    request.post('http://localhost:3000/api/study-sets', {form: sampleSet}, function(err, res, body) {
	 		expect(res.statusCode).to.equal(200);
	    	done();
	    });
	});

	//  api/study-sets get specific
	it("specific study-set", function(done) {
		request.get('http://localhost:3000/api/study-sets/3', function(err, res, body) {
	 		expect(res.statusCode).to.equal(200);
			done();
		});
	});

	// api/phrases post
	it("should succeed at posting a studySet", function(done) {
	    request.post('http://localhost:3000/api/phrases', {form: samplePhrase}, function(err, res, body) {
	 		expect(res.statusCode).to.equal(200);
	    	done();
	    });
	});

	// api/phrases put
	it("should succeed at updating a phrase", function(done) {
	    request.put('http://localhost:3000/api/phrases/' + samplePhrase.id, {form: samplePhrase}, function(err, res, body) {
	 		expect(res.statusCode).to.equal(200);
	    	done();
	    });
	});

	// api/study-sets/phrases delete
		it("should succeed at deleting a phrase", function(done) {
		    request.del('http://localhost:3000/api/study-sets/1/phrases/1', function(err, res, body) {
		 		expect(res.statusCode).to.equal(200);
		    	done();
		    });
		});

});