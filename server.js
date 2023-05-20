const express = require('express');
const jwt = require('jsonwebtoken');
const ipfsAPI = require('ipfs-api');
const Web3 = require('web3');

// Set up Express app
const app = express();
app.use(express.json());

// Set up IPFS node
const startIPFSNode = async () => {
  // Connect to the local IPFS node
  const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });
  return ipfs;
};

// Set up Web3 provider (replace with your preferred Ethereum provider)
const web3 = new Web3('https://mainnet.infura.io/v3/02f9078a2bc9455f89ac6b5af41fcd09');

// Secret key for JWT token
const secretKey = 'your-secret-key';

// JWT token middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }

    req.user = user;
    next();
  });
};

// Endpoint: Get a list of all NFTs
app.get('/nfts', authenticateToken, async (req, res) => {
  try {
    const ipfs = await startIPFSNode();

    // Retrieve list of NFTs from IPFS or your preferred storage mechanism
    const nfts = await ipfs.cat('/nfts.json');
    const nftsData = JSON.parse(nfts.toString());

    // Return the list of NFTs as JSON response
    return res.json({ nfts: nftsData });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Endpoint: Get a single NFT by ID
app.get('/nfts/:id', authenticateToken, async (req, res) => {
  const nftId = req.params.id;

  try {
    const ipfs = await startIPFSNode();

    // Retrieve the NFT with the specified ID from IPFS or your preferred storage mechanism
    const nft = await ipfs.cat(`/nfts/${nftId}.json`);
    const nftData = JSON.parse(nft.toString());

    // Return the NFT as JSON response
    return res.json({ nft: nftData });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Endpoint: Create a new NFT
app.post('/nfts', authenticateToken, async (req, res) => {
  const nftData = req.body;

  try {
    const ipfs = await startIPFSNode();

    // Store the NFT on IPFS or your preferred storage mechanism
    const addedNft = await ipfs.add(Buffer.from(JSON.stringify(nftData)));
    const nftId = addedNft.cid.toString();

    // Return the created NFT ID as JSON response
    return res.json({ nftId: nftId });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Endpoint: Update an existing NFT
app.put('/nfts/:id', authenticateToken, async (req, res) => {
  const nftId = req.params.id;
  const updatedNftData = req.body;

  try {
    const ipfs = await startIPFSNode();

    // Update the NFT with the specified ID on IPFS or your preferred storage mechanism
    await ipfs.rm(`/nfts/${nftId}.json`);
    await ipfs.add(Buffer.from(JSON.stringify(updatedNftData)), {
      cid: `/nfts/${nftId}.json`
    });

    // Return success message as JSON response
    return res.json({ message: 'NFT updated successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Endpoint: Delete an existing NFT
app.delete('/nfts/:id', authenticateToken, async (req, res) => {
  const nftId = req.params.id;

  try {
    const ipfs = await startIPFSNode();

    // Delete the NFT with the specified ID from IPFS or your preferred storage mechanism
    await ipfs.rm(`/nfts/${nftId}.json`);

    // Return success message as JSON response
    return res.json({ message: 'NFT deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
