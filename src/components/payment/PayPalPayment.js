import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PayPalPayment({ bookingId, seats }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const pricePerSeat = 5;
    console.log("seats:", seats);
    const totalAmount = Number(seats) * pricePerSeat;

    const handlePayment = async () => {
        try {
            setLoading(true);

            const response = await axios.post(
                "http://127.0.0.1:8000/booking/create-paypal-order/",
                { booking_id: bookingId },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            );

            console.log("Order created:", response.data);

            alert("Payment successful (Demo)");
            navigate(`/userbookings/${user_id}`);
        } catch (error) {
            console.error("Payment Error:", error);
            console.error("Backend Response:", error.response?.data);
            alert("Payment failed");
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary btn-lg fw-bold"
                onClick={() => setShowModal(true)}
            >
                Open Payment
            </button>

            {showModal && (
                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header border-secondary">
                                <h5 className="modal-title">Payment Summary</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <p><strong>Price per seat:</strong> ${pricePerSeat}</p>
                                <p><strong>Number of seats:</strong> {seats}</p>
                                <p><strong>Total amount:</strong> ${totalAmount}.00</p>
                            </div>

                            <div className="modal-footer border-secondary">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handlePayment}
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Pay Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PayPalPayment;