import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PayPalPayment({ bookingId }) {
    const navigate = useNavigate();

const handleSuccess = async (bookingId) => {
    await axios.post("http://127.0.0.1:8000/booking/mark-paid/", {
        booking_id: bookingId
    });

    alert("Payment successful!");

    let user_id = localStorage.getItem('user_id');
    navigate(`/userbookings/${user_id}`);
};
}

export default PayPalPayment;