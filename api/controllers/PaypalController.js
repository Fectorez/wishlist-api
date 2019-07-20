// 1. Set up your server to make calls to PayPal

// 1a. Import the SDK package
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

// 1b. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
/**
 *
 * PayPal HTTP client dependency
 */
const payPalClient = require('../../config/paypal');

const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AU0bWy_C3EBJ0NTTtf_FlfKdPA1sTreLyJ-9S5bycKqgu6W69l_vQWQlfldWkMdFd7ycMa3sEV6aaksC',
    'client_secret': 'EHi1ZQZl1LwjqqXGwUcHC0PFw4eqCDiGRUG6LW6gsB7jQ9EX2_SiKMdmhlPsNKZzsiVx8OOPBQTU1bIa'
});
const BUSINESS_EMAIL = "wishit-business@gmail.com";
const axios = require("axios");
// 2. Set up your server to receive a call from the client
module.exports = {
    /*handleRequest: async function(req, res) {
        console.log("handleRequest");
        // 2a. Get the order ID from the request body
        const orderID = req.body.orderID;
console.log("orderid=",orderID)
        // 3. Call PayPal to get the transaction details
        let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);
        console.log("request=",request)
        let order;
        try {
            order = await payPalClient.client().execute(request);
            console.log("order=",order)
        } catch (err) {
            console.log("err=",err)
            // 4. Handle any errors from the call
            console.error(err);
            return res.send(500);
        }
        // 5. Validate the transaction details are as expected
        if (order.result.purchase_units[0].amount.value !== '220.00') {
            return res.send(400);
        }
        // 6. Save the transaction in your database
        // await database.saveTransaction(orderID);
        console.log("saving transaction orderId="+orderId);
        // 7. Return a successful response to the client
        return res.send(200);
    },
    pay: async function(req, res) {
        console.log("pay")
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:1337/success",
                "cancel_url": "http://localhost:1337/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Super Balai",
                        "sku": "001",
                        "price": "25.00",
                        "currency": "EUR",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "EUR",
                    "total": "25.00"
                },
                "description": "Achetez le super balai !!!"
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
                //res.send('test');
                payment.links.forEach(link => {
                    if ( link.rel === 'approval_url' ) {
                        //res.redirect(link.href);
                        res.send({'redirect': link.href});
                    }
                });
            }
        });
    },
    success: async function(req, res) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": "25.00"
                }
            }]
        };
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("Get Payment Response");
                console.log(JSON.stringify(payment));
                res.send('Success');
            }
        });
    },
    cancel: async function(req, res) {
        res.send('Cancelled');
    }*/

    saveDonation: async function(req, res) {
        const data = {
            amount: req.body.amount,
            donor: parseInt(req.body.donorId),
            prizePool: parseInt(req.body.prizePoolId)
        };

        const donation = await Donation.create(data).fetch();
        res.send(donation);
    },

    receiveDonations: async function(req, res) {
        const wishlistId = parseInt(req.body.wishlistId);
        
        // Find wishlist
        const foundWishlists = await Wishlist.find({where: {id: wishlistId}}).populate('prizePool');
        if ( foundWishlists.length == 0 ) {
            return res.error({message: "Wishlist with id " + wishlistId + " does not exist"});
        }
        const wishlist = foundWishlists[0];

        // Find receiver
        const receiverId = wishlist.owner;
        const receivers = await User.find({where: {id: receiverId}});
        if ( receivers.length == 0 ) {
            return res.error({message: "Owner of wishlist " + wishlistId + " does not exist"});
        }
        const receiver = receivers[0];

        // Find prizePool
        const prizePools = wishlist.prizePool;
        if ( prizePools.length == 0 ) {
            return res.error({message: "PrizePool with of wishlist " + wishlistId + " does not exist"});
        }
        const prizePool = prizePools[0];

        // Find amount
        let fullAmount = 0;
        const donations = await Donation.find({where: {prizePool: prizePool.id}});
        donations.forEach( donation => {
            fullAmount += donation.amount;
        });

        const url = "https://svcs.sandbox.paypal.com/AdaptivePayments/Pay";

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-PAYPAL-SECURITY-USERID': 'wishit-business_api1.gmail.com',
                'X-PAYPAL-SECURITY-PASSWORD': '2XTSWPTM963XBQY7',
                'X-PAYPAL-SECURITY-SIGNATURE': 'AQbjwLfh03pWJAn0WDJtp8F0-dIkAcpwM9YJ0IbysjKBT5Xf08QSulT.',
                'X-PAYPAL-APPLICATION-ID': 'APP-80W284485P519543T',
                'X-PAYPAL-REQUEST-DATA-FORMAT': 'JSON',
                'X-PAYPAL-RESPONSE-DATA-FORMAT': 'JSON'
            }
        }

        const data = 
        {
            "actionType": "PAY",
            "currencyCode": "EUR",
            "senderEmail": BUSINESS_EMAIL,
            "receiverList": {
              "receiver": [{
                "amount": fullAmount,
                "email": receiver.email
              }]
            },
            "returnUrl": "https://example.com/return",
            "cancelUrl": "https://example.com/cancel",
            "requestEnvelope": {
              "errorLanguage": "en_US",
              "detailLevel": "ReturnAll"
            }
        }

        axios.post(url, data, config)
            .then( response => {
                const responseBody = {
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data
                };

                // Mettre les dons concernés en base à "collecté"
                if ( response.status == 200 ) {
                    Donation.update({where: {prizePool: prizePool.id}}).set({collected: true}).then( () => {
                        res.send(responseBody);
                    });
                }
                else {
                    res.send(responseBody);
                }
                
            }).catch( error => {
                res.send({error: error});
            });
    }
}