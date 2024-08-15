import React from 'react';
import Header from '../components/Header';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBooking, editBooking } from '../services/allApi';
import { toast } from 'react-toastify';

function Edit() {
    const [bookData, setBookData] = useState({
        id:'',name: '', place: '', email: '', phone: '', price: ''
    })

    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id);
    
    
    useEffect(() => {
        getBookingData();
    }, []);

    const getBookingData = () => {
        getBooking(id).then((res) => {
            console.log(res.data);
                setBookData({
                    id: res.data.id,
                    name: res.data.name,
                    place: res.data.place,
                    email: res.data.email,
                    phone: res.data.phone,
                    price: res.data.price
                });
            })
           
    };

    const updateData = (e) => {
        e.preventDefault();

        const { name, place, email, phone, price } = bookData;
        if (!name || !place || !email || !phone || !price) {
            toast.error('Please fill all the fields');
        } 
        else {
            editBooking(bookData.id, { name, place, email, phone, price }).then((res) => {
                    toast.success("Booking Updated");
                    navigate('/');
                })
                
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className='border shadow mt-5'>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-6 d-flex align-items-center justify-content-center mt-3 mb-3">
                            <h2>Edit Booking Details</h2>
                        </div>
                        <div className='col-md-7'>
                            <form action="">
                                <FloatingLabel controlId="floatingName" label="Booking Name" className="mb-3">
                                    <Form.Control type="text" placeholder="Enter Booking Name" value={bookData.name} onChange={(e) => setBookData({ ...bookData, name: e.target.value })} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPlace" label="Place" className="mb-3">
                                    <Form.Control type="text" placeholder="Location" value={bookData.place} onChange={(e) => setBookData({ ...bookData, place: e.target.value })} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" value={bookData.email} onChange={(e) => setBookData({ ...bookData, email: e.target.value })} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPhone" label="Phone Number" className="mb-3">
                                    <Form.Control type="number" placeholder="Enter 10-digits Phone Number" value={bookData.phone} onChange={(e) => setBookData({ ...bookData, phone: e.target.value })} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingSalary" label="Price" className="mb-3">
                                    <Form.Control type="number" placeholder="Price" value={bookData.price} onChange={(e) => setBookData({ ...bookData, price: e.target.value })} />
                                </FloatingLabel>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <button className="btn btn-success m-3" type='submit' onClick={(e) => updateData(e)}>Update</button>
                                    <button className="btn btn-danger" type='button' onClick={() => navigate('/')}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;
