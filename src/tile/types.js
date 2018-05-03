module.exports.Types = {
    producer: {
        color: '#0F0',
        hotkey: 'p',
        cost: 60,
        buildTime: 10,
        health: 100,
        production: 10
    },
    army: {
        color: '#F00',
        hotkey: 'a',
        cost: 80,
        buildTime: 10,
        health: 120,
        damage: {
            adjacent: 20,
            nextNeighbor: 10
        }
    },
    defense: {
        color: '#00F',
        hotkey: 'd',
        cost: 40,
        buildTime: 4,
        health: 80
    },
    research: {
        color: '#8E44AD',
        hotkey: 'r',
        cost: 110,
        buildTime: 18,
        health: 90,
        boost: 1.1
    }
}
