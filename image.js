const config = require('./config.json')

const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(config.size.x, config.size.y)
const ctx = canvas.getContext('2d')

loadImage('./image.png').then((image) => {
    ctx.drawImage(image, 0, 0, config.size.x, config.size.y)

    const raw = canvas.toBuffer('raw')

    let pixels = Array(config.size.y).fill().map(() => Array(config.size.x).fill())
    for (let x = 0; x < config.size.x; x++)
        for (let y = 0; y < config.size.y; y++) {
            const r = raw.readUInt8(4 * (x + y * config.size.x) + 2)
            const g = raw.readUInt8(4 * (x + y * config.size.x) + 1)
            const b = raw.readUInt8(4 * (x + y * config.size.x) + 0)
            pixels[y][x] = [r, g, b].map(c => `0${c.toString(16)}`.slice(-2)).join('')
        }

    console.log(JSON.stringify(pixels))
})
