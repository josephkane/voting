angular.module('app', [])
	.config(() => {
		firebase.initializeApp({
	    apiKey: "AIzaSyDGgFkrZTuDhq5XZ8BJ2zlmvLJWA3C9lLU",
	    authDomain: "voting-23cdb.firebaseapp.com",
	    databaseURL: "https://voting-23cdb.firebaseio.com",
	    storageBucket: "voting-23cdb.appspot.com",
	  })
	})
	.controller('MainCtrl', function ($timeout) {
		const main = this;

		main.header = "Who is the greatest?";

		main.vote = function (id, network) {
			network.count += 1;
			console.log("id: ", id);
			console.log("network: ", network);
		}

		firebase.database().ref('/networks').on('value', (snap) => {
			console.log("snap: ", snap.val());
			main.data = snap.val();
			$timeout();
		})
	})