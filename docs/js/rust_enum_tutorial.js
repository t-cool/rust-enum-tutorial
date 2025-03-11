let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

export function start() {
    wasm.start();
}

/**
 * @param {number} numerator
 * @param {number} denominator
 * @returns {number | undefined}
 */
export function divide(numerator, denominator) {
    const ret = wasm.divide(numerator, denominator);
    return ret[0] === 0 ? undefined : ret[1];
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
 * @param {Int32Array} list
 * @returns {string}
 */
export function first_element(list) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passArray32ToWasm0(list, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.first_element(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {string} code
 * @returns {string}
 */
export function run_code(code) {
    let deferred2_0;
    let deferred2_1;
    try {
        const ptr0 = passStringToWasm0(code, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.run_code(ptr0, len0);
        deferred2_0 = ret[0];
        deferred2_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @enum {0 | 1 | 2 | 3}
 */
export const ColorType = Object.freeze({
    Red: 0, "0": "Red",
    Green: 1, "1": "Green",
    Blue: 2, "2": "Blue",
    Custom: 3, "3": "Custom",
});
/**
 * @enum {0 | 1 | 2 | 3}
 */
export const DirectionType = Object.freeze({
    North: 0, "0": "North",
    South: 1, "1": "South",
    East: 2, "2": "East",
    West: 3, "3": "West",
});
/**
 * @enum {0 | 1}
 */
export const EitherType = Object.freeze({
    Left: 0, "0": "Left",
    Right: 1, "1": "Right",
});
/**
 * @enum {0 | 1 | 2 | 3}
 */
export const MessageType = Object.freeze({
    Quit: 0, "0": "Quit",
    Move: 1, "1": "Move",
    Write: 2, "2": "Write",
    ChangeColor: 3, "3": "ChangeColor",
});
/**
 * @enum {0 | 1 | 2}
 */
export const TrafficLightKind = Object.freeze({
    Red: 0, "0": "Red",
    Yellow: 1, "1": "Yellow",
    Green: 2, "2": "Green",
});

const ColorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_color_free(ptr >>> 0, 1));

export class Color {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Color.prototype);
        obj.__wbg_ptr = ptr;
        ColorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ColorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_color_free(ptr, 0);
    }
    /**
     * @returns {Color}
     */
    static red() {
        const ret = wasm.color_red();
        return Color.__wrap(ret);
    }
    /**
     * @returns {Color}
     */
    static green() {
        const ret = wasm.color_green();
        return Color.__wrap(ret);
    }
    /**
     * @returns {Color}
     */
    static blue() {
        const ret = wasm.color_blue();
        return Color.__wrap(ret);
    }
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {Color}
     */
    static rgb(r, g, b) {
        const ret = wasm.color_rgb(r, g, b);
        return Color.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    to_rgb() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.color_to_rgb(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {number}
     */
    brightness() {
        const ret = wasm.color_brightness(this.__wbg_ptr);
        return ret;
    }
}

const DirectionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_direction_free(ptr >>> 0, 1));

export class Direction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Direction.prototype);
        obj.__wbg_ptr = ptr;
        DirectionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DirectionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_direction_free(ptr, 0);
    }
    /**
     * @returns {Direction}
     */
    static north() {
        const ret = wasm.direction_north();
        return Direction.__wrap(ret);
    }
    /**
     * @returns {Direction}
     */
    static south() {
        const ret = wasm.direction_south();
        return Direction.__wrap(ret);
    }
    /**
     * @returns {Direction}
     */
    static east() {
        const ret = wasm.direction_east();
        return Direction.__wrap(ret);
    }
    /**
     * @returns {Direction}
     */
    static west() {
        const ret = wasm.direction_west();
        return Direction.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    describe() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.direction_describe(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const EitherFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_either_free(ptr >>> 0, 1));

export class Either {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Either.prototype);
        obj.__wbg_ptr = ptr;
        EitherFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EitherFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_either_free(ptr, 0);
    }
    /**
     * @param {number} value
     * @returns {Either}
     */
    static left(value) {
        const ret = wasm.either_left(value);
        return Either.__wrap(ret);
    }
    /**
     * @param {string} value
     * @returns {Either}
     */
    static right(value) {
        const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.either_right(ptr0, len0);
        return Either.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    format() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.either_format(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const MessageFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_message_free(ptr >>> 0, 1));

export class Message {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Message.prototype);
        obj.__wbg_ptr = ptr;
        MessageFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MessageFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_message_free(ptr, 0);
    }
    /**
     * @returns {Message}
     */
    static quit() {
        const ret = wasm.message_quit();
        return Message.__wrap(ret);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {Message}
     */
    static move_to(x, y) {
        const ret = wasm.message_move_to(x, y);
        return Message.__wrap(ret);
    }
    /**
     * @param {string} text
     * @returns {Message}
     */
    static write(text) {
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.message_write(ptr0, len0);
        return Message.__wrap(ret);
    }
    /**
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @returns {Message}
     */
    static change_color(r, g, b) {
        const ret = wasm.message_change_color(r, g, b);
        return Message.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    process() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.message_process(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const PointFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_point_free(ptr >>> 0, 1));

export class Point {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Point.prototype);
        obj.__wbg_ptr = ptr;
        PointFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_point_free(ptr, 0);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {Point}
     */
    static new(x, y) {
        const ret = wasm.point_new(x, y);
        return Point.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    format() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.point_format(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

const TrafficLightFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_trafficlight_free(ptr >>> 0, 1));

export class TrafficLight {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TrafficLight.prototype);
        obj.__wbg_ptr = ptr;
        TrafficLightFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TrafficLightFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_trafficlight_free(ptr, 0);
    }
    /**
     * @returns {TrafficLight}
     */
    static red() {
        const ret = wasm.trafficlight_red();
        return TrafficLight.__wrap(ret);
    }
    /**
     * @returns {TrafficLight}
     */
    static yellow() {
        const ret = wasm.trafficlight_yellow();
        return TrafficLight.__wrap(ret);
    }
    /**
     * @returns {TrafficLight}
     */
    static green() {
        const ret = wasm.trafficlight_green();
        return TrafficLight.__wrap(ret);
    }
    /**
     * @returns {string}
     */
    to_string() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.trafficlight_to_string(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_3;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('rust_enum_tutorial_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
