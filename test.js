const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');
const app = require('./server'); 
const request = supertest(app);

describe('NFT API', () => {
  let createdNFTId;

  it('should return a list of all NFTs', (done) => {
    request.get('/nfts')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        // Add more assertions as needed
        done();
      });
  });

  it('should create a new NFT', (done) => {
    const newNFT = {
      name: 'My NFT',
      description: 'This is my first NFT',
      image: 'https://example.com/my-nft-image.jpg'
    };

    request.post('/nfts')
      .send(newNFT)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        // Store the created NFT ID for further testing
        createdNFTId = res.body.id;
        done();
      });
  });

  it('should get a single NFT by ID', (done) => {
    request.get(`/nfts/${createdNFTId}`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', createdNFTId);
        expect(res.body).to.have.property('name', 'My NFT');
        expect(res.body).to.have.property('description', 'This is my first NFT');
        expect(res.body).to.have.property('image', 'https://example.com/my-nft-image.jpg');
        // Add more assertions as needed
        done();
      });
  });

  it('should update an existing NFT', (done) => {
    const updatedNFT = {
      name: 'Updated NFT',
      description: 'This is an updated version of my NFT',
      image: 'https://example.com/updated-nft-image.jpg'
    };

    request.put(`/nfts/${createdNFTId}`)
      .send(updatedNFT)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', createdNFTId);
        // Add more assertions as needed
        done();
      });
  });

  it('should delete an existing NFT', (done) => {
    request.delete(`/nfts/${createdNFTId}`)
      .expect(204)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        // Verify that the NFT has been deleted (optional)
        request.get(`/nfts/${createdNFTId}`)
          .expect(404)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
  });
});
