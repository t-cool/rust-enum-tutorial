#!/bin/bash
set -e

echo "=== Rustのenumと代数的データ型チュートリアル ビルドスクリプト ==="

# wasm-packがインストールされているか確認
if ! command -v wasm-pack &> /dev/null; then
    echo "wasm-packがインストールされていません。インストールします..."
    cargo install wasm-pack
fi

# index.jsファイルのバックアップを作成
if [ -f docs/js/index.js ]; then
    echo "index.jsファイルをバックアップします..."
    cp docs/js/index.js docs/js/index.js.bak
fi

# 以前のビルド結果をクリーンアップ
echo "既存のビルド結果をクリーンアップしています..."
rm -rf docs/js/*.wasm docs/js/*.ts docs/js/package.json docs/js/rust_enum_tutorial.js

# WebAssemblyにコンパイル
echo "Rustコードをコンパイル中..."
wasm-pack build --target web --out-dir docs/js

# ビルドが正常に完了したか確認
if [ $? -ne 0 ]; then
    echo "ビルドに失敗しました。エラーを修正してください。"
    exit 1
fi

# index.jsファイルのバックアップを復元
if [ -f docs/js/index.js.bak ]; then
    echo "index.jsファイルを復元します..."
    mv docs/js/index.js.bak docs/js/index.js
fi

# 生成されたファイルを確認
echo "生成されたファイル:"
ls -la docs/js/

# index.jsファイルがなければ作成
if [ ! -f docs/js/index.js ]; then
    echo "index.jsファイルが見つからないため、新規作成します..."
    cat > docs/js/index.js << 'EOF'
// Rust-WASMモジュールを読み込む
async function initWasm() {
  const loadingElement = document.getElementById("wasm-loading");
  
  try {
    console.log("WebAssemblyモジュールの読み込みを開始します");
    console.log("ブラウザのWASM対応状況:", typeof WebAssembly);
    
    // 正しいファイル名を使用
    console.log("モジュールを読み込み中: rust_enum_tutorial.js");
    
    try {
      // 修正: 正しいファイル名でインポート
      const rustModule = await import("./rust_enum_tutorial.js");
      console.log("モジュールのインポートが完了しました", rustModule);
      
      // モジュールの初期化
      console.log("モジュールの初期化を開始します");
      await rustModule.default();
      console.log("モジュールの初期化が完了しました");
      
      // グローバル変数に保存
      window.rustWasm = rustModule;
      console.log("Rust WASM module loaded successfully");
      
      // 読み込み完了、ローディング表示を非表示
      loadingElement.classList.add("hidden");
      
      // 実行ボタンにイベントリスナーを設定
      setupEventListeners();
    } catch (e) {
      console.error("モジュールの読み込みに失敗しました:", e);
      throw e; // エラーを上位ハンドラに渡す
    }
  } catch (e) {
    console.error("Failed to load Rust WASM module:", e);
    
    // エラーの詳細をコンソールに出力
    console.error("詳細なエラー:", e.stack || e);
    
    // 読み込み失敗、ローディング表示をエラーメッセージに変更
    if (loadingElement) {
      loadingElement.innerHTML = `
        <div class="error-icon">❌</div>
        <h3>WebAssemblyモジュールの読み込みに失敗しました</h3>
        <p>エラー: ${e.message}</p>
        <p>詳細はブラウザのコンソールを確認してください。</p>
        <p>以下を確認してください:</p>
        <ul>
          <li>ブラウザが最新であることを確認（Chrome, Firefox, Safari最新版推奨）</li>
          <li>CORSエラーがないか確認</li>
          <li>JavaScriptコンソールに詳細なエラーメッセージがないか確認</li>
        </ul>
        <div class="try-fix">
          <p>可能性のある修正方法:</p>
          <ul>
            <li>ブラウザのキャッシュをクリアする</li>
            <li>別のブラウザを試す</li>
            <li>プロジェクトを再ビルドする（./build.sh）</li>
          </ul>
        </div>
        <button onclick="location.reload()">再読み込み</button>
      `;
      loadingElement.classList.add("error");
    }
    
    document.querySelectorAll(".repl-output").forEach(output => {
      output.textContent = "WebAssemblyモジュールの読み込みに失敗しました。エラー: " + e.message;
      output.classList.add("error");
    });
  }
}

// 実行ボタンにイベントリスナーを設定
function setupEventListeners() {
  document.querySelectorAll(".run-button").forEach(button => {
    button.addEventListener("click", function() {
      const code = this.getAttribute("data-code");
      const outputElement = this.closest(".repl-container").querySelector(".repl-output");
      
      try {
        // Rustコードを実行
        const result = window.rustWasm.run_code(code);
        outputElement.textContent = `出力: ${result}`;
        outputElement.classList.add("success");
        outputElement.classList.remove("error");
      } catch (e) {
        outputElement.textContent = `エラー: ${e.message}`;
        outputElement.classList.add("error");
        outputElement.classList.remove("success");
      }
    });
  });
}

// DOMの準備ができたらWASMモジュールを初期化
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM読み込み完了、WASMモジュール初期化を開始");
  initWasm();
});
EOF
fi

# JavaScript例のビルド成功を確認
if [ ! -f docs/js/rust_enum_tutorial.js ]; then
    echo "警告: rust_enum_tutorial.jsが見つかりません。ファイル名を確認します..."
    
    # 実際に生成されたJSファイルを探す
    JS_FILES=$(find docs/js -name "*.js" | grep -v "package.json" | grep -v "snippets" | grep -v "index.js")
    
    echo "見つかったJSファイル: $JS_FILES"
    
    if [ -n "$JS_FILES" ]; then
        echo "見つかったJSファイルを使用します。"
        for file in $JS_FILES; do
            BASE_NAME=$(basename "$file")
            if [ "$BASE_NAME" != "rust_enum_tutorial.js" ]; then
                echo "$BASE_NAME を rust_enum_tutorial.js にコピーします..."
                cp "$file" docs/js/rust_enum_tutorial.js
            fi
        done
    fi
fi

# 成功メッセージ
echo ""
echo "========== ビルド完了！ =========="
echo "開始するWebサーバーのURLから接続してください。"
echo ""

# 静的サーバーを起動（インストールされていれば）
if command -v python3 &> /dev/null; then
    cd docs && python3 -m http.server
elif command -v python &> /dev/null; then
    cd docs && python -m SimpleHTTPServer
else
    echo "Pythonがインストールされていないため、サーバーを起動できません。"
    echo "docs/ディレクトリをウェブサーバーで配信してください。"
fi 