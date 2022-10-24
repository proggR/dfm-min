# dfm-min.js: the lazy sibling of Diamond Facet Manager

Assuming nothing more than node and git are installed, and starting with nothing more than a diamond.json file, dfm-min.js clones the base project referenced by the repository url field (or falls back on the base DFM repo if no base is referenced), installs its NPM dependencies, and then imports the Diamond dependencies into the project using [dfm's](https://github.com/proggR/dfm) `lib/dfm/dfm.js` script.

**TL;DR:** it stands up your ERC2535/Diamond development environment with a 1 liner.

Its all a work in progress, but once dfm.js is updated to properly link tasks/tests without manual process, dfm-min will be updated to run through a complete process including spinning up your local Hardhat node, and automatically running your tests for you (or potentially even a full deployment... in a future/stable version perhaps, but pls, not now :\ lol)


**Note:** This README will self destruct (to avoid conflict). A copy exists in README.min.md.


# Use
```console
node dfm-min.js
```
... and that's it*!

_*: WIP. Current limitations exist in dfm (namely linking tasks/tests) that block this claim. But soon..._

From this diamond.json file, you'll be standing up a copy of the [dfm repo](https://github.com/proggR/dfm) example project, which includes [DiamondGreeterFacet](https://github.com/proggR/DiamondGreeterFacet) and [DiamondERC20Facet](https://github.com/proggR/DiamondERC20Facet) and their related contracts/ tasks/ tests/ interfaces/ storage contracts. For the currently manual task/test linking instructions, please refer to the README there.
