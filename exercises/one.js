module.exports = function(mongoose, Checkout, Movie) { 
	// What user(s) had the most checkouts?

	Checkout.aggregate(
		[
			{ $group: {
				_id: "$userId",
				checkoutCount: { $sum: 1 }
			}},

			{ $sort: {"checkoutCount": -1} },
			{ $limit: 1 }
		],

		function(err, result) {
			console.log("The user with the most checkouts has userId " + result[0]._id + ".");
		}
	);
};