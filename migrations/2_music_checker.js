require('dotenv').load({silent: true});
var MusicChecker = artifacts.require("./MusicChecker");

module.exports = function(deployer) {
  deployer.deploy(MusicChecker, '0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
};
