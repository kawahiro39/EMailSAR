# Solarnova Firestore Quickstart

## プロジェクト概要
Solarnova Firestore Quickstart は、Firebase Admin SDK を用いた Firestore への最小接続サンプルです。サービスアカウント鍵を利用して `projectId: solarnova` の Firestore に接続し、`test` コレクションへ 1 件のドキュメントを書き込み、続けて同じドキュメントを読み出すことで接続が成功したかを確認できます。

## ファイル構成
```
.
├─ index.mjs                # Firestore への書き込み/読み取りを行うエントリーポイント
├─ package.json             # npm スクリプトと依存関係
├─ package-lock.json        # 依存関係のロックファイル
├─ .gitignore               # Git へコミットしないファイル設定
└─ serviceAccountKey.json   # Firebase サービスアカウント鍵（Git 管理外）
```

## 前提条件
- Node.js 20 以上
- Firebase プロジェクト **solarnova** のサービスアカウント鍵 (`serviceAccountKey.json`) を本プロジェクト直下に配置
- Firestore のデフォルトリージョンが `asia-northeast1` であること

## セットアップと実行手順
1. 依存パッケージをインストールします。
   ```bash
   npm install
   ```

2. Firestore への接続テストを実行します。
   ```bash
   npm start
   ```
   - `npm start` は `index.mjs` を実行し、`test` コレクションにランダム ID のドキュメントを書き込みます。
   - 書き込まれた直後に同じドキュメントを取得し、コンソールへ内容を出力します。

## コンソール出力例
成功すると以下のようなログが表示されます。
```
✅ Firestore connected. DocID: <生成されたドキュメント ID>
📄 Data: { hello: 'world', region: 'asia-northeast1', created_at: Timestamp {...} }
```

失敗した場合はエラーメッセージが `❌ Firestore connection failed:` で始まり、プロセスが終了します。サービスアカウント鍵の配置、ネットワーク設定、Firestore の権限設定を再確認してください。

## Firestore 上の確認
- `npm start` 実行後、Firestore コンソールを開くと `test` コレクションが作成され、1 件のドキュメントが登録されます。
- ドキュメントには `hello`, `region`, `created_at` の 3 つのフィールドが含まれます。
- `created_at` はサーバータイムスタンプ (`admin.firestore.FieldValue.serverTimestamp()`) が設定されます。

## 環境構成・認証情報
- 認証はサービスアカウント鍵の JSON ファイルで行います。Web クライアント用の API キーは使用しません。
- `serviceAccountKey.json` は Git 管理対象から除外されており、外部へ公開しないでください。
- 複数環境で利用する場合は、環境ごとに適切なサービスアカウントを作成し、鍵ファイルを安全に配布してください。

## トラブルシューティング
| 症状 | 原因・対処 |
| ---- | ---------- |
| `Error: Cannot find module './serviceAccountKey.json'` | 鍵ファイルがプロジェクト直下に存在するか確認してください。|
| `PERMISSION_DENIED` | サービスアカウントに Cloud Firestore へのアクセス権限が付与されているか確認してください。|
| `Deadline exceeded` などのネットワークエラー | ネットワーク接続状況と Firestore のリージョン設定を確認してください。|

## よくある質問 (FAQ)
### Q. Firestore 以外のリージョンで利用するには？
A. `index.mjs` 内の `region` フィールドはログ用の値に過ぎません。Firestore 自体のリージョンは Firebase プロジェクト作成時に設定されます。異なるリージョンを使用してもコード変更は不要ですが、説明用途の値を変更したい場合は `ref.set` の `region` フィールドを書き換えてください。

### Q. `.env` ファイルなど追加の設定は必要ですか？
A. 本サンプルでは不要です。必要に応じて `.env` を作成し、`.gitignore` に既に登録済みなので Git にはコミットされません。

### Q. Firestore 以外の API エンドポイントはありますか？
A. 本プロジェクトは Firestore への接続確認のみを目的としているため、HTTP エンドポイントは提供していません。Firebase Admin SDK を直接使用し、`index.mjs` から Firestore を操作します。

## ライセンス
このサンプルは学習目的で提供されており、特定のライセンスは付与していません。必要に応じて組織のポリシーに従い取り扱ってください。
