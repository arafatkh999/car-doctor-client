import React, { useContext } from 'react';
import {
    json,
    useLoaderData
} from "react-router-dom";
import { AuthContext } from '../../providers/AuthProvider';

const CheckOut = () => {
    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const {user} = useContext(AuthContext)

    const handleCheckOutService = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            date,
            service: title,
            service_id: _id,
            price: price,
            img: img
        }
        console.log(booking)

        fetch('https://car-doctor-server-phi-six.vercel.app/bookings',{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                alert('Data added Successfully')
            }
        })
    }
    return (
        <div>
            <h2 className='text-3xl text-center'>Book Service : {title}</h2>

            <form onSubmit={handleCheckOutService}>
                <div className="card-body">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" defaultValue={user?.displayName} name='name' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name='date' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" defaultValue={'$' +price} className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-warning" type="submit" value="Order Confirm" />
                    </div>
                </div>
            </form>


        </div>
    );
};

export default CheckOut;