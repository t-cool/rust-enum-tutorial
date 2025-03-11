# Rustのenumと代数的データ型

このプロジェクトは、Rustの列挙型（enum）と代数的データ型（Algebraic Data Types）についてのインタラクティブなチュートリアルです。WebAssemblyを使用して、ブラウザ上でRustコードを実行し、挙動を確認できます。

## 特徴

- Rustの代数的データ型の概念説明
- 集合論との関連の解説
- インタラクティブなコード実行環境
- WebAssemblyによるブラウザ上での実行

## 必要なもの

- Rust（1.50.0以上推奨）
- wasm-pack（WebAssemblyコンパイル用）
- Webブラウザ（Chrome, Firefox, Safari, Edgeなど）

## セットアップと実行方法

1. 必要なツールをインストール

```bash
# wasm-packをインストール
cargo install wasm-pack
```

2. プロジェクトをビルドして実行

```bash
# ビルドスクリプトを実行
./build.sh
```

ビルドスクリプトは以下の処理を行います：
- Rustコードをwasm-packを使ってWebAssemblyにコンパイル
- 必要なJavaScriptグルーコードを生成
- Pythonの簡易HTTPサーバーを起動してアプリケーションを提供

3. ブラウザでアクセス

ビルドスクリプトが正常に実行されると、ブラウザで以下のURLにアクセスしてチュートリアルを閲覧できます：

```
http://localhost:8000/
```

## 手動でビルドする場合

```bash
# WebAssemblyにコンパイル
wasm-pack build --target web --out-dir www/js

# 静的ファイルサーバーを起動（Pythonの場合）
cd www && python3 -m http.server
```

## プロジェクト構造

```
rust-enum-tutorial/
├── src/                  # Rustソースコード
│   └── lib.rs            # WebAssembly用のRust実装
├── www/                  # Webコンテンツ
│   ├── css/              # スタイルシート
│   │   └── style.css     # メインCSS
│   ├── js/               # JavaScriptファイル
│   │   └── index.js      # メインJS（コンパイル後にWASMファイルも配置されます）
│   └── index.html        # メインHTMLファイル
├── Cargo.toml            # Rustの依存関係定義
└── build.sh              # ビルドスクリプト
```

## ライセンス

MIT

## 謝辞

このプロジェクトは、Rustの素晴らしい型システムと関数型プログラミングの概念を理解するために作成されました。 
