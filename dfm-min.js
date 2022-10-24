const util = require('util')
const fs = require ('fs');
const { exec, execSync, spawn } = require("child_process");
var diamond = require('./diamond.json');
var exists = fs.existsSync('package.json');

const run = async (cmd) => {
  console.log("RUNNING ",cmd)
  return execSync(cmd)
}

const clone = async() => {
  var readme = fs.existsSync('README.md');
  if(readme) {
    fs.unlinkSync('README.md')
  }
  const repo = diamond['repository']['url']?
                diamond['repository']['url']:
                package['repository']['url']
                
  const cloneCMD = `git clone ${repo} ./tmp`
  await run(cloneCMD)
}

const mv = async() => {
  await run('mv ./tmp/* ./')
  console.log("MOVED FROM TMP")
}

const npm = async() => {
  let p = fs.existsSync('package.json');
  if(!p){
    let data = JSON.stringify(package, null, 2);
    console.log("Writing base package.json")
    fs.writeFileSync('package.json', data);
  }
  console.log("Installing from package.json")
  await run("npm install");
  console.log("INSTALLED")
}

const dfm = async() => {
  console.log("Provisioning project folder with dfm")
  await run("node lib/dfm/dfm.js")
}

const hardhat = async() => {
  console.log("Starting Hardhat local node")
  //handle diff to run it on a separate process, but print the proc id
  await run("npx hardhat node --network hardhat")
}

const test = async() => {
  console.log("Running Hardhat tests")
  await run("npx hardhat test")
}

const complete = async() => {
  console.log("\n\nDFP-MIN INSTALL AND LOCAL NODE TEST COMPLETE")
}

const package = {
  "name": "dfm-min-spawned-project",
  "version": "0.0.0",
  "description": "Diamond Facet Manager Project spawned by dfm-min",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "url": "https://github.com/proggR/dfm"
  },
  "author": "@proggR",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/proggR/dfm/issues"
  },
  "homepage": "https://github.com/proggR/dfm#readme",
  "devDependencies": {
    "@nomicfoundation/hardhat-chai-matchers": "^1.0.4",
    "@nomicfoundation/hardhat-toolbox": "^2.0.0",
    "@nomiclabs/hardhat-ethers": "^2.2.0",
    "@nomiclabs/hardhat-etherscan": "^3.1.1",
    "chai": "^4.3.6",
    "hardhat": "^2.11.2",
    "hardhat-deploy": "^0.11.16",
    "mocha-steps": "^1.3.0",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.4"
  },
  "dependencies": {
    "dotenv": "^16.0.3",
    "ethers": "^5.7.1",
    "hardhat-contract-sizer": "^2.6.1",
    "hardhat-gas-reporter": "^1.0.9",
    "simple-git": "^3.14.1"
  }
}

const bootstrap = async() => {
  await clone(package)
          .then(mv)
          .then(npm)
          .then(dfm);
          //.then(hardhat)
          //.then(test)
          //.then(complete)
  const msg = "FINISHED"
  console.log(msg)
  return msg
}

if(!exists){
  console.log("No package.json.")
  bootstrap()
}else{
  console.log("Found package.json. dfm-min expects a folder containing only a diamond.json file. Exiting.")
}
