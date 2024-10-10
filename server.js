//---------------------------- Set Up Express ----------------------------

const express = require('express');

const app = express();

//---------------------------- Set Up Routes ----------------------------

//---------------------------- 1 ----------------------------

app.get('/greetings/:name', (req, res) => {
    res.send(
        `<h1>Hey ${req.params.name}!</h1><p>Long time no see, what have you been up to?</p>`,
    );
    console.log('We said hello');
});

//---------------------------- 2 ----------------------------

app.get('/roll', (req, res) => {
    res.send(
        '<h1>LETS ROLL A DICE BY ADDING ANOTEHR ROUTE</h1><p>Pick a number and the site will tell you what you rolled. If its not a number you might have to try again!</p>',
    );
});

app.get('/roll/:number', (req, res) => {
    let isNumber = req.params.number.split('');
    isNumber = isNumber.map(Number);

    if (isNumber.includes(NaN)) {
        // console.log(req.params.number);
        res.send(
            `${req.params.number} contains letters. You can only roll numbers. Try again.`,
        );
    } else {
        isNumber = isNumber.join('');
        isNumber = Math.round(Math.random() * isNumber);
        // console.log(isNumber);
        res.send(
            `<h3>Drum roll please. . . </h3>You have rolled a ${isNumber}`,
        );
    }
});

//---------------------------- 3 ----------------------------
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 },
];

app.get('/collective/:index', (req, res) => {
    let index = parseInt(req.params.index);
    console.log(index);

    if (index >= collectibles.length || isNaN(index)) {
        res.send('This item is not yet in stock. Check back soon!');
    } else {
        res.send(
            `So you want ${collectibles[index].name}? For $${collectibles[index].price}, it can be yours!`,
        );
    }
});

//---------------------------- 4 ----------------------------

const shoes = [
    { name: 'Birkenstocks', price: 50, type: 'sandal' },
    { name: 'Air Jordans', price: 500, type: 'sneaker' },
    { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
    { name: 'Utility Boots', price: 20, type: 'boot' },
    { name: 'Velcro Sandals', price: 15, type: 'sandal' },
    { name: 'Jet Boots', price: 1000, type: 'boot' },
    { name: 'Fifty-Inch Heels', price: 175, type: 'heel' },
];

app.get('/shoes', (req, res) => {
    const minPrice = parseInt(req.query['min-price']);
    const maxPrice = parseInt(req.query['max-price']);
    const type = req.query.type;
    let shoesFilter;
    let availableShoes;

    const availableList = () => {
        availableShoes = shoesFilter
            .map((shoe) => `${shoe.name} for $${shoe.price}`)
            .join('<br>');
    };

    if (minPrice && !isNaN(minPrice)) {
        shoesFilter = shoes.filter((shoe) => shoe.price >= minPrice);

        availableList();

        if (availableShoes.length === 0) {
            availableShoes = shoes
                .map((shoe) => `${shoe.name}: $${shoe.price} - ${shoe.type}`)
                .join('<br>');

            res.send(
                `<h3>Please see our full inventory: </h3>${availableShoes}`,
            );
        } else {
            res.send(`<h3>Shoes we have available:</h3>${availableShoes}`);
        }
    }

    if (maxPrice && !isNaN(maxPrice)) {
        shoesFilter = shoes.filter((shoe) => shoe.price <= maxPrice);

        availableShoes = shoesFilter
            .map((shoe) => `${shoe.name} for $${shoe.price}`)
            .join('<br>');

        availableList();

        if (availableShoes.length === 0) {
            availableShoes = shoes
                .map((shoe) => `${shoe.name}: $${shoe.price} - ${shoe.type}`)
                .join('<br>');

            res.send(
                `<h3>Please see our full inventory: </h3>${availableShoes}`,
            );
        } else {
            res.send(`<h3>Shoes we have available:</h3>${availableShoes}`);
        }
    }

    if (type) {
        shoesFilter = shoes.filter((shoe) => shoe.type === type);

        availableShoes = shoesFilter
            .map((shoe) => `${shoe.name} for $${shoe.price}`)
            .join('<br>');

        if (availableShoes.length === 0) {
            availableShoes = shoes
                .map((shoe) => `${shoe.name}: $${shoe.price} - ${shoe.type}`)
                .join('<br>');

            res.send(
                `<h3>Please see our full inventory: </h3>${availableShoes}`,
            );
        } else {
            res.send(
                `<h3>All the ${type}s we have available:</h3>${availableShoes}`,
            );
        }
    }
});

//---------------------------- Set Up Port ----------------------------
app.listen(3000, () => {
    console.log('Express is listening on port 3000...');
});
