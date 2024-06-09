import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosCommon from "@/hooks/useAxiosCommon";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({handleOpen, refetchBadge}) => {
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const { user } = useAuth()
  const stripe = useStripe();
  const elements = useElements();
  const axiosCommon = useAxiosCommon()
  const totalPrice = 40;

  const navigate = useNavigate()
  useEffect(() => {
    if(totalPrice>0){
      axiosCommon.post('/create-payment-intent', { price: totalPrice })
      .then(res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
    }
  }, [axiosCommon, totalPrice])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log("payment error: ", error)
      setError(error.message)
    } else {
      setError(null)
      console.log("payment method: ", paymentMethod)
    }

    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    })
    if(confirmError){
      console.log('confirm error', confirmError)
    }else{
      console.log("payment intent",paymentIntent)
      if(paymentIntent.status === 'succeeded'){
        setTransactionId(paymentIntent.id)
        console.log('transaction id', paymentIntent.id) 

        // now save the payment in database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date().toLocaleDateString(), 
          status: 'successful',
          badge: 'gold',
        }
        const res = await axiosCommon.post('/payments',payment)
        if(res.data?.insertedId){
          const badgeUpdateResult = await axiosCommon.put(`/user/badge/${user?.email}`)
          console.log(badgeUpdateResult)
          if(badgeUpdateResult.data?.modifiedCount>0){
            handleOpen()
            navigate('/')
            refetchBadge()
            toast.success("Your Payment is successful")
          }
        }  
      }
      else{
        toast.error("Payment could not be completed")
      }
    }

  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '20px',
              color: 'black',
              '::placeholder': {
                color: 'black',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <p className="text-red-700 mt-4">{error}</p>
      <p className="text-green-700 mt-4 text-center text-lg font-semibold">{transactionId && "Payment Successful. Click on close and Enjoy all the services"}</p>
      
      {
        !transactionId && <button className="w-full btn bg-c-primary text-white mt-5 py-2 rounded-md cursor-pointer" type="submit" disabled={transactionId ||!stripe || !clientSecret}>
        Pay
      </button>
      }
    </form>
  );
};


CheckoutForm.propTypes = {
  handleOpen : PropTypes.func,
  refetchBadge : PropTypes.func
};

export default CheckoutForm;
