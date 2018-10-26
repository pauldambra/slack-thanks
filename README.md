# Slack Thanks

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.

This is a slack integration to help your colleagues thank each other

# to get setup

 * publish the application to somewhere with a public URL
 * [create a slack app](https://api.slack.com/apps?new_app=1) that points to it

# to run in heroku

 * `cd` into root of repo
 * `heroku auth:login`
 * `heroku create`
 * `git push heroku master`
 * `heroku ps:scale web=1`
 * `heroku config:set SLACK_TOKEN:the_token`
 * update the URL in your slack app settings
