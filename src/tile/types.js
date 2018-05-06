module.exports.Types = Object.freeze({
    producer: {
        color: 'rgb(0,255,0)',
        hotkey: 'P',
        cost: 60,
        buildTime: 10,
        health: 100,
        production: 10
    },
    army: {
        color: 'rgb(255,0,0)',
        hotkey: 'A',
        cost: 80,
        buildTime: 10,
        health: 120,
        damage: {
            adjacent: 20,
            nextNeighbor: 10
        }
    },
    defense: {
        color: 'rgb(0,0,255)',
        hotkey: 'D',
        cost: 40,
        buildTime: 4,
        health: 80
    },
    research: {
        color: 'rgb(142,68,173)',
        hotkey: 'R',
        cost: 110,
        buildTime: 18,
        health: 90,
        boost: 1.1
    }
})
