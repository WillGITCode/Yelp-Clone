# YelpCamp

> YelpCamp is a fullstack application built during the course - [The Web Developer Bootcamp by Colt Steele](https://www.udemy.com/the-web-developer-bootcamp/)

## Live Demo

Check it out [https://pacific-inlet-70276.herokuapp.com/](https://pacific-inlet-70276.herokuapp.com/)

## Features

* Authentication:
  
  * User login with username and password

  * Admin sign-up with admin code

* Authorization:

  * User cannot manage posts and view user profile without being authenticated

  * User cannot edit or delete posts and comments created by other users

  * Admin can manage all posts and comments

  * Admin can manage all user profiles

* Manage campground posts with basic functionalities:

  * Create, view, edit and delete posts and comments

  * Upload campground photos

  * Display campground location on Google Maps
  
  * Search existing campgrounds

* Manage user account with basic functionalities:

* Profile page setup with sign-up

* Flash messages responding to users' interaction with the app

* Flash messages handles error messages

* Responsive web design

### Custom Enhancements

* Update campground photos when editing campgrounds

* Update personal information on profile page
 
## Getting Started

> This app contains API secrets and passwords that have been hidden deliberately, so the app cannot be run with its features on your local machine. However, feel free to clone this repository if necessary.

### Clone or download this repository

```sh
git clone https://github.com/WillGITCode/Yelp-Clone.git
```

### Install dependencies

```sh
npm install
```

or

```sh
yarn install
```

### Comments in code

Some comments in the source code are course notes and therefore might not seem necessary from a developer's point of view.

## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Google Maps APIs](https://developers.google.com/maps/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [crypto](https://nodejs.org/api/crypto.html#crypto_crypto)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [moment](https://momentjs.com/)
* [geocoder](https://github.com/wyattdanger/geocoder#geocoder)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Heroku](https://www.heroku.com/)
* [Cloud9](https://ide.c9.io/williamsilburn/webdevbootcamp)
## License

#### [MIT](./LICENSE)