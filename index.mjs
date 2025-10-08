// Firestore 接続テスト（最小）
import admin from "firebase-admin";
import { readFileSync } from "node:fs";

const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json", "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "solarnova"
});

const db = admin.firestore();

async function main() {
  const ref = db.collection("test").doc();
  await ref.set({
    hello: "world",
    region: "asia-northeast1",
    created_at: admin.firestore.FieldValue.serverTimestamp()
  });

  const snap = await ref.get();
  console.log("✅ Firestore connected. DocID:", ref.id);
  console.log("📄 Data:", snap.data());
}

main().catch((e) => {
  console.error("❌ Firestore connection failed:", e);
  process.exit(1);
});
