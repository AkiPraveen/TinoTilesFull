// the following is a parse initialization
$(document).ready(function(){
	Parse.initialize("MFgxDOAeaC1MGx5YNgRyDtfBkJLOfNowfIFAKEwf", "4cmF2z7jyMoUsKmSK7cxpxeNptMbqPQ2bqzKFzLb");

	init();

	
});

function init(){
	var Picture = Parse.Object.extend("Picture");
	var picture = new Parse.Query(Picture);
	picture.equalTo("use", true);
	picture.find({
	  success: function(results) {
	    //alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {

	    	var obj = results[i];
	    	var image = obj.get("file");
			var url = image.url();
			var filter= obj.get("filter");
			//alert(url);

			// this will apply filters based on the data in the database
			if(filter == "blackwhite") {
	      		$("#grid").html("<li><img style=\"filter:grayscale(1);-webkit-filter: grayscale(1);\"  src=\"" + url + "\"></a></li>" + $("#grid").html());
			}
			else if(filter =="sepia"){
				$("#grid").html("<li><img style=\"filter:sepia(1);-webkit-filter: sepia(1);\"  src=\"" + url + "\"></a></li>" + $("#grid").html());
			}
			else {
				$("#grid").html("<li><img src=\"" + url + "\"></a></li>" + $("#grid").html());
			}

	      new AnimOnScroll( document.getElementById( 'grid' ), {
				minDuration : 0.4,
				maxDuration : 0.7,
				viewportFactor : 0.2
			} );
	    }
	
	  },
	  error: function(error) {
	    //alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function submit(){
	//alert("submit clicked");
	var fileUploadControl = $("#pictureHolder")[0];
	if (fileUploadControl.files.length > 0) {
		var file = fileUploadControl.files[0];
		var name = "genericFileName";

		var parseFile = new Parse.File(name, file);
		parseFile.save().then(function() {
				// The file has been saved to Parse.
				//alert("Saved");
			}, function(error) {
				// The file either could not be read, or could not be saved to Parse.

		});



		var Picture = Parse.Object.extend("Picture");
		var picture = new Picture();

		// FILTER CODE
		var e = document.getElementById("myFilter");
		var filter = e.options[e.selectedIndex].value;
		picture.set("filter", filter);
		// END FILTER CODE

		picture.set("file", parseFile);
		picture.set("use", true);

		picture.save(null, {
			success: function(gameScore) {
				// Execute any logic that should take place after the object is saved.
				//alert('New object created with objectId: ' + gameScore.id);
				location.reload();
				},
			error: function(gameScore, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
				//alert('Failed to create new object, with error code: ' + error.message);
			}
		});

		// FILTER FUNCTION CODE


		// will get filter if all goes well



		// END OF FILTER FUNCTION CODE


		
	}

	


}