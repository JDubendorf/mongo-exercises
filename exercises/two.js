module.exports = function(mongoose, Checkout, Movie) {
	// Which users checked out any of the Lord of the Rings trilogy?

		Movie.find( { title : { $regex: /lord of the rings/, $options: "$i" } }, 
			function(err, movieTitleResult) {
				Checkout.distinct("userId", 
					{ $or : [
						{ movieId : movieTitleResult[0]._id},
						{ movieId : movieTitleResult[1]._id},
						{ movieId : movieTitleResult[2]._id}
					]}, 
					function (err, result) {
						console.log(result.length + " users checked out any of the Lord of the Rings trilogy. Here are their user ID's: " + result + ".");
					}
				);
			} 
		);
};

