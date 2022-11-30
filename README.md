# The Well

## Overview

This is the source code for `The Well` website and blog. It is ran on [`ghost cms`](https://github.com/TryGhost/Ghost).

## Development

### Prereqs

- `node`/`npm`
- `Docker`

### Install Local Project Dependencies

```sh
npm i
```

### Starting Ghost locally

- Start `ghost` via cli
```sh
npm run ghost::start
```

### Stopping Ghost Locally

- Stop `ghost` via cli
```sh
npm run ghost::stop
```


### Creating a New Theme

- Go to Ghost Theme Directory
```sh
cd ghost-local/content/themes
```

### Scan Theme for Errors

- Run GScan with Theme as Argument
```sh
# Replace casper with your theme folder name
npm run gscan::theme --theme_name=casper
```

### Building Theme

Each theme we build will have a common command that will
be used to build any assets such as CSS, JS, or IMG that the
theme needs. Go into the `ghost-local/content/themes/<your theme name>`
directory and run

```sh
# ensure dev deps are installed
npm i
# build assets
npm run build::assets
```

You can also run the Theme Building script in watch mode

```sh
npm run build::assets -- development
```

This will constantly rebuild the CSS, JS, and IMG for the theme any time
a file in the source directories change.