const popularHotelData = [
  {
    id: "21",
    email : "OceanView200@gmail.com",
    name: "Ocean View Hotel ",
    image: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ],
    startPrice: 120,
    address: "La Bypass Accra ",
    rating: "3.5",
    favorite: true,
    facilities: ["Restaurant", "Packing", "WiFi", "Gym"],
    review: [
      {
        id: "2",
        user: {
          userId: 83702,
          name: "Bernard React",
          profileImage:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
        },
        date: "2023-04-12",
        review: "i love the place",
        reviewRating: "3.6",
      },
      {
        id: "23",
        user: {
          userId: 702,
          name: "Amaana Emma",
          profileImage:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        },
        date: "2023-04-12",
        review: "i love the place",
        reviewRating: "3.6",
      },
      {
        id: "423",
        user: {
          userId: 702,
          name: "Oliva Ayam",
          profileImage:
            "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        },
        date: "2023-04-12",
        review: "i love the place",
        reviewRating: "3.6",
      },
    ],
    overview:
      "The hotel is situated on the beachfront and offers stunning views of the sea The hotel is situated on the beachfront and offers stunning views of the sea The hotel is situated on the beachfront and offers stunning views of the sea",
    rooms: [
      {
        id: "55",
        roomsAvailable: 10,
        roomTitle: " Twin or Double Rooms with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "1 Double",
        guests: "2",
        wifi: true,
        squareMeter: "150m",
        price: 250,
        discountPer: 20,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "35",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "1 Double",
        guests: "2",
        wifi: true,
        squareMeter: "150m",
        price: 350,
        discountPer: 10,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "335",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "2 Double",
        guests: "4",
        wifi: true,
        squareMeter: "250m",
        price: 3250,
        discountPer: 30,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "33435",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "2 Double",
        guests: "4",
        wifi: true,
        squareMeter: "250m",
        price: 3250,
        discountPer: 30,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "3353",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "2 Double",
        guests: "4",
        wifi: true,
        squareMeter: "250m",
        price: 3250,
        discountPer: 30,
        roomDescription:
          " The hotel is situated onThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunningThe hotel is situated on The hotel is situated on the beachfront and offers stunning The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "3325",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "2 Double",
        guests: "4",
        wifi: true,
        squareMeter: "250m",
        price: 3250,
        discountPer: 30,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
    ],
  },
  {
    id: "210",
    name: "Lapalm Royal Hotel ",
    image: [
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    ],
    startPrice: 230,
    address: "La Bypass, Accra ",
    rating: "4.5",
    favorite: false,
    facilities: ["Restaurant", "Packing", "WiFi", "Gym"],
    review: [
      {
        id: "20",
        user: {
          userId: 72,
          name: "Amaana Emma",
          profileImage:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        },
        date: "2023-04-12",
        review: "i love the place",
        title: "",
        reviewRating: "3.6",
      },
    ],
    overview:
      "The hotel is situated on the beachfront and offers stunning views of the sea The hotel is situated on the beachfront and offers stunning views of the sea The hotel is situated on the beachfront and offers stunning views of the sea",
    rooms: [
      {
        id: "550",
        roomsAvailable: 10,

        roomTitle: " Twin or Double Rooms with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
          "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
          "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        ],
        bed: "1 Double",
        guests: "2",
        wifi: true,
        squareMeter: "150m",
        price: 250,
        discountPer: 20,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "350",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "1 Double",
        guests: "2",
        wifi: true,
        squareMeter: "150m",
        price: 350,
        discountPer: 10,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "33",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "2 Double",
        guests: "4",
        wifi: true,
        squareMeter: "250m",
        price: 3250,
        discountPer: 30,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
    ],
  },
  {
    id: "212",
    name: "Serenity Hotel ",
    image: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
    ],
    startPrice: 1100,
    address: "La Bypass, Accra ",
    rating: "2.5",
    favorite: true,
    facilities: ["Restaurant", "Packing", "WiFi", "Gym"],
    review: [
      {
        id: "22",
        user: {
          userId: 72,
          name: "Amaana Emma",
          profileImage:
            "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
        date: "2023-04-12",
        review: "i love the place",
        title: "",
        reviewRating: "3.6",
      },
    ],
    overview:
      "The hotel is situated on the beachfront and offers stunning views of the sea The hotel is situated on the beachfront and offers stunning views of the sea The hotel is situated on the beachfront and offers stunning views of the sea",
    rooms: [
      {
        id: "556",
        roomsAvailable: 10,

        roomTitle: " Twin or Double Rooms with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80",
        ],
        bed: "1 Double",
        guests: "2",
        wifi: true,
        squareMeter: "150m",
        price: 250,
        discountPer: 20,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "5",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        ],
        bed: "1 Double",
        guests: "2",
        wifi: true,
        squareMeter: "150m",
        price: 350,
        discountPer: 10,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
      {
        id: "335",
        roomsAvailable: 10,

        roomTitle: " Serenity Suite with Private Pool",
        image: [
          "https://images.unsplash.com/photo-1578898886225-c7c894047899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        ],
        bed: "2 Double",
        guests: "4",
        wifi: true,
        squareMeter: "250m",
        price: 3250,
        discountPer: 30,
        roomDescription:
          " The hotel is situated on The hotel is situated on the beachfront and offers stunning views of the sea the beachfront and offers stunning views of the sea",
      },
    ],
  },
];

export default popularHotelData;
