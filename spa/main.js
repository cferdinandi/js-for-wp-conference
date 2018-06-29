
//
// Variables
//

var app = document.querySelector('#app');


//
// Methods
//

/**
 * Get the value of a query string from a URL
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from [optional]
 * @return {String}       The value
 */
var getQueryString = function (field, url) {
	var href = url ? url : window.location.href;
	var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
	var string = reg.exec(href);
	return string ? string[1] : null;
};

/**
 * What to render if there's no posts
 */
var noPosts = function () {
	app.innerHTML =
		'<h2>Page not found.</h2>' +
		'<p>Sorry, the page that you are looking for cannot be found.</p>';
};

/**
 * Show posts on the page
 * @param  {Array}   data   The post data
 * @param  {Boolean} single If true, render as individual page
 */
var showPosts = function (data, single) {

	// If there's no content
	if (data.length < 1) {
		app.innerHTML = '<h2>No posts yet.</h2>';
	}

	// If this is an individual post page
	if (single) {
		app.innerHTML =
			'<div class="post">' +
				'<h2>' + data[0].title.rendered + '</h2>' +
				data[0].content.rendered +
			'</div>';
		return;
	}

	// If it's a list of all posts
	var content = '';
	data.forEach(function (post) {
		content +=
			'<div class="post">' +
				'<h2><a href="?p=' + post.slug + '">' + post.title.rendered + '</a></h2>' +
				post.excerpt.rendered +
				'<hr>' +
			'</div>';
	});
	app.innerHTML = content;

};

/**
 * Get posts via WP REST API
 * @param  {String} id The post slug [optional]
 */
var getPosts = function (id) {

	// Set up our HTTP request
	var xhr = new XMLHttpRequest();

	// Create the request URL
	var url = 'http://localhost:8888/js4wp/wp-json/wp/v2/posts';
	if (id) {
		url += '?slug=' + id;
	} else {
		url += '?per_page=15';
	}

	// Setup our listener to process compeleted requests
	xhr.onreadystatechange = function () {

		// Only run if the request is complete
		if (xhr.readyState !== 4) return;

		// Process our return data
		if (xhr.status === 200) {
			// If we got back data
			showPosts(JSON.parse(xhr.responseText), id);
		} else {
			// If there was an error
			noPosts();
		}
	};

	// Create and send a GET request
	// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
	// The second argument is the endpoint URL
	xhr.open('GET', url);
	xhr.send();

};

/**
 * Handle click events
 */
var clickHandler = function (event) {

	// Don't run if right-click or command/control + click
	if (event.button !== 0 || event.metaKey || event.ctrlKey) return;

	// Check if it's an external link
	if (event.target.hostname !== window.location.hostname) return;

	// Get the new page
	event.preventDefault();
	getPosts(getQueryString('p', event.target.href));

};


//
// Inits & Event Listeners
//

// Get posts on page load
getPosts(getQueryString('p'));

// Listen for clicks to internal links
document.addEventListener('click', clickHandler, false);