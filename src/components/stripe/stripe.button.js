import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from "../../helpers/axios";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51I5ONZJFKC7q317HuArGZAW0aeNuEI04B5fjoE379haN3uQzZlHZZqdAufjUmeoiQsVpexMLuXXuRBVxnV3aVH8u00Kf2l7EyU';

    const onToken = token => {
        console.log(token);
        const info = {
           email : token.email,
           id : token.id,
           name : token.card.name,
           address : token.card.address_line1,
           card : token.object,
           brand : token.card.brand
        };
        axios.post(`/endEmailPay`,info);
        alert('Payment Succesful!');

    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='Freaky Jolly Co.'
            billingAddress
            shippingAddress
            image='http://localhost:2000/public/logobbb.jpg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;