var logIn = function (data) {
	if (data.code === 200) {
		var form = document.querySelector('#app');
		if (!form) return;
		form.innerText = 'You just logged in!';
	} else {
		var error = document.querySelector('[data-form-error]');
		if (!error) return;
		error.textContent = data.message;
	}
};

var showError = function (data) {
	var error = document.querySelector('[data-form-error]');
	if (!error) return;
	error.textContent = 'Something went wrong. Please try again.';
};

/**
 * Convert an object into a query string
 * @private
 * @@link  https://blog.garstasio.com/you-dont-need-jquery/ajax/
 * @param  {Object|Array|String} obj The object
 * @return {String}                  The query string
 */
var param = function (obj) {
	if (typeof (obj) === 'string') return obj;
	if (Object.prototype.toString.call(obj) === '[object Array]') return JSON.stringify(obj);
	var encoded = [];
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			encoded.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
		}
	}
	return encoded.join('&');
};

/**
 * Sign a user in
 * @param  {String} id The post slug [optional]
 */
var signIn = function (username, password) {

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Create the request URL
	var url = 'http://localhost:8888/js4wp/wp-admin/admin-ajax.php';

	// Setup our listener to process compeleted requests
	xhr.onreadystatechange = function () {

		// Only run if the request is complete
		if (xhr.readyState !== 4) return;

		// Process our return data
		if (xhr.status === 200) {
			// If login was successful
			logIn(JSON.parse(xhr.responseText));
		} else {
			// If there was an error
			showError(JSON.parse(xhr.responseText));
		}
	};

	// Create and send a GET request
	// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
	// The second argument is the endpoint URL
	xhr.open('POST', url, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send('action=gmt_ajax_users_login&username=' + username + '&password=' + password);

};

document.addEventListener('submit', function (event) {

	// Only run for login form
	if (!event.target.matches('#login-form')) return;

	// Prevent default form submission
	event.preventDefault();

	// Get username and password from the form
	var username = event.target.querySelector('#username');
	var password = event.target.querySelector('#password');
	if (!username || !password || username.value.length < 1 || password.value.length < 1) return;

	// Try to sign the user in
	signIn(username.value, password.value);

}, false);