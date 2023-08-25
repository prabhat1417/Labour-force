import React, { useState } from 'react';

const CustomerTable = ({ customers }) => {
    // console.log("customers ", customers);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    return (
        <div className='customers'>
            <div className='text-value'>Your customers</div>
            <table className='customer-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* <th>Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customer, index) => (
                        <tr
                            key={index}
                            onClick={() => setSelectedCustomer(customer)}
                            className={selectedCustomer === customer ? 'selected' : ''}
                        >
                            {/* <td>{index + 1}</td>
                            <td>{custome.namer}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.status}</td> */}

                            <td>{index + 1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            {/* <td>4597645656</td>
                            <td>Pending</td> */}

                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedCustomer && (
                <div className='customer-details'>
                    <h2>Customer Details</h2>
                    <p><strong>Name:</strong> {selectedCustomer.name}</p>
                    <p><strong>Phone number:</strong> {selectedCustomer.email}</p>
                    {/* <p><strong>Status:</strong> {selectedCustomer.status}</p> */}
                </div>
            )}
        </div>
    );
};

export default CustomerTable;
