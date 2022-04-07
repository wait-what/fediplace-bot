const { exec } = require('child_process')
const config = require('./config.json')

let position = config.startingPosition

const place = (x, y) => {
    const color = config.colors[y][x]

    console.log(
        `> Placing ${color} => ` +
        `x${x + config.offset.x} (${x}/${config.size.x}) ` +
        `y${y + config.offset.y} (${y}/${config.size.y})`
    )

    exec(`sh place.sh ${x + config.offset.x} ${y + config.offset.y} ${color}`, (err, stdout) => {
        if (err) return console.error(err)

        const response = JSON.parse(stdout)
        if (!response.success) return console.log(response)

        console.log(`! Placed. Waiting ${response.timer.seconds + 0.5} seconds...`)
        setTimeout(() => {
            position.x++

                if (position.x >= config.size.x) {
                    position.x = 0
                    position.y++
                }

                if (position.y >= config.size.y) {
                    console.log('> Done!!!')
                    return
                }

                place(position.x, position.y)
            },
            response.timer.seconds * 1000 + 500
        )
    })
}

place(position.x, position.y)
