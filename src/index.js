import { HashMap } from "./hashmap";

let hashmap = new HashMap();
console.log(hashmap);
hashmap.set(1, 5);
console.log(hashmap);
console.log(hashmap.get(1));
hashmap.delete(1);
console.log(hashmap);
