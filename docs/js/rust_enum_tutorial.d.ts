/* tslint:disable */
/* eslint-disable */
export function start(): void;
export function divide(numerator: number, denominator: number): number | undefined;
export function first_element(list: Int32Array): string;
export function run_code(code: string): string;
export enum ColorType {
  Red = 0,
  Green = 1,
  Blue = 2,
  Custom = 3,
}
export enum DirectionType {
  North = 0,
  South = 1,
  East = 2,
  West = 3,
}
export enum EitherType {
  Left = 0,
  Right = 1,
}
export enum MessageType {
  Quit = 0,
  Move = 1,
  Write = 2,
  ChangeColor = 3,
}
export enum TrafficLightKind {
  Red = 0,
  Yellow = 1,
  Green = 2,
}
export class Color {
  private constructor();
  free(): void;
  static red(): Color;
  static green(): Color;
  static blue(): Color;
  static rgb(r: number, g: number, b: number): Color;
  to_rgb(): string;
  brightness(): number;
}
export class Direction {
  private constructor();
  free(): void;
  static north(): Direction;
  static south(): Direction;
  static east(): Direction;
  static west(): Direction;
  describe(): string;
}
export class Either {
  private constructor();
  free(): void;
  static left(value: number): Either;
  static right(value: string): Either;
  format(): string;
}
export class Message {
  private constructor();
  free(): void;
  static quit(): Message;
  static move_to(x: number, y: number): Message;
  static write(text: string): Message;
  static change_color(r: number, g: number, b: number): Message;
  process(): string;
}
export class Point {
  private constructor();
  free(): void;
  static new(x: number, y: number): Point;
  format(): string;
}
export class TrafficLight {
  private constructor();
  free(): void;
  static red(): TrafficLight;
  static yellow(): TrafficLight;
  static green(): TrafficLight;
  to_string(): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly start: () => void;
  readonly __wbg_trafficlight_free: (a: number, b: number) => void;
  readonly trafficlight_red: () => number;
  readonly trafficlight_yellow: () => number;
  readonly trafficlight_green: () => number;
  readonly trafficlight_to_string: (a: number) => [number, number];
  readonly __wbg_message_free: (a: number, b: number) => void;
  readonly message_quit: () => number;
  readonly message_move_to: (a: number, b: number) => number;
  readonly message_write: (a: number, b: number) => number;
  readonly message_change_color: (a: number, b: number, c: number) => number;
  readonly message_process: (a: number) => [number, number];
  readonly divide: (a: number, b: number) => [number, number];
  readonly __wbg_either_free: (a: number, b: number) => void;
  readonly either_left: (a: number) => number;
  readonly either_right: (a: number, b: number) => number;
  readonly either_format: (a: number) => [number, number];
  readonly __wbg_point_free: (a: number, b: number) => void;
  readonly point_new: (a: number, b: number) => number;
  readonly point_format: (a: number) => [number, number];
  readonly __wbg_color_free: (a: number, b: number) => void;
  readonly color_red: () => number;
  readonly color_green: () => number;
  readonly color_blue: () => number;
  readonly color_rgb: (a: number, b: number, c: number) => number;
  readonly color_to_rgb: (a: number) => [number, number];
  readonly color_brightness: (a: number) => number;
  readonly __wbg_direction_free: (a: number, b: number) => void;
  readonly direction_north: () => number;
  readonly direction_south: () => number;
  readonly direction_east: () => number;
  readonly direction_west: () => number;
  readonly direction_describe: (a: number) => [number, number];
  readonly first_element: (a: number, b: number) => [number, number];
  readonly run_code: (a: number, b: number) => [number, number];
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
