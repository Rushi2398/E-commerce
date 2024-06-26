# E-commerce
E-commerce API that provides order processing and product management with user authentication.
User needs to authenticated i.e. Registered and logged in to access all the products and order endpoints. User can add and remove products from the inventory, also create, read, update and delete the set of orders for a product.

## Installation
For local installation follow the below steps:

1. Clone the repository
```bash
git clone https://github.com/Rushi2398/E-commerce.git
```

2. Run the command 
```bash
npm install
```

3. Create the .env file in root folder with following parameters
```bash
DATABASE_URL="DB_URL"
JWT_SECRET="your_jwt_secret"
PORT="port_number"
```

4. Run the command from the root folder to start the server
```bash
npm start || node index.js
```

5. Run the command for generating prisma clients
```bash
npx prisma generate
```

6. You can access the following endpoints
```bash
/users/register - POST METHOD
/users/login - POST METHOD

/products/ - POST METHOD
/products/ - GET METHOD
/products/:id - PUT METHOD
/products/:id - DELETE METHOD

/orders/ - GET METHOD
/orders/ - POST METHOD
```

## Live Server
[E-commerce](https://e-commerce-pesto.vercel.app/)

## Test
Payload to test each endpoint.

1. /users/register <br />
Registers a new user

Request body
```bash
{
    username,
    password,
    email
}
```

2. /users/login <br />
Login endpoint which generates an auth token to access the protected endpoints

Request body
```bash
{
    username,
    password
}
```


All the methods after login will require the token generated after login in Request Headers. <br />
3. /products/ - POST METHOD <br />
Add a new product into the inventory

Request body
```bash
{ 
    name, 
    description, 
    price, 
    quantity 
}
```

4. /products/ - GET METHOD <br />
Get all the products present

no parameters

5. /products/:id - PUT METHOD <br />
Update the products present in the inventory

Request Parameters
```bash 
{ 
    id 
}
```

Request body
```bash
{ 
    name, 
    description, 
    price, 
    quantity 
}
```

6. /products/:id - DELETE METHOD <br />
Delete a particular product from the inventory

Request Parameters
```bash 
{ 
    id 
}
```

7. /orders/ - GET METHOD <br />
Get all the orders present in the system <br />
no parameters

8. /orders/ - POST METHOD <br />
Create a new order which modifies the number of product in the system.

Request Body
```bash
{ 
    userId, 
    productId, 
    quantity, 
    total 
}
```

## Tech Stack

Node - runtime <br />
Express - for creating endpoints <br />
Zod - for input validation <br />
Prisma - ORM for PostgresSQL <br />
