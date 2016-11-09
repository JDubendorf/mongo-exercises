module.exports = function(mongoose, Checkout, Movie) {
	//What is the title of the movie(s) that was the most checked out?

	Checkout.aggregate(
		[
			{ $group: {
				_id: "$movieId",
				movieCount: { $sum: 1 }
			}},
			{ $sort: {"movieCount": -1} },
			{ $limit: 1 }
		],

		function(err, result) {		
			var movieId = result[0]._id;

			Movie.aggregate(
				[ 
					{ $match : { _id : movieId } } 
				],
				function(err, result) {
					console.log("The most checked out movie is " + result[0].title + ".");
				}
			);
		}
	);
};




// in Movie, 