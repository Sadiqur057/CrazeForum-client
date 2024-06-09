import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import PropTypes from 'prop-types';




const stripePromise = loadStripe(import.meta.env.  VITE_STRIPE_PAYMENT_GATEWAY_KEY)
const Payment = ({handleOpen, refetchBadge}) => {

  return (
    <div className="px-10 py-20">
      <div>
        <Elements stripe={stripePromise}>
           <CheckoutForm handleOpen={handleOpen} refetchBadge={refetchBadge}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};
Payment.propTypes = {
  handleOpen : PropTypes.func,
  refetchBadge: PropTypes.func
};

export default Payment;