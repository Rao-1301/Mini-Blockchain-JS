// Assignment 1 — Extended Mini Blockchain in JavaScript
// Author: Barot Pranav (16373096)
const crypto = require('crypto');

/** A single block in the chain */
class Block {
  /**
   * @param {number} index
   * @param {string} timestamp 
   * @param {Array<object>} data 
   * @param {string} previousHash 
   */
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = Array.isArray(data) ? data : [data]; 
    this.previousHash = previousHash;
    this.nonce = 0; // used for mining
    this.hash = this.calculateHash();
  }

  /** Compute SHA-256 over the block’s contents */
  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        String(this.index) +
        this.timestamp +
        JSON.stringify(this.data) +
        this.previousHash +
        String(this.nonce)
      )
      .digest('hex');
  }

  /** Proof-of-Work: find a hash starting with N leading zeros, log attempts & timing */
  mineBlock(difficulty) {
    const target = '0'.repeat(difficulty);
    this.nonce = 0;
    const start = Date.now();
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    const ms = Date.now() - start;
    console.log(` Block mined (idx=${this.index}) in ${this.nonce} attempts (${ms} ms): ${this.hash}`);
  }
}

/** A simple blockchain container */
class Blockchain {
  constructor(difficulty = 3) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), [{ note: 'Genesis Block' }], '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Add a new block to the chain.**/
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  /** Verify integrity: hash consistency + correct previousHash links */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];
      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

/* ---------------------- DEMO / WALKTHROUGH ---------------------- */
function main() {
  // 1) Create a chain with difficulty >= 3
  const demoCoin = new Blockchain(3);

  // 2) Add blocks with arrays of transactions (>= 5 total)
  console.log(' Mining block #1 ...');
  demoCoin.addBlock(new Block(1, Date.now().toString(), [
    { from: 'Alice',   to: 'Bob',    amount: 50 },
    { from: 'Bob',     to: 'Alice',  amount: 10 },
  ]));

  console.log(' Mining block #2 ...');
  demoCoin.addBlock(new Block(2, Date.now().toString(), [
    { from: 'Charlie', to: 'Dana',   amount: 75 },
    { from: 'Dana',    to: 'Eve',    amount: 15 },
  ]));

  console.log(' Mining block #3 ...');
  demoCoin.addBlock(new Block(3, Date.now().toString(), [
    { from: 'Eve',     to: 'Frank',  amount: 20 },
    { from: 'Gina',    to: 'Hank',   amount: 10 },
  ]));

  // 3) Show the chain
  console.log('\n Full chain:');
  console.log(JSON.stringify(demoCoin, null, 2));

  // 4) Validate
  console.log('\n Is chain valid?', demoCoin.isChainValid());

  // 5) Tamper test: modify data in block #1 and re-validate
  console.log('\n Tampering with block #1 data ...');
  demoCoin.chain[1].data[0].amount = 9999; 
  console.log(' Is chain valid after tamper?', demoCoin.isChainValid());
}

/** Quick checks & comparison @ difficulty 3 vs 4 (no 2) */
function quickSelfTest() {
  console.log('--- Quick Self Test ---');

  const d3 = new Blockchain(3);
  console.time('mine@d3');
  d3.addBlock(new Block(1, Date.now().toString(), [{ t: 1 }]));
  console.timeEnd('mine@d3');

  const d4 = new Blockchain(4);
  console.time('mine@d4');
  d4.addBlock(new Block(1, Date.now().toString(), [{ t: 1 }]));
  console.timeEnd('mine@d4');

  console.log('Valid before tamper?', d4.isChainValid());
  d4.chain[1].data[0].t = 9999;
  console.log('Valid after tamper?', d4.isChainValid());
}

quickSelfTest();
main();
