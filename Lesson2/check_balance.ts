import dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
dotenv.config();

//connecting to Solana chain
const connection  = new Connection(clusterApiUrl('devnet'));
console.log('✅ Connected to devnet');

//getting my address
const keyPair = getKeypairFromEnvironment("SECRET_KEY");
const address = keyPair.publicKey;
console.log("My Account Address: ", address.toBase58());

//getting balance of address
const balance = await connection.getBalance(address) / LAMPORTS_PER_SOL;
console.log("Account balance: ", balance, "sol");
console.log(`✅ Finished!`)