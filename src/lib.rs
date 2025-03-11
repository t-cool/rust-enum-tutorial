use wasm_bindgen::prelude::*;
use js_sys::Function;

// コンソールにメッセージを表示する補助関数
fn console_log(s: &str) {
    web_sys::console::log_1(&JsValue::from_str(s));
}

// パニック時にエラーメッセージをコンソールに表示
#[wasm_bindgen(start)]
pub fn start() {
    console_error_panic_hook::set_once();
}

// TrafficLightの例
// enumをJavaScriptに公開する場合は、#[wasm_bindgen]を使って各値を定数として公開する
#[wasm_bindgen]
pub enum TrafficLightKind {
    Red = 0,
    Yellow = 1,
    Green = 2,
}

// TrafficLightのラッパー構造体
#[wasm_bindgen]
pub struct TrafficLight {
    kind: TrafficLightKind,
}

#[wasm_bindgen]
impl TrafficLight {
    // コンストラクタメソッド
    #[wasm_bindgen]
    pub fn red() -> TrafficLight {
        TrafficLight { kind: TrafficLightKind::Red }
    }

    #[wasm_bindgen]
    pub fn yellow() -> TrafficLight {
        TrafficLight { kind: TrafficLightKind::Yellow }
    }

    #[wasm_bindgen]
    pub fn green() -> TrafficLight {
        TrafficLight { kind: TrafficLightKind::Green }
    }

    #[wasm_bindgen]
    pub fn to_string(&self) -> String {
        match self.kind {
            TrafficLightKind::Red => "赤信号".to_string(),
            TrafficLightKind::Yellow => "黄信号".to_string(),
            TrafficLightKind::Green => "青信号".to_string(),
        }
    }
}

// Message enumの例
#[wasm_bindgen]
pub enum MessageType {
    Quit = 0,
    Move = 1,
    Write = 2,
    ChangeColor = 3,
}

#[wasm_bindgen]
pub struct Message {
    msg_type: MessageType,
    x: Option<i32>,
    y: Option<i32>,
    text: Option<String>,
    r: Option<i32>,
    g: Option<i32>,
    b: Option<i32>,
}

#[wasm_bindgen]
impl Message {
    #[wasm_bindgen]
    pub fn quit() -> Message {
        Message {
            msg_type: MessageType::Quit,
            x: None,
            y: None,
            text: None,
            r: None,
            g: None,
            b: None,
        }
    }

    #[wasm_bindgen]
    pub fn move_to(x: i32, y: i32) -> Message {
        Message {
            msg_type: MessageType::Move,
            x: Some(x),
            y: Some(y),
            text: None,
            r: None,
            g: None,
            b: None,
        }
    }

    #[wasm_bindgen]
    pub fn write(text: &str) -> Message {
        Message {
            msg_type: MessageType::Write,
            x: None,
            y: None,
            text: Some(text.to_string()),
            r: None,
            g: None,
            b: None,
        }
    }

    #[wasm_bindgen]
    pub fn change_color(r: i32, g: i32, b: i32) -> Message {
        Message {
            msg_type: MessageType::ChangeColor,
            x: None,
            y: None,
            text: None,
            r: Some(r),
            g: Some(g),
            b: Some(b),
        }
    }

    #[wasm_bindgen]
    pub fn process(&self) -> String {
        match self.msg_type {
            MessageType::Quit => "終了します".to_string(),
            MessageType::Move => {
                if let (Some(x), Some(y)) = (self.x, self.y) {
                    format!("位置 ({}, {}) に移動します", x, y)
                } else {
                    "無効な移動メッセージ".to_string()
                }
            }
            MessageType::Write => {
                if let Some(text) = &self.text {
                    format!("メッセージ: {}", text)
                } else {
                    "空のメッセージ".to_string()
                }
            }
            MessageType::ChangeColor => {
                if let (Some(r), Some(g), Some(b)) = (self.r, self.g, self.b) {
                    format!("色を ({}, {}, {}) に変更します", r, g, b)
                } else {
                    "無効な色変更メッセージ".to_string()
                }
            }
        }
    }
}

// Option型の例
#[wasm_bindgen]
pub fn divide(numerator: f64, denominator: f64) -> Option<f64> {
    if denominator == 0.0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

// Either型の例（代数的データ型の基本）
#[wasm_bindgen]
pub enum EitherType {
    Left = 0,
    Right = 1,
}

#[wasm_bindgen]
pub struct Either {
    either_type: EitherType,
    left_value: Option<i32>,
    right_value: Option<String>,
}

#[wasm_bindgen]
impl Either {
    #[wasm_bindgen]
    pub fn left(value: i32) -> Either {
        Either {
            either_type: EitherType::Left,
            left_value: Some(value),
            right_value: None,
        }
    }

    #[wasm_bindgen]
    pub fn right(value: &str) -> Either {
        Either {
            either_type: EitherType::Right,
            left_value: None,
            right_value: Some(value.to_string()),
        }
    }

    #[wasm_bindgen]
    pub fn format(&self) -> String {
        match self.either_type {
            EitherType::Left => {
                if let Some(value) = self.left_value {
                    format!("Left({})", value)
                } else {
                    "Invalid Left value".to_string()
                }
            }
            EitherType::Right => {
                if let Some(value) = &self.right_value {
                    format!("Right(\"{}\")", value)
                } else {
                    "Invalid Right value".to_string()
                }
            }
        }
    }
}

// Point構造体の例
#[wasm_bindgen]
pub struct Point {
    x: i32,
    y: i32,
}

#[wasm_bindgen]
impl Point {
    #[wasm_bindgen]
    pub fn new(x: i32, y: i32) -> Point {
        Point { x, y }
    }

    #[wasm_bindgen]
    pub fn format(&self) -> String {
        format!("({}, {})", self.x, self.y)
    }
}

// Color enumの例（メソッド実装）
#[wasm_bindgen]
pub enum ColorType {
    Red = 0,
    Green = 1,
    Blue = 2,
    Custom = 3,
}

#[wasm_bindgen]
pub struct Color {
    color_type: ColorType,
    r: u8,
    g: u8,
    b: u8,
}

#[wasm_bindgen]
impl Color {
    #[wasm_bindgen]
    pub fn red() -> Color {
        Color {
            color_type: ColorType::Red,
            r: 255,
            g: 0,
            b: 0,
        }
    }

    #[wasm_bindgen]
    pub fn green() -> Color {
        Color {
            color_type: ColorType::Green,
            r: 0,
            g: 255,
            b: 0,
        }
    }

    #[wasm_bindgen]
    pub fn blue() -> Color {
        Color {
            color_type: ColorType::Blue,
            r: 0,
            g: 0,
            b: 255,
        }
    }

    #[wasm_bindgen]
    pub fn rgb(r: u8, g: u8, b: u8) -> Color {
        Color {
            color_type: ColorType::Custom,
            r,
            g,
            b,
        }
    }

    #[wasm_bindgen]
    pub fn to_rgb(&self) -> String {
        format!("({}, {}, {})", self.r, self.g, self.b)
    }

    #[wasm_bindgen]
    pub fn brightness(&self) -> u8 {
        // 簡易的な輝度計算
        ((self.r as u16 + self.g as u16 + self.b as u16) / 3) as u8
    }
}

// Direction enumの例（matchの網羅性）
#[wasm_bindgen]
pub enum DirectionType {
    North = 0,
    South = 1,
    East = 2,
    West = 3,
}

#[wasm_bindgen]
pub struct Direction {
    dir_type: DirectionType,
}

#[wasm_bindgen]
impl Direction {
    #[wasm_bindgen]
    pub fn north() -> Direction {
        Direction { dir_type: DirectionType::North }
    }

    #[wasm_bindgen]
    pub fn south() -> Direction {
        Direction { dir_type: DirectionType::South }
    }

    #[wasm_bindgen]
    pub fn east() -> Direction {
        Direction { dir_type: DirectionType::East }
    }

    #[wasm_bindgen]
    pub fn west() -> Direction {
        Direction { dir_type: DirectionType::West }
    }

    #[wasm_bindgen]
    pub fn describe(&self) -> String {
        match self.dir_type {
            DirectionType::North => "北に進む".to_string(),
            DirectionType::South => "南に進む".to_string(),
            DirectionType::East => "東に進む".to_string(),
            DirectionType::West => "西に進む".to_string(),
        }
    }
}

// if letの例
#[wasm_bindgen]
pub fn first_element(list: Vec<i32>) -> String {
    if let Some(value) = list.first() {
        format!("最初の要素: {}", value)
    } else {
        "リストは空です".to_string()
    }
}

// Rustコードを実行する関数
#[wasm_bindgen]
pub fn run_code(code: &str) -> String {
    match code.trim() {
        // TrafficLightの例
        "let light = TrafficLight::Red; light.to_string()" => {
            let light = TrafficLight::red();
            light.to_string()
        }
        "let light = TrafficLight::Green; light.to_string()" => {
            let light = TrafficLight::green();
            light.to_string()
        }
        "let light = TrafficLight::Red; match light { TrafficLight::Red => \"赤信号：停止\", TrafficLight::Yellow => \"黄信号：注意\", TrafficLight::Green => \"青信号：進行\", }" => {
            "赤信号：停止".to_string()
        }
        // Messageの例
        "let msg = Message::quit(); msg.process()" => {
            let msg = Message::quit();
            msg.process()
        }
        "let msg = Message::move_to(10, 20); msg.process()" => {
            let msg = Message::move_to(10, 20);
            msg.process()
        }
        "let msg = Message::write(\"こんにちは\"); msg.process()" => {
            let msg = Message::write("こんにちは");
            msg.process()
        }
        "let msg = Message::write(\"こんにちは世界\"); process_message(msg)" => {
            "メッセージ: こんにちは世界".to_string()
        }
        "let msg = Message::change_color(255, 0, 0); msg.process()" => {
            let msg = Message::change_color(255, 0, 0);
            msg.process()
        }
        // Optionの例
        "divide(10.0, 2.0).map_or(\"ゼロ除算エラー\".to_string(), |result| format!(\"結果: {}\", result))" => {
            divide(10.0, 2.0).map_or("ゼロ除算エラー".to_string(), |result| format!("結果: {}", result))
        }
        "divide(10.0, 0.0).map_or(\"ゼロ除算エラー\".to_string(), |result| format!(\"結果: {}\", result))" => {
            divide(10.0, 0.0).map_or("ゼロ除算エラー".to_string(), |result| format!("結果: {}", result))
        }
        // Either型の例
        "let x: Either<i32, &str> = Either::Left(42); format!(\"{:?}\", x)" => {
            let either = Either::left(42);
            either.format()
        }
        // Point構造体の例
        "let p = Point { x: 10, y: 20 }; format!(\"({}, {})\", p.x, p.y)" => {
            let point = Point::new(10, 20);
            point.format()
        }
        // Colorの例
        "let color = Color::RGB(100, 150, 200); format!(\"RGB値: {:?}, 輝度: {}\", color.to_rgb(), color.brightness())" => {
            let color = Color::rgb(100, 150, 200);
            format!("RGB値: {}, 輝度: {}", color.to_rgb(), color.brightness())
        }
        "let color = Color::Blue; format!(\"RGB値: {:?}, 輝度: {}\", color.to_rgb(), color.brightness())" => {
            let color = Color::blue();
            format!("RGB値: {}, 輝度: {}", color.to_rgb(), color.brightness())
        }
        // Directionの例
        "let directions = [Direction::North, Direction::East, Direction::South, Direction::West]; let descriptions: Vec<_> = directions.iter().map(|&dir| describe_direction_correctly(dir)).collect(); format!(\"方向の説明: {:?}\", descriptions)" => {
            let mut descriptions = Vec::new();
            descriptions.push(Direction::north().describe());
            descriptions.push(Direction::east().describe());
            descriptions.push(Direction::south().describe());
            descriptions.push(Direction::west().describe());
            format!("方向の説明: {:?}", descriptions)
        }
        // if letの例
        "let numbers = vec![1, 2, 3, 4, 5]; let first = numbers.first(); if let Some(value) = first { format!(\"最初の要素: {}\", value) } else { \"リストは空です\".to_string() }" => {
            first_element(vec![1, 2, 3, 4, 5])
        }
        "let numbers: Vec<i32> = vec![]; let first = numbers.first(); if let Some(value) = first { format!(\"最初の要素: {}\", value) } else { \"リストは空です\".to_string() }" => {
            first_element(vec![])
        }
        _ => "このコード例は WebAssembly ではサポートされていません。Rust のネイティブ環境でコードを試してください。".to_string(),
    }
}
