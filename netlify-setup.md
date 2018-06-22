
The github deploy token should definitely be read-only!  Here's some steps to self-link - you need to create a site to create a deploy key first for instance.

It is possible to link a repository without granting any permissions other than ones you put in place manually.

To do this, first make sure you've signed up for a Netlify account. This will be needed for the next steps to work :)

First you'll need to grab a copy of our command line utility from here:  https://github.com/netlify/netlifyctl/releases  .  You don't need to install Go on your machine - that is a self-contained binary.   With that CLI, you'll be able to do a lot of things, one of which is prepare a site for deployment and get the necessary authentication information to enter for linking your repository to our system for continuous deployment.

Then:

Run netlifyctl login to connect Netlify with your CLI. This will first use the browser to authenticate with Netlify, and store an access token which will enable other command line operations. This token is in ~/.netlify/config in case you ever need to remove it.
Go to the directory where the site's source code is checked out from git: cd path/to/your/repo
Run netlifyctl init --manual : This command will create your site on Netlify and start the setup process.
After creating the site, this command will guide you to set up two different things in your repository settings:

Deploy key: Netlify uses deploy keys to fetch your repository for building/deploying.  This will need to be installed in the settings for the repository you wish to deploy. The key is unique to this repository and the Netlify site that you are about to deploy - you cannot use it for other sites or repositories!
Deploy webhook: You need to add a webhook to your repository settings to tell Netlify when to build your site.  I'd suggest setting the webhook events yourself ("Let me select individual events") and choosing "Push" as well as "Pull Request".   If you use GitHub, when configuring webhooks, make sure Content-Type is set to application/json.
When this is completed you should have a functional setup. Every time you push to your repository, Netlify will be notified via the webhook, will fetch the changes using the deploy key you setup, build your site, and finally deploy to our CDN.

You've granted us only the permissions you've installed yourself to any of your repositories, and can remove those permissions entirely from your repository configuration at will, so we won't retain any permissions if you later decide not to use our service.