var persist = require('node-persist');

persist.initSync();

//persist.setItem('somekey', 'someval')

console.log(persist.getItem('somekey'));