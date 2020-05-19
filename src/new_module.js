console.log('hiii');

async function start() {
    return await Promise.resolve('async hello')
}

start().then(console.log)