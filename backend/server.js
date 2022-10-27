
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
 const express = require('express');
 const app = express();
 const cors = require('cors');
 // middleware
 app.use(express.json());
 app.use(cors());


let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API should return  const carsMockData*/
app.get('/cars', (req, res) => {
    res.json(carsMockData);
});





/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */

app.post('/cars', (req, res) => {
    const userCar = req.body;
    const alreadyExists = carsMockData.some(car => {
        if (parseInt(car.id) === parseInt(userCar.id)) {
            return true;
        } 
        else {
            return false;
        }
    });
    console.log(alreadyExists)
    if (alreadyExists) {
        res.status(500);
        console.error("Car already exists");
    } else {
        carsMockData.push(userCar);
    }
    res.json(carsMockData);
});



/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */
 app.put('/cars', (req, res) => {
    const userCar = req.body;
    const alreadyExists = carsMockData.some(car => {
        if (parseInt(car.id) === parseInt(userCar.id)) {
            return true;
        } 
        else {
            return false;
        }
    });
    if (alreadyExists) {
        carsMockData = carsMockData.filter(car => car.id !== userCar.id);
        carsMockData.push(userCar)
    } else {
        res.status(500);
        console.error('No car with given id exist');
    }
    res.json(carsMockData);
});

/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/

app.delete('/cars', (req, res) => {
    const userCar = req.body;
    const alreadyExists = carsMockData.some(car => {
        if (parseInt(car.id) === parseInt(userCar.id)) {
            return true;
        } 
        else {
            return false;
        }
    });
    if (alreadyExists) {
        carsMockData = carsMockData.filter(car => car.id !== userCar.id);
    } else {
        res.status(500);
        console.error('No car with given id exist');
    }
    res.json(carsMockData);
});

app.listen(3003)