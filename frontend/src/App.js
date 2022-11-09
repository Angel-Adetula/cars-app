import React, { useEffect, useState } from 'react';
import './App.css';

function Cars() {
/**
 * Fields required for the car
      "id",
      "brand",
      "name",
      "releaseYear",
      "color"
 */
  const carFormInitialData = {
    id: 0,
    brand: "",
    name: "",
    releaseYear: "",
    color: "",
  }
  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [carData, setCarData] = useState([]);
  const [submit, setSubmit] =  useState(true);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    /**
     * Gather all the form data to state variable carFormData
     * When the form is submitted POST the data to Backend using fetch post
     * https://googlechrome.github.io/samples/fetch-api/fetch-post.html
     */
      event.preventDefault();
      fetch("http://localhost:3003/cars", 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(carFormData)
        
      }).then(res=> console.log(res.status()))
        // .then(carInfo => setCarData(carInfo));


    setCarFormData(carFormInitialData);
  }

  const handleDelete = (carID) => {
    /**
     * When clicked on a delete button, get the id of the car's delete button clicked
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
    
     fetch("http://localhost:3003/cars", 
     {
       method: 'DELETE',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        id: carID,
       })
       
     }).then(res=> res.json())
     .then(carInfo => setCarData(carInfo));

     console.log(carFormData)

  }


/** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */

  const getCar = (carID) => {
    carData.some(car => {
      if (parseInt(car.id) === parseInt(carID)) {
        setCarFormData(car);
      }
    });
    setSubmit(false)
  }
  const handleEdit = (event) => {
    /**
     * When clicked on a edit button figure out a way to edit the car data.
     * Once edited send the updated data to NodeJS.
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
    event.preventDefault();
    fetch("http://localhost:3003/cars", 
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carFormData)

      
    }).then(res=> res.json())
    .then(carInfo => setCarData(carInfo));

    
    setCarFormData(carFormInitialData);
    setSubmit(true) 
  }

  useEffect(() => {
    fetch("http://localhost:3003/cars")
    .then(res => res.json())
    .then(carInfo => setCarData(carInfo))
  }, [carData])
 
  return (
    <div className='cars-from-wrapper'>
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        {/** 
           * TODO: Update the form fields with inputs for 
           *    ID, Brand, Name, ReleaseYear and Color
           * Make required changes to  const carFormInitialData
           * */}  
        <label>
          ID:
          <input name='id' type="text" value={carFormData.id} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input name='name' type="text" value={carFormData.name} onChange={handleInputChange} />
        </label>
        <label>
          Brand:
          <input name='brand' type="text" value={carFormData.brand} onChange={handleInputChange} />
        </label>
        <label>
          Release Year:
          <input name='releaseYear' type="text" value={carFormData.releaseYear} onChange={handleInputChange} />
        </label>
        <label>
          color:
          <input name='color' type="text" value={carFormData.color} onChange={handleInputChange} />
        </label>
        {submit ? <input type="submit" value="Submit"/>: <button onClick= {handleEdit}> Done </button>}
      </form>
       {/** 
           * TODO: Update the code below to see any new proprties added to carFormData
           * */}  
      <p>ID:{carFormData.id}, name:{carFormData.name}, brand: {carFormData.brand}, release year: {carFormData.releaseYear},
      color:{carFormData.color}</p>
      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Release Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/** 
           * TODO: Replace this code with Data from Node JS GET api data
           * React documentation: https://reactjs.org/docs/lists-and-keys.html
           * How to get data from API: https://www.w3schools.com/jsref/api_fetch.asp
           * */}
           {carData.map((item, index) => (
            <tr key = {index}>
              <td>{item.id}</td>
              <td>{item.brand}</td>
              <td>{item.name}</td>
              <td>{item.releaseYear}</td>
              <td><button onClick={() => getCar(item.id)}> ✎ </button></td>
              <td><button onClick={() => handleDelete(item.id)}>🗑 </button></td>        
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;