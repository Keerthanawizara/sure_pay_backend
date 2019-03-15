const hapi = require('hapi')
const server = hapi.server({
    port: 5000,
    host: 'localhost'
})

const init = async () => {
    await server.start()
    console.log( `Server running at ${server.info.uri}`)
}


process.on('unhandledRejection',(err) => {
    console.log(err)
    process.exit(1)
})
init();



const myPromise = new Promise((resolve, reject) => {
    if (Math.random() * 100 < 90) {
        console.log('heel')
        resolve('Hello, Promises!');
    }
    reject(new Error('In 10% of the cases, I fail. Miserably.'));
});

 const onResolved = (resolvedValue) => console.log(resolvedValue);
 const onRejected = (error) => console.log(error);

 myPromise.then(onResolved, onRejected);
 myPromise.then((resolvedValue)=> {
    console.log(resolvedValue);
 },  (error) =>{
       console.log(error);
 });

// const myProimse = new Promise((resolve, reject) => {
//     if (Math.random() * 100 < 90) {
//       reject(new Error('The promise was rejected by using reject function.'));
//     }
//     throw new Error('The promise was rejected by throwing an error');
//   });
  
//   myProimse.then(
//     () => console.log('resolved'), 
//     (error) => console.log(error.message)
//   );

  //delay 

  const delay = (ms) => new Promise(
      (resolve) => setTimeout(resolve, ms)
  );
  delay(2000)
  .then(()=>{
      console.log('resolved after 2 seconds');
      return delay (1500);
  })
   .then(()=>{
       console.log('resolvedd after 1.5 seconds');
       return delay(3000);
   })
   .then(()=>{
       console.log('resolved after 3 seconds');
       throw new Error();
   }).catch(()=>{
       console.log('caught an eeror');
   }).then(()=>{
       console.log('done');
   });