## About

This is a static website using raw HTML and CSS. It's hosted on GitHub pages. 

By including a `.nojekyll` (empty) file at the source root, GitHub pages will not use Jekyll, which is the default behaviour. 

## Running locally

To get started, make sure that you have Python installed (MacOS machines come with Python pre-installed). 

You can run: 

```
py --version
```
to check what version you have installed. 

You'll need to make sure that the `serve.sh` script is executable: 

```
chmod +x serve.sh
```

If you want to run this on a different port to the default (4000), you can run: 

```
./serve.sh 8080
```