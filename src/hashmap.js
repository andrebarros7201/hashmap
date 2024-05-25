class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.keyMap = new Array(16);
    this.size = 0; // Number of key-value pairs in the map
    this.loadFactor = 0.75;
  }

  _hash(key, keyMapLength) {
    let total = 0;
    let PRIME = 31; // Prime number helps in spreading the keys more uniformly
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96; // Assuming keys are lowercase strings
      total = (total * PRIME + value) % keyMapLength;
    }
    return total;
  }

  _resize() {
    const newKeyMap = new Array(this.keyMap.length * 2);
    const oldKeyMap = this.keyMap;
    this.keyMap = newKeyMap;
    this.size = 0;

    for (let bucket of oldKeyMap) {
      let node = bucket;
      while (node) {
        this._insert(node.key, node.value, newKeyMap);
        node = node.next;
      }
    }
  }

  _insert(key, value, keyMap) {
    const index = this._hash(key, keyMap.length);
    if (!keyMap[index]) {
      keyMap[index] = new Node(key, value);
    } else {
      let node = keyMap[index];
      while (node) {
        if (node.key === key) {
          node.value = value; // Update value if key already exists
          return;
        }
        if (!node.next) {
          node.next = new Node(key, value);
          return;
        }
        node = node.next;
      }
    }
    this.size++;
  }

  set(key, value) {
    if (this.size / this.keyMap.length >= this.loadFactor) {
      this._resize();
    }
    this._insert(key, value, this.keyMap);
  }

  get(key) {
    const index = this._hash(key, this.keyMap.length);
    let node = this.keyMap[index];
    while (node) {
      if (node.key === key) {
        return node.value;
      }
      node = node.next;
    }
    return undefined;
  }

  delete(key) {
    const index = this._hash(key, this.keyMap.length);
    let node = this.keyMap[index];
    let prev = null;
    while (node) {
      if (node.key === key) {
        if (prev) {
          prev.next = node.next;
        } else {
          this.keyMap[index] = node.next;
        }
        this.size--;
        return node.value;
      }
      prev = node;
      node = node.next;
    }
    return undefined;
  }

  has(key) {
    const index = this._hash(key, this.keyMap.length);
    let node = this.keyMap[index];
    while (node) {
      if (node.key === key) {
        return true;
      }
      node = node.next;
    }
    return false;
  }

  countKeys() {
    let count = 0;
    for (let bucket of this.keyMap) {
      let node = bucket;
      while (node) {
        count++;
        node = node.next;
      }
    }
    return count;
  }

  clear(){
    this.keyMap = new Array(16);
    this.size = 0;
  }

  keys() {
    const keys = [];
    for (let bucket of this.keyMap) {
      let node = bucket;
      while (node) {
        keys.push(node.key);
        node = node.next;
      }
    }
    return keys;
  }

  values(){
    const values = []
    for (let bucket of this.keyMap) {
      let node = bucket;
      while (node) {
        values.push(node.value)
        node = node.next;
      }
    }
    return values;
  }

  entries(){
    const entries = [];
    for (let bucket of this.keyMap) {
      let node = bucket;
      while (node) {
        entries.push([node.key, node.value]);
        node = node.next;
      }
    }
    return entries;
  }
}


export { HashMap };
