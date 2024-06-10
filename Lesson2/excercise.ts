import dotenv from "dotenv";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
dotenv.config();

// const pubKey = getKeypairFromEnvironment("pubKey");
const publicKey = process.env.pubKey;
if (!publicKey) {
    throw new Error("Please Provide a Account Address");
}

try {
    const pubKey = new PublicKey(publicKey);

    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        try {
            const balance = await connection.getBalance(pubKey) / LAMPORTS_PER_SOL;
            console.log(`Account ${pubKey} has Balance ${balance} sol`);
            console.log(`✅ Finished!`)
        } catch (error) {
            throw new Error("Error while getting Balance");
        }
    } catch (error) {
        throw new Error("Error while Connecting");
    }
} catch (error) {
    throw new Error("Please Provide a Valid Account Address");
}