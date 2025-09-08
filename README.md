# Mini-Blockchain-JS
Blockchain Class Assignments and activities 
Barot Pranav 
Student ID: 16373096
Assignment 1- Extended mini blockchain in JS

A simple blockchain built in JavaScript featuring Proof-of-Work mining,  
transaction arrays, chain validation, and tamper detection.
run : node blockchain.js to run the code

Blockchain.js 
1.	The following code defines the Block class which represents a single block in the blockchain. The block has several properties: index, timestamp, transaction data, previous hash, and nonce for mining. 
calculateHash() generates block’s first hash
<img width="940" height="464" alt="image" src="https://github.com/user-attachments/assets/17519d5a-2c0d-415d-8c20-0324257b97a8" />

 
2.	The following code defines computation of the SHA-256 over the block’s contents. 
The mineBlock() function performs the Proof-of-work, and repeatedly changing the nonce until the hash starts with the required number of leading zeros, logging attempts and mining time.
<img width="940" height="403" alt="image" src="https://github.com/user-attachments/assets/bd62605f-4be1-4475-8f8a-fe0e18247bfa" />

 

3.	This code manages the BlockChain class which manages the chain of blocks. It creates first block, and gives access to the latest block, and it allows adding new blocks with proper mining and validates the chain to ensure no tampering has occurred. 
 <img width="940" height="509" alt="image" src="https://github.com/user-attachments/assets/defd7efd-95bd-423f-bd07-67e4df0aae02" />

4.	The main() function demonstrates the blockchain in action. It creates a blockchain with difficulty 3, adds three blocks with multiple transactions and prints the full in chain. It also validates whether the the blockchain is not damaged after adding these blocks.
   <img width="940" height="547" alt="image" src="https://github.com/user-attachments/assets/27f4afc5-1f03-41ba-9e8d-9d6a4929bbd0" />

 



5. 	This section tests the security and performance of the blockchain. It tries to tamper the block 1 to show how validation detects corruption.  The quickSelfTest() compares mining at difficulty 3 and 4, and that says higher difficulty makes mining slower and more secure.
<img width="940" height="694" alt="image" src="https://github.com/user-attachments/assets/99f0b27f-5832-47ee-94d6-243bd9ddc3e2" />

 
Output:
1.	The program first runs the Quick Self Test.
It shows how many attempts and how long it takes to mine blocks at difficulty 3 and 4.
We also see that the blockchain is valid before tampering and becomes invalid once data in a block is changed.
<img width="940" height="471" alt="image" src="https://github.com/user-attachments/assets/e1c1464a-ec24-4c8c-9503-881d256a4a80" />

 
2.	Here the program mines three blocks, each containing multiple transactions.
For each block, it prints the number of attempts, mining time, and final hash starting with zeros.
After mining, the entire blockchain is displayed in JSON format, showing all block details (index, timestamp, data, nonce, hash).
 <img width="940" height="541" alt="image" src="https://github.com/user-attachments/assets/2a6f8df7-755e-4c4d-9d91-30915d6260b4" />


3.	This section shows the blockchain validity checks.
Initially, the chain is valid after mining all blocks.
When Block #1’s transaction data is manually changed, the program correctly detects the tampering and prints Is chain valid after tamper? false.

 <img width="940" height="598" alt="image" src="https://github.com/user-attachments/assets/77cc512e-9208-465f-9fbb-3b0305aff320" />

<img width="940" height="187" alt="image" src="https://github.com/user-attachments/assets/7d2fb78b-a107-47bd-af85-0766fec16cb4" />

 
Above code does the tampering test: which is manually changing the transaction to test. 


Reflection: 

This assignment helped me to understand the core blockchain concept such as hashing, immutability, and proof-of-work which help to ensure trust in a distributed system. 
During this assignment, I noticed that hash function is sensitive, even a single change in the data or timestamp results in completely different SHA-256 hash. I saw that block tempering easily detectable.
In Proof-of-work, at a difficulty of 3, the mining process was relatively quick but when I increased it to 4, the number of attempts and time required grew significantly. I think this might be the best way to discourage attackers from easily crack it. And mining difficulty directly influences security and performance trade-offs.
I feel the system was more look like realistic cuz of arrays of transactions instead of single objects because as far as I know real blockchains bundle multiple transaction into each block. I also learned that designing the data structure properly matters: switching to arrays required me to adjust the tampering test and validation logic.
Finally, when I was trying to temper intentionally, when I altered just one transaction amount the validation function correctly flagged the chain as invalid, which simply helped me understand why validation across the entire chain is essential for integrity.
 Overall, this project helped me to connect theoretical knowledge of blockchain to this hans-on assignment implementation. I could see practical challenges of mining, the sensitivity of hashing, and the immutability of security. However it was simple version, I took some time to understand how it works, and the reasons behind it, and to understand it I took a help of Chat-Gpt. But yeah at the end, it gave me a strong understanding of how real world system like bitcoin and Ethereum operate on much larger scale. This assignment helped me to understand why blockchain technology is trusted for critical applications like finance, supply chain, and digital identity. 
 



 
