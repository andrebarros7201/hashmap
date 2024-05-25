class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.bucketArray = new Array(16);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  _resize() {
    const oldArray = this.bucketArray;
    const newArray = new Array(this.bucketArray.length * 2);
    this.bucketArray = newArray;
    this.size = 0;

    for (let bucket of oldArray) {
      let node = bucket;
      while (node) {
        this._insert(node.key, node.value, newArray);
        node = node.next;
      }
    }
  }

  _insert(key, value, array) {
    const index = this.hash(key);
    if (!array[index]) {
      array[key] = new Node(key, value);
    } else {
      let node = array[index];
      while (node) {
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
    }
    this.size++;
  }

  set(key, value) {
    if (this.size / this.bucketArray.length >= this.loadFactor) {
      this._resize();
    }
    this._insert(key, value, this.bucketArray);
  }
}

export { HashMap };
