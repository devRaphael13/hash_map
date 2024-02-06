class HashMap {
    constructor() {
        this.map = new Array(16).fill(null);
        this.load_factor = 0;
        this.size = 16;
        this.curr_size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.size;
    }

    update_load_factor() {
        this.load_factor = (this.curr_size / this.size) * 100;
    }

    expand() {
        this.curr_size = 0
        this.size = 2 * this.size
        this.load_factor = 0
        this.entries().forEach((entry) => this.set(entry[0], entry[1]))
    }

    set(key, value) {
        this.map[this.hash(key)] = [key, value];
        this.curr_size++;
        this.update_load_factor();

        if (this.load_factor >= 75) this.expand();
    }

    get(key) {
        return this.map[this.hash(key)][1];
    }

    has(key) {
        return this.map[this.hash(key)] !== null;
    }

    remove(key) {
        this.map[this.hash(key)] = null;
    }

    length() {
        return this.curr_size;
    }

    clear() {
        this.map = new Array(16).fill(null);
    }

    keys() {
        return this.entries().map((entry) => entry[0]);
    }

    values() {
        return this.entries().map((entry) => entry[1]);
    }

    entries() {
        return this.map.filter((entry) => entry !== null)
    }
}
