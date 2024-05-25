class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.size = 0;
    this.array = new Array(16);
    this.loadFactor = 0.75;
  }

  _hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  _resize() {
    const oldArray = this.array;
    let newArray = new Array(this.array.length * 2);
    this.array = newArray;
    this.size = 0;

    for (const bucket of oldArray) {
      let node = bucket;
      while (node) {
        this._insert(node.key, node.value);
        node = node.next;
      }
    }
  }

  _insert(key, value) {
    const index = this._hash(key);

    if (!this.array[index]) {
      this.array[index] = new Node(key, value);
    } else {
      let node = this.array[index];
      if (node.key === key) {
        node.value = value;
        return;
      }
      if (!node.next) {
        node.next = new Node(key, value);
        return;
      }
      node = node.next;
    }
    this.size++;
  }

  set(key, value) {
    if (this.size / this.array.length >= this.loadFactor) {
      resize();
    }
    this._insert(key, value);
  }

  get(key) {
    const index = this._hash(key);
    if (!this.array[index]) {
      return `Doesn't exist`;
    }
    let node = this.array[index];
    while (node) {
      if (node.key === key) {
        return node.value;
      }
      node = node.next;
    }
  }

  delete(key) {
    const index = this._hash(key);
    let node = this.array[index];
    let prev = null;
    while (node) {
      if (node.key === key) {
        if (prev) {
          prev.next = node.next;
        } else {
          this.array[index] = node.node;
        }
        this.size--;
      }
      prev = node;
      node = node.next;
    }
    return undefined;
  }
}

export { HashMap };
