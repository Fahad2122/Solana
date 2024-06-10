import dotenv from "dotenv";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
dotenv.config();

const amount = 2;
const keyPair = getKeypairFromEnvironment("SECRET_KEY");

const publicKey = process.env.pubKey;
const publicKey2 = process.env.pubKey2;
if (!publicKey || !publicKey2) {
    throw new Error("Please Provide a Account Address");
}

try {
    const pubKey = new PublicKey(publicKey);
    const pubKey2 = new PublicKey(publicKey2);
    try {
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

        try {
            const balance = await connection.getBalance(pubKey) / LAMPORTS_PER_SOL;
            const balance2 = await connection.getBalance(pubKey2) / LAMPORTS_PER_SOL;
            console.log(`Account ${pubKey} has Balance ${balance} sol`);
            console.log(`Account ${pubKey2} has Balance ${balance2} sol`);

            if (balance >= amount) {
                const transaction = new Transaction();
                const transfer = SystemProgram.transfer({
                    fromPubkey: pubKey,
                    toPubkey: pubKey2,
                    lamports: amount * LAMPORTS_PER_SOL
                })
                transaction.add(transfer);
                try {
                    const signature = await sendAndConfirmTransaction(
                        connection,
                        transaction,
                        [keyPair]
                    )
                    console.log(`✅ Transfer SuccessFull`);
                    console.log(`${amount} sol transfered to Account: ${pubKey2}`);
                    console.log(`Transaction Signature: ${signature}`);
                    console.log("--------------------------------------------------------------");
                    const balance = await connection.getBalance(pubKey) / LAMPORTS_PER_SOL;
                    const balance2 = await connection.getBalance(pubKey2) / LAMPORTS_PER_SOL;
                    console.log(`Sender Updated Balance: ${balance}`);
                    console.log(`Reciever Updated Balance: ${balance2}`);
                } catch (error) {
                    throw new Error("Error sending transaction");
                }
            }
            else {
                console.log("Insufficient SOL Balance");
            }
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