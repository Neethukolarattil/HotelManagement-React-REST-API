import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { listBooking } from '../services/allApi'
import { useState,useEffect } from 'react'
import { deleteBooking } from '../services/allApi'
import { toast } from 'react-toastify'
import Detail from './Detail'

function Home() {
    const [booking,setBooking]=useState([])

    useEffect(()=>{
        getAllBooking()

    },[])

    const getAllBooking=()=>{
        listBooking().then((res)=>{
            console.log(res.data);
            setBooking(res.data)
            
        })
    }

    const deleteData=(id)=>{
        deleteBooking(id).then((res)=>{
            console.log(res.data);
            toast.success("Booking Deleted")
            setBooking(booking.filter(booking=>booking.id !== id))

        }).catch ((err)=>{
            console.log(err);
            toast.error("Failed to delete")
        })
    }

  return (
    <>
    <Header />
    <div style={{maxWidth: '900px',margin: '20px auto', padding: '20px 30px 20px 20px',backgroundColor: '#B2BEB5', borderRadius: '10px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',textAlign: 'center'}}>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#000000', // Bright Gold
        marginBottom: '15px',
      }}>
        Experience the Height of Luxury with Us
      </h1>
      
      <p style={{
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '15px',
        fontWeight: '400',
        color: '#000000', // Light Gray
        lineHeight: '1.5',
        marginBottom: '15px',
      }}>
        At our hotel, luxury isn't just an amenity—it's a way of life. Step into a world where every moment is tailored to perfection, and every detail is a testament to refined elegance.
      </p>
      
      <Link to={'/add'} className="btn btn-warning mt-2" style={{backgroundColor: '#000000'}}>Book Now</Link>
    </div>
    <div className='container'>
        <div className='row'>
            <div className='col-md-12 p-3 mt-3'>
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        booking.length > 0 ?
                            booking.map(res=>(
                                <tr>
                                    <td>{res.name}</td>
                                    <td>{res.place}</td>
                                    <td>{res.email}</td>
                                    <td>{res.phone}</td>
                                    <td>{res.price} per day</td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <div className="mx-2">
                                            <Detail hotel={res} />
                                        </div>
                                        <Link to={`/edit/${res.id}`} className="btn btn-success mx-2" style={{ width: '100px' }}>Edit</Link> 
                                        <button className="btn btn-danger mx-2" onClick={()=>deleteData(res.id)}  style={{ width: '100px' }}>Delete</button>
                                    </td>


                            </tr>


                        ))
                        : <tr>
                            <td colSpan={6}>
                                <h3>No Data</h3>
                            </td>
                        </tr>
                        
                    }
                    
                                        
                </tbody>
            </table>


            </div>

        </div>
    </div>
    

    </>
  )
}

export default Home