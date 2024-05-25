import { HashMap } from "./hashmap";

let hashmap = new HashMap();
console.log(hashmap);
hashmap.set(1, 5);
console.log(hashmap);
console.log(hashmap.get(1));
console.log(hashmap.delete(1));
hashmap.set(15645, 7);
console.log(hashmap);

hashmap.set('asdaihda', 2)
hashmap.set('maria', 2)

console.log(hashmap);

console.log(hashmap.has(1));
console.log(hashmap.keys());
console.log(hashmap.values())
console.log(hashmap.entries())
