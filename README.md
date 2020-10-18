## 🎨 Next.js Headless WordPress
[![Project Status: Active.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
![Stars](https://img.shields.io/github/stars/imranhsayed/nextjs-headless-wordpress?label=%E2%AD%90%20Stars)
![Forks](https://img.shields.io/github/forks/imranhsayed/nextjs-headless-wordpress?color=%23ff69b4)
![Contributors](https://img.shields.io/github/contributors/imranhsayed/nextjs-headless-wordpress?color=blue)
![Follow](https://img.shields.io/github/followers/imranhsayed?label=Please%20follow%20%20to%20support%20my%20work%20%F0%9F%99%8F&style=social)

- Headless WordPress, using Decoupled Architecture in Next.js
- Backend in WordPress.
- Front end in React

## Setup

First clone/fork the repo and cd into it.

```bash
git clone https://github.com/imranhsayed/nextjs-headless-wordpress.git
cd nextjs-headless-wordpress
```
It's very simple to setup the project with just one command and this `./nxtwp configure`

**One command project setup**

The below command is going to set up the project in the interactive mode.
It creates an .env file for front-end next.js project and setsup up frontend and/or backend.
Run this from the root of the project.

```bash
./nxtwp configure
```
It's going to ask you a few of questions.

```bash
Q1. Do you already have a WordPress setup that you want to continue with? [y/n]:
```
*Answer*

`y`: If you would like to use this project's WordPress Docker setup ( In which case make sure to install and active all plugins from [backend/plugins-collection])
`n`: If you want to use your own WordPress setup.

```bash
Q2. ✍️  What is your WP backend URL? (defaults to http://localhost:8020): 
```
Leave it blank if you would like to use this project's WordPress Docker setup,
else enter your own WordPress site URL.

```bash
✍️  What is your frontend next js URL? (defaults to http://localhost:3000):
```
Leave this blank for development, as it will be the same as default for next.js

```bash
✍️  What is your Disqus comments shortname? (leave blank if you are not using): 
```

Leave this blank if you are not going to use the Disqus comments, else enter your Disqus comments shortname.

That's it!
This is going to automatically:
- Creates the `.env` file in the frontend directory.
- Setup WordPress backend with all the plugins via composer (if you chose y for the first question)
- Install npm packages for next.js frontend and start development server.

**WordPress Backend** will be available on [http://localhost:8020](http://localhost:8020)
**Next.js Backend** will be available on port [http://localhost:3000](http://localhost:3000)
 
* Make sure to activate all plugins that it has installed via composer.
* Update block registry by going to WordPress Dashboard > GraphQL Gutenberg. 
* For more information checkout the project [Wiki](https://github.com/imranhsayed/nextjs-headless-wordpress/wiki/)

### During development

Useful commands:
To be run from the root of the project.

```bash
./nxtwp configure       # Sets up backend and frontend and creates an .env file
./nxtwp start-all       # Creates and starts docker environment for WP and runs Next JS server
./nxtwp start-backend   # Creates and starts docker environment
./nxtwp start-frontend  # Installs all packages and Runs Next JS server
./nxtwp stop            # Stops the WordPress docker containers
```

## Debugging

1. If you get 404 on frontend for graphql request, check to see that the `.htaccess` file in wordpress directory has the rules

```shell script
# BEGIN WordPress
# The directives (lines) between "BEGIN WordPress" and "END WordPress" are
# dynamically generated, and should only be modified via WordPress filters.
# Any changes to the directives between these markers will be overwritten.
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>

# END WordPress
```

2. If front-end is throwing some other error.

- Check if all the required WordPress plugins form `backend/plugins-collection` are active.
- Ensure you have updated the block registry from WordPress backend > GraphQL Gutenberg 
- Ensure that `.env` file has correct env variables and their values in `frontend/.env`

## References for Docker Images.

1. [phpMyAdmin](https://github.com/fuadajip/dockercompose-mysql-phpmyadmin/blob/master/docker-compose.yml)
