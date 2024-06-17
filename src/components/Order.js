// client/src/components/Order.js

import React, { useState } from 'react';

const Order = ({ socket }) => {
    const [customerName, setCustomerName] = useState('');
    const [coffeeType, setCoffeeType] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'customerName') setCustomerName(value);
        if (name === 'coffeeType') setCoffeeType(value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            socket.emit('orderRequest', { customerName, coffeeType });
            setCustomerName('');
            setCoffeeType('');
        } catch (err) {
            setError('Error placing order');
        }
    };

    return (
        <div>
            <h1>Coffee Orders</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="customerName"
                    value={customerName}
                    onChange={handleInputChange}
                    placeholder="Customer Name"
                />
                <input
                    type="text"
                    name="coffeeType"
                    value={coffeeType}
                    onChange={handleInputChange}
                    placeholder="Coffee Type"
                />
                <button type="submit">Place Order</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Order;
