// Rust-WASMモジュールを読み込む
async function initWasm() {
  const loadingElement = document.getElementById("wasm-loading");
  
  try {
    console.log("WebAssemblyモジュールの読み込みを開始します");
    console.log("ブラウザのWASM対応状況:", typeof WebAssembly);
    
    // ベースパスを取得
    const basePath = getBasePath();
    console.log("ベースパス:", basePath);
    
    // モジュールのパスを構築
    const modulePath = `${basePath}js/rust_enum_tutorial.js`;
    console.log("モジュールパス:", modulePath);
    
    try {
      // 動的に構築したパスでモジュールをインポート
      const rustModule = await import(modulePath);
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
      setupEventListeners(rustModule);
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
          <li>ブラウザがWebAssemblyに対応していること</li>
          <li>必要なファイルが正しく配置されていること</li>
          <li>ネットワーク接続が正常であること</li>
        </ul>
      `;
    }
  }
}

// 現在のURLからベースパスを取得する関数
function getBasePath() {
  const currentPath = window.location.pathname;
  
  // GitHub Pages用のパス（例: /rust-enum-tutorial/）
  if (currentPath.includes('/rust-enum-tutorial/')) {
    return '/rust-enum-tutorial/';
  }
  
  // ローカル開発環境用（ルートパス）
  return '/';
}

// 実行ボタンにイベントリスナーを設定
function setupEventListeners(rustModule) {
  // 実行可能なコードのリスト
  const supportedCodes = [
    // TrafficLightの例
    "let light = TrafficLight::Red; light.to_string()",
    "let light = TrafficLight::Green; light.to_string()",
    "let light = TrafficLight::Red; match light { TrafficLight::Red => \"赤信号：停止\", TrafficLight::Yellow => \"黄信号：注意\", TrafficLight::Green => \"青信号：進行\", }",
    
    // Messageの例
    "let msg = Message::quit(); msg.process()",
    "let msg = Message::move_to(10, 20); msg.process()",
    "let msg = Message::write(\"こんにちは\"); msg.process()",
    "let msg = Message::write(\"こんにちは世界\"); process_message(msg)",
    "let msg = Message::change_color(255, 0, 0); msg.process()",
    
    // Option型の例
    "divide(10.0, 2.0).map_or(\"ゼロ除算エラー\".to_string(), |result| format!(\"結果: {}\", result))",
    "divide(10.0, 0.0).map_or(\"ゼロ除算エラー\".to_string(), |result| format!(\"結果: {}\", result))",
    
    // 新しく追加した例
    // Either型
    "let x: Either<i32, &str> = Either::Left(42); format!(\"{:?}\", x)",
    
    // Point構造体
    "let p = Point { x: 10, y: 20 }; format!(\"({}, {})\", p.x, p.y)",
    
    // Color
    "let color = Color::RGB(100, 150, 200); format!(\"RGB値: {:?}, 輝度: {}\", color.to_rgb(), color.brightness())",
    "let color = Color::Blue; format!(\"RGB値: {:?}, 輝度: {}\", color.to_rgb(), color.brightness())",
    
    // Direction
    "let directions = [Direction::North, Direction::East, Direction::South, Direction::West]; let descriptions: Vec<_> = directions.iter().map(|&dir| describe_direction_correctly(dir)).collect(); format!(\"方向の説明: {:?}\", descriptions)",
    
    // if let
    "let numbers = vec![1, 2, 3, 4, 5]; let first = numbers.first(); if let Some(value) = first { format!(\"最初の要素: {}\", value) } else { \"リストは空です\".to_string() }",
    "let numbers: Vec<i32> = vec![]; let first = numbers.first(); if let Some(value) = first { format!(\"最初の要素: {}\", value) } else { \"リストは空です\".to_string() }"
  ];

  // 実行ボタンにイベントリスナーを追加
  const runButtons = document.querySelectorAll('.run-button');
  runButtons.forEach(button => {
    const code = button.getAttribute('data-code');
    
    // サポートされているかどうかを判断してクラスを追加
    if (supportedCodes.includes(code)) {
      button.classList.add('supported');
      button.setAttribute('title', '実行可能なコード例です');
    } else {
      button.classList.add('demo-only');
      button.setAttribute('title', 'デモンストレーション用のコード例です（実行できません）');
    }
    
    button.addEventListener('click', () => {
      // ボタンに関連付けられたコードを取得
      const outputArea = button.closest('.repl-container').querySelector('.repl-output');
      
      try {
        // Rustコードを実行
        console.log('実行するコード:', code);
        const result = rustModule.run_code(code);
        console.log('実行結果:', result);
        
        // 結果を表示
        outputArea.textContent = `出力: ${result}`;
        outputArea.classList.remove('error');
      } catch (e) {
        console.error('実行エラー:', e);
        outputArea.textContent = `エラー: ${e.toString()}`;
        outputArea.classList.add('error');
      }
    });
  });
}

// DOMの準備ができたらWASMモジュールを初期化
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM読み込み完了、WASMモジュール初期化を開始");
  initWasm();
});
