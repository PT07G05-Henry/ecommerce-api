# Documentacion para comunicarse con la API eCommerce

## API ENDPOINT V1

### PRODUCTS

**get all**

GET https://6evi.duckdns.org:1337/products

**get by Id**

GET https://6evi.duckdns.org:1337/products/{id}

**create a product**

Protection:

- Must be authenticated
- Must be admin

POST https://6evi.duckdns.org:1337/products?sid={sid}

query: sid ---> Session ID from auth0

body: {
"name": {name}, STRING not allow null
"price" : {price}, STRING not allow null
"description" : {descript}, STRING not allow null
"stock" : {stock}, STRING not allow null
"images" : [{image}] ARRAY(img) must be an image. Allow null
"categories": [{category}] ARRAY("STRING") not allow null
}

**update product**

Protection:

- Must be authenticated
- Must be admin

PUT https://6evi.duckdns.org:1337/products?sid={sid}

query: sid ---> Session ID from auth0

body: {
"id" : {id}, STRING required,
"name": {name}, STRING
"price" : {price}, STRING
"description" : {descript}, STRING
"stock" : {stock}, STRING
"images" : [{image}] ARRAY(img) must be an image.
"categories": [{category}] ARRAY("STRING")
}

**delete product**

Protection:

- Must be authenticated
- Must be admin

DELETE https://6evi.duckdns.org:1337/products?sid={sid}

query: sid ---> Session ID from auth0

body: { "id" : {id} STRING required }

### CATEGORIES

**get all categories**

GET https://6evi.duckdns.org:1337/categories

**create category**

Protection:

- Must be authenticated
- Must be admin

POST https://6evi.duckdns.org:1337/categories?sid={sid}

query: sid ---> Session ID from auth0

body: {
"name": {name}, STRING required
"image" : {image} IMG required
}

**update category**
Protection:

- Must be authenticated
- Must be admin

PUT https://6evi.duckdns.org:1337/categories?sid={sid}

query: sid ---> Session ID from auth0

body: {
"id" : {id}, NUMBER required
"name": {name}, STRING
"image" : {image} IMG
}

**delete category**

Protection:

- Must be authenticated
- Must be admin

DELETE https://6evi.duckdns.org:1337/categories?sid={sid}

query: sid ---> Session ID from auth0

body: {
"id" : {id}, NUMBER required
}

### ORDERS

**get orders for certain admin or user**

Protection:

- Must be authenticated

GET https://6evi.duckdns.org:1337/orders?sid={sid}

query: sid ---> Session ID from auth0

**get all orders**

Protection:

- Must be authenticated
- Must be superAdmin

GET https://6evi.duckdns.org:1337/orders/all?sid={sid}

query: sid ---> Session ID from auth0

**create order**

Protection:

- Must be authenticated
- Must be user

POST https://6evi.duckdns.org:1337/orders?sid={sid}

query: sid ---> Session ID from auth0

body: {
"productId": {productId}, STRING required
"quantity": {quantity} NUMBER required
}

**update order**

PUT https://6evi.duckdns.org:1337/orders?sid={sid}

query: sid ---> Session ID from auth0

FALTA DESARROLLAR

**delete order**

DELETE https://6evi.duckdns.org:1337/orders?sid={sid}

query: sid ---> Session ID from auth0

FALTA DESARROLLAR

### COMMENTS

**get all comments**

GET https://6evi.duckdns.org:1337/comments

**get comment by id**

GET https://6evi.duckdns.org:1337/comments/{id}

**create comment**

Protection:

- Must be authenticated
- Must be user

POST https://6evi.duckdns.org:1337/comments?sid={sid}

query: sid ---> Session ID from auth0

body{
"value" : {value}, STRING required
"productId" : {productId} STRING required
"rating" : {rating} STRING required ["0", "1", "2", "3", "4", "5"]
}

**update comment**

Protection:

- Must be authenticated
- Must be user and the owner comment

PUT https://6evi.duckdns.org:1337/comments?sid={sid}

query: sid ---> Session ID from auth0

body{
"id" : {id} NUMBER required
"value" : {value}, STRING required
}

HAY QUE CORREGIR PARA QUE PUEDA MODIFICAR RATING

**delete comment**

Protection:

- Must be authenticated
- Must be user and the owner comment

DELETE https://6evi.duckdns.org:1337/comments?sid={sid}

query: sid ---> Session ID from auth0

body{
"id" : {id} NUMBER required
}

### PAYMENTS

### DELIVERIES

### USERS

**get all users**

Protection:

- Must be authenticated
- Must be superadmin

GET https://6evi.duckdns.org:1337/users/all?sid={sid}

query: sid ---> Session ID from auth0
**get user by id**

Protection:

FALTA PROTECCION

GET https://6evi.duckdns.org:1337/users/{id}

query: sid ---> Session ID from auth0
**log in or sign up**

POST https://6evi.duckdns.org:1337/users/auth0?sid={sid}

query: sid ---> Session ID from auth0

body: {
"first_name": {first_name}, STRING required
"last_name": {last_name}, STRING required
"picture_profile": {picture_profile}, URL picture profile not required
"email": {email}, EMAIL required
"sid": {sid}, STRING(32) required
"social": {social} STRING ["google", "apple", "microsoft", "auth0"]
"birthday": {birthday}, STRING not required
}
**update user**

FALTA DESARROLLAR

**delete user**

FALTA DESARROLLAR
