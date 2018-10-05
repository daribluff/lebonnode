var http = require('http');
var leboncoin = require('leboncoin-api');

console.log('run');

var globalTunnel = require('global-tunnel-ng');

globalTunnel.initialize({
  host: '10.169.119.6',
  port: 3128,
  proxyAuth: 'CptLinuxWeb:LinuxWeb', // optional authentication
  sockets: 50 // optional pool size for each http and https
});

var server = http.createServer(function(req, res) {

	const leboncoin = require('leboncoin-api');
	var search = new leboncoin.Search()
	    .setPage(1)
	    .setQuery("bmw serie 1")
	    // .setFilter(leboncoin.FILTERS.PARTICULIER)
	    // .setCategory("locations")
	    // .setRegion("ile_de_france")
	    // .setDepartment("yvelines")
	    // .setLocation([
	    //              {"zipcode": "78100"},
	    //              {"zipcode": "78000"},
	    //              ])
	    // .addSearchExtra("price", {min: 1500, max: 2000}) // will add a range of price
	    // .addSearchExtra('furnished', ["1", "Non meublé"]); // will add enums for Meublé and Non meublé
	 
	// Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra"
	 
	search.run().then(function (data) {
	    console.log(data.page); // the current page
	    console.log(data.pages); // the number of pages
	    console.log(data.nbResult); // the number of results for this search
	    console.log(data.results); // the array of results

	    res.writeHead(200, {"Content-Type": "text/html"});
  		res.end('<p>'+data.results+'</p>');

	    var result = data.results;
	 //    data.results[0].getDetails().then(function (details) {
	 //        console.log(details); // the item 0 with more data such as description, all images, author, ...

	 //        res.writeHead(200, {"Content-Type": "text/html"});
  // 			res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
	 //    }, function (err) {
	 //        console.error('aaaa'+err);

	 //        res.writeHead(200, {"Content-Type": "text/html"});
  // res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
	 //    });
	    data.results[0].getPhoneNumber().then(function (phoneNumer) {
	        console.log(phoneNumer); // the phone number of the author if available
	    }, function (err) {
	        console.error(err); // if the phone number is not available or not parsable (image -> string) 
	    });
	}, function (err) {
	    console.error('bbbb'+err);
	});

  
});
server.listen(8080);