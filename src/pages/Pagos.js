


import * as React from 'react';

function BuyButtonComponent() {
    // Paste the stripe-buy-button snippet in your React component
    return (
        <stripe-buy-button
            buy-button-id="'{{BUY_BUTTON_ID}}'"
            publishable-key="pk_test_oEG0IZPZNva0eM8MJH88nh59001XjrKX4A"
        >
        </stripe-buy-button>
    );
}

export default BuyButtonComponent;
