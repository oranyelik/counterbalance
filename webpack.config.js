const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const { WebSocket } = require('ws')

module.exports = {
    mode: 'development',
    entry: './src/sketch.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/index.html' }
        ])
    ]
}

// watch -> auto update / refresh? -> not working!
// module.exports.serve = {
//     content: [__dirname],
//     hot: {
//       host: 'localhost',
//       port: 8090
//     },
//     on: {
//       listening(server) {
//         const socket = new WebSocket('ws://localhost:8090');
//         const watchPath = __dirname;
//         const options = {};
//         const watcher = chokidar.watch(watchPath, options);
  
//         watcher.on('change', () => {
//           const data = {
//             type: 'broadcast',
//             data: {
//               type: 'window-reload',
//               data: {}
//             }
//           };
  
//           socket.send(stringify(data));
//         });
  
//         server.on('close', () => {
//           watcher.close();
//         });
//       }
//     }
//   };
