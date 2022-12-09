# AVC News

## Summary

||||
|-|-|-|
|**Deployed URL**|:|https://avc-news.netlify.app/|
|**Backend API**|:|https://long-yak-baseball-cap.cyclic.app/api/|
|**Backend Repo**|:|https://github.com/a1v0/be-nc-news/|
|**Minimum Node version**|:|19.0.0|

This React website provides the frontend for the backend API I made previously (link above). It allows visitors to view articles listed by topic; to read individual articles and comments; to up/downvote comments; and to submit/delete their own comments (subject to being logged in).

The site is designed along conventional lines, with a navbar at the top containing links to topics, as well as a login link. Articles can be sorted according to various criteria. The URL updates on every new page, so that anything copied from the address bar will render correctly elsewhere.

## Running the website locally

### Cloning the repo

In the terminal, navigate to the directory into which you would like to clone the repo, and run:

```shell
$ git clone https://github.com/a1v0/fe-nc-news.git
```

### Installing dependencies

Once this is complete, install all dependencies using:

```shell
$ npm install
```

This may take some time, as React is a large module.

### Starting the local server

With all dependencies installed, the server can be started using:

```shell
$ npm start
```

The default port is 3000. To use a different one, modify the `start` script within `package.json` by prepending `PORT=<PORT NUMBER>`.

The locally hosted website should open automatically in the machine's default browser. If not, a link to the server will also be displayed in the terminal.
