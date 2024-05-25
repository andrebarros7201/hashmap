class Node {
  constructor(key, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.bucketArray = new Array(16).fill(null);
    this.capacity = this.bucketArray.length;
    this.occupied = 0;
  }
}
