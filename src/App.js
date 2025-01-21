
import React, { useState, useEffect } from 'react';
import OrderForm from './Components/OrderForm';
import './App.css';

function App() {
  const [countOrders, setCountOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];

  const handleStageChange = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, stageIndex: (order.stageIndex + 1) % 4, startTime: Date.now() }
          : order
      )
    );
  };

  const handleCancel = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    setCountOrders((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          const timeSpent = Math.floor((Date.now() - order.startTime) / 1000);
          return { ...order, timeSpent };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (orderData) => {
    if (countOrders >= 10) {
      setMessage("Not taking any order for now");
    } else {
      const order = {
        id: `Order ${countOrders + 1}`,
        type: orderData.type,
        size: orderData.size,
        base: orderData.base,
        stageIndex: 0,
        startTime: Date.now(),
        timeSpent: 0,
      };
      setOrders((prevOrders) => [...prevOrders, order]);
      setCountOrders((prevCount) => prevCount + 1);
      setMessage(`Ordered Successfully! ${orderData.type} ${orderData.size} ${orderData.base}`);
    }
  };

  return (
    <div>
      <OrderForm onSubmit={handleSubmit} message={message} />
      <div className="main-section">
        {stages.map((stage, index) => (
          <div key={index} className="stage-column">
            <h3>{stage}</h3>
            {orders
              .filter((order) => order.stageIndex === index)
              .map((order) => (
                <div
                  key={order.id}
                  className={`order-card ${order.timeSpent >= 180 ? 'highlight' : ''}`}
                >
                  <h4>{order.id}</h4>
                  <p>
                    {Math.floor(order.timeSpent / 60)} min {order.timeSpent % 60} sec
                  </p>
                  <button onClick={() => handleStageChange(order.id)}>Next</button>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="main-screen">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Stage</th>
              <th>Total Time Spent (time from order placed)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{stages[order.stageIndex]}</td>
                <td>
                  {Math.floor(order.timeSpent / 60)} min {order.timeSpent % 60} sec
                </td>
                <td>
                  {stages[order.stageIndex] !== 'Order Picked' && (
                    <button onClick={() => handleCancel(order.id)}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Orders Delivered</td>
              <td>
                {orders.filter((order) => stages[order.stageIndex] === 'Order Picked').length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default App;
/  