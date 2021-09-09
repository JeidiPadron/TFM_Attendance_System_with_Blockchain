# MetaMask DApp for attendance registry

DApp for use in MetaMask to store daily employee time record using Ethereum network

Based on code from [here](https://metamask.github.io/test-dapp/).

## NOTE: Requires Manual Deployment
  * install node-js version 14 or higher and npm version 7 or higher
  * node_modules libraries are stored in zip file only for reference (do not use)
  * to get all node_modules open cmd command in the project folder (C:\TFM\DAppTimeLog
  * run this command:
       npm install
       npm install --save ethers
       npm install ipfs-core
       npm run serve
  * open in any web browser http://localhost:9011/


## For debug options, settin up ESlinter in your JavaScript Project with VS Code
  (optional steps to generate pagkage.json and .eslintrc.js files)
  * create a javascript project:
       npm init  (output is package.json file)
       add scripts for: deploy, lint, lint:fix and serve
  * install eslint utility as an extension in your VS Code Editor
     (preinstalled global)
  * Install eslint as a global package using npm:
       npm install eslint --save-dev 
  * initialize eslint in your javascript project 
       npx eslint --init (output is .eslintrc.js)
       modify your eslint configuration file in your project.
  * debug for correct errors:
        npm run lint