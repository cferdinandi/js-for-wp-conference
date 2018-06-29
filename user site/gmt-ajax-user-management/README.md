# GMT Courses User Management
User processes for GMT Courses.

## Required Environment Variables

```bash
SetEnv SIGNUP_URL <url-for-signup-page>
SetEnv VALIDATE_URL <url-for-user-validation-page>
SetEnv MIN_PASSWORD_LENGTH <min-password-length>
SetEnv RESET_PW_URL <url-for-password-reset-form>
SetEnv FRONTEND_URL <url-for-the-frontend> # if you want to redirect users away
```

## Ajax Call

```js
atomic.ajax({
	type: 'POST',
	url: baseURL + '/wp-admin/admin-ajax.php',
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
},
	data: {
		action: 'action',
	}
}).success(function (data, xhr) {
	console.log(data);
});
```

## Actions

- `gmt_courses_is_logged_in` - Check if the current user is logged in.
- `gmt_courses_login` - Log a user in.
- `gmt_courses_logout` - Log the current user out.
- `gmt_courses_create_user` - Create a new user.
- `gmt_courses_validate_new_account` - Validate a new user account.
- `gmt_courses_change_password` - Update a user's password.