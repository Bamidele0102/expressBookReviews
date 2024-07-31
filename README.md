# A Book Review Application

This repository contains a server-side online book review application and integrate it with a secure REST API server which will use authentication at the session level using JWT.

## Objectives

After completing this lab, you will be able to:

Create APIs and perform CRUD operations on an Express server using Session & JWT authentication.
Use Async/Await or Promises with Axios in Node.js.
Create REST API endpoints and test them using Postman.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Bamidele0102/expressBookReviews.git
```

### Change into the directory

```bash
cd expressBookReviews
```

### Install the dependencies/packages

```bash
npm install
```

### Start the server without authentication

```bash
npm start
```

### Test the endpoints using cURL/Postman

#### GET all books

```bash
curl GET localhost:5000/
```

#### GET all books based on the ISBN number

```bash
curl --request GET 'localhost:5000/isbn/:isbn'
```

#### GET all books based on author

```bash
curl --request GET 'localhost:5000/author/:author'
```

#### GET all books based on the title

```bash
curl --request GET 'localhost:5000/title/:title'
```

#### POST request to register a new user

```bash
curl --request POST 'localhost:5000/register'
```

#### POST request to login a registered user

```bash
curl --request POST 'localhost:5000/login'
```

#### PUT request to modify a book review

```bash
curl --request PUT 'localhost:5000/auth/review/:isbn'
```

#### DELETE request to delete a book review

```bash
curl --request DELETE 'localhost:5000/auth/review/:isbn'
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Contact

For any inquiries or support, please contact me via [mail](mailto:idowu.olayiwola.bamidele@gmail.com).

