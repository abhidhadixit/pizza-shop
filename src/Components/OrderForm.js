import React, { useState } from 'react';

const OrderForm = ({ onSubmit, message }) => {
  const [type, setType] = useState('Veg');
  const [size, setSize] = useState('Medium');
  const [base, setBase] = useState('Thin');

  const handleSubmit = (event) => {
    event.preventDefault();
    const orderData = { type, size, base };
    onSubmit(orderData);
    setType('Veg');
    setSize('Medium');
    setBase('Thin');
  };

  return (
    <div className="outertable">
      <h1>Welcome to Indian Pizza Hut</h1>
      <h3>Place an Order</h3>
      <form onSubmit={handleSubmit}>
        <table className='formtable'>
          <tbody>
            <tr>
              <td><label>Type: </label></td>
              <td>
                <input
                  type="radio"
                  id="veg"
                  name="type"
                  value="Veg"
                  checked={type === 'Veg'}
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="veg">Veg</label>
                <input
                  type="radio"
                  id="non-veg"
                  name="type"
                  value="Non-Veg"
                  checked={type === 'Non-Veg'}
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="non-veg">Non-Veg</label>
              </td>
            </tr>
            <tr>
              <td><label>Size: </label></td>
              <td>
                <input
                  type="radio"
                  id="small"
                  name="size"
                  value="Small"
                  checked={size === 'Small'}
                  onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="small">Small</label>
                <input
                  type="radio"
                  id="medium"
                  name="size"
                  value="Medium"
                  checked={size === 'Medium'}
                  onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="medium">Medium</label>
                <input
                  type="radio"
                  id="large"
                  name="size"
                  value="Large"
                  checked={size === 'Large'}
                  onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="large">Large</label>
              </td>
            </tr>
            <tr>
              <td><label>Base: </label></td>
              <td>
                <input
                  type="radio"
                  id="thin"
                  name="base"
                  value="Thin"
                  checked={base === 'Thin'}
                  onChange={(e) => setBase(e.target.value)}
                />
                <label htmlFor="thin">Thin</label>
                <input
                  type="radio"
                  id="thick"
                  name="base"
                  value="Thick"
                  checked={base === 'Thick'}
                  onChange={(e) => setBase(e.target.value)}
                />
                <label htmlFor="thick">Thick</label>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Pizza Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
