# NFT API

This API allows users to perform CRUD (Create, Read, Update, Delete) operations on NFTs (Non-Fungible Tokens). It is implemented using web3.js for Ethereum integration and IPFS for decentralized storage.

## Table of Contents
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Test Suite](#test-suite)

<a id="installation"></a>
## Installation

1. Clone the repository:
   ```shell
   git clone <repository-url>
   cd NFT-API

2. Install the dependencies:
    ```shell
    npm install

3. Start the server:
    ```shell
    node server.js

The server will be running at 'http://localhost:8000'.


<a id="api-endpoints"></a>
## API Endpoints
The API provides the following endpoints for interacting with NFTs:
    
   - GET /nfts: Get a list of all NFTs.
   - GET /nfts/:id: Get a single NFT by ID.
   - POST /nfts: Create a new NFT.
   - PUT /nfts/:id: Update an existing NFT.
   - DELETE /nfts/:id: Delete an existing NFT.

<a id="authentication"></a>
## Authentication
All requests to the API must be authenticated using a JWT (JSON Web Token). To authenticate, include the JWT token in the Authorization header of each request with the format: 'Bearer <token>'.

<a id="usage-examples"></a>
## Usage Examples
Here are some examples of how to use the API endpoints:
1. Get a list of all NFTs:
    ```shell
    GET /nfts

2. Get a single NFT by ID:
    ```shell
    GET /nfts/:id

3. Create a new NFT:
    ```shell
    POST /nfts

    Requested body:
    {
    "name": "My NFT",
    "description": "This is my first NFT",
    "image": "https://example.com/my-nft-image.jpg"
    }
    ```

4. Update an existing NFT:
    ```shell
    PUT /nfts/:id

    Requested body:
    {
    "name": "Updated NFT",
    "description": "This is an updated version of my NFT",
    "image": "https://example.com/updated-nft-image.jpg"
    }
    ```

5. Delete an existing NFT:
    ```shell
    DELETE /nfts/:id

<a id="test-suite"></a>
## Test Suite
The API includes a test suite to ensure the functionality and correctness of the endpoints. To run the test suite, follow these steps:

1. Make sure the server is not running.

2. Open a terminal and navigate to the project directory.

3. Run the following command:

    ```shell
    npx mocha

This will execute the test cases and display the test results in the terminal.

The test suite covers various scenarios and validates the expected behavior of the API endpoints. It ensures that the API functions correctly and maintains the desired functionality.

The test cases are written using the Mocha testing framework and the Chai assertion library. You can find the test files in the test directory.

Feel free to add additional test cases or modify the existing ones to suit your requirements and validate different scenarios.

