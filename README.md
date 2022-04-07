# Fedi.place bot
This bot lets you automatically print images on [fedi.place](https://fedi.place)

**Only runs on linux!!!** (should be very easy to port though)

## Palette
These are the **only** allowed colors. The API will reject any other color, even 1 bit off.

```
#ffffff #e4e4e4 #e5d900 #94e044
#888888 #222222 #02be01 #00d3dd
#ffa7d1 #e50000 #0083c7 #0000ea
#e59500 #a06a42 #cf6ee4 #820080
```

## Usage
### Downloading the project
- Clone the project and install dependencies
```
git clone https://github.com/wait-what/fediplace-bot
cd fediplace-bot
yarn install
```

### Initial configuration
- Rename `config.example.json` to `config.json`
- Configure `offset` and `size` under `config.json`

### Importing the image
- Place your image `image.png` in the same directory
- Run `node image.js`
- Copy the output into `colors` under `config.json`

### Network stuff
- Rename `place.example.sh` to `place.sh`
- Log in to [fedi.place](https://fedi.place) under a chromium-based browser
- Open development tools (F12)
- Go to the network tab
- Place a pixel
- Right click the `place` event
- Select `Copy` > `Copy as cURL`
- Paste the command into `place.sh`
- Remove the line that starts with `--data-raw`
- Add this line `--data-raw "x="$1"&y="$2"&hex=%23"$3"" \`

### Running the bot
- You may now run the bot!
```js
node index.js
```

## License
This project is licensed under [MIT](./LICENSE)
