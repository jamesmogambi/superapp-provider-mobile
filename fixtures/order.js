export const orders = [
  {
    id: "oijiewjfijjjiojwf",
    service: "Pet Care",
    serviceImage: require("../assets/images/takeaway.png"),
    paymentType: "Cash",
    orderId: 67464469749,
    bookingDate: "11 Nov 2023, Wed, 04:00 PM - 05:00 PM",
    price: 950,
    status: "New Order",
    deliveryAddress: "7958 Swift Village ,Chicago , US",
    deliveryTime: "11 Nov 2023, Wed, 04:00 PM - 05:00 PM",
    bookingID: "775777547857",
    customer: {
      name: "Tami S. Schaefer",
      phone: "+254701694004",
      image: require("../assets/images/user.jpg"),
    },
    tax: 50,

    order: [
      {
        name: "Makeup",
        items: [
          {
            name: "Concealer",
            quantity: 2,
            price: 350,
          },
        ],
      },
      {
        name: "Makeup",
        items: [
          {
            name: "Concealer",
            quantity: 2,
            price: 350,
          },
          {
            name: "Concealer",
            quantity: 2,
            price: 350,
          },
        ],
      },
    ],
  },
];
