export function deepEqual(a: any, b: any) {
    if (a === b) return true;

    if (typeof a != "object" || a == null || typeof b != "object" || b == null) {
        return false;
    }

    let keysA = Object.keys(a), keysB = Object.keys(b);

    if (keysA.length != keysB.length) return false;

    for (let key of keysA) {
        if (!keysB.includes(key)) return false;

        if (typeof a[key] === "object" && typeof b[key] === "object") {
            if (!deepEqual(a[key], b[key])) return false;
        } else {
            if (a[key] !== b[key]) return false;
        }
    }

    return true;
}