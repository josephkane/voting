angular.module('app', ['angular.filter'])
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

		main.vote = function (id) {
			return firebase.database().ref(`networks/${id}`)
				.transaction((post) => {
				post.count += 1;
				return post;
			})
		}

		main.nominate = function (name) {
			firebase.database().ref('/networks')
				.push({name: name, count: 0})
				.then(() => main.nomination = '');
		}

		main.delete = function (id) {
			return firebase.database().ref(`networks/${id}`)
				.set(null)
		}

		firebase.database().ref('/networks').on('value', (snap) => {
			main.data = snap.val();
			$timeout();
		})
	})