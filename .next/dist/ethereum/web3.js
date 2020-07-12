'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var web3 = void 0;

//We are in the browser and metamask is running
if (typeof window !== 'undefined' && typeof web3 !== 'undefined') {
    console.log("Aqui: " + web3.currentProvider);
    web3 = new _web2.default(web3.currentProvider);
} else {
    //We are on the server OR the user is not running metamask
    //We make our provider with the infura node
    var rinkeby = 'https://rinkeby.infura.io/v3/c0938b91a0b7408e85499f849f6b14de';

    var provider = new _web2.default.providers.HttpProvider(rinkeby);

    web3 = new _web2.default(provider);
}

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIndlYjMiLCJ3aW5kb3ciLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFByb3ZpZGVyIiwicmlua2VieSIsInByb3ZpZGVyIiwicHJvdmlkZXJzIiwiSHR0cFByb3ZpZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPLEFBQVA7Ozs7OztBQUNBLElBQUksWUFBSjs7QUFFQTtBQUNBLElBQUksT0FBTyxBQUFQLFdBQWtCLEFBQWxCLGVBQWlDLE9BQU8sQUFBUCxTQUFnQixBQUFyRCxhQUNBLEFBQ0k7WUFBUSxBQUFSLElBQVksV0FBVyxLQUFLLEFBQTVCLEFBQ0E7V0FBTyxBQUFJLEFBQUosa0JBQVMsS0FBSyxBQUFkLEFBQVAsQUFDSDtBQUpELE9BTUEsQUFDSTtBQUNBO0FBQ0E7UUFBTSxVQUFVLEFBQWhCLEFBRUE7O1FBQU0sV0FBVyxJQUFJLGNBQUssQUFBTCxVQUFlLEFBQW5CLGFBQWdDLEFBQWhDLEFBQWpCLEFBRUE7O1dBQU8sQUFBSSxBQUFKLGtCQUFTLEFBQVQsQUFBUCxBQUNIO0FBR0Q7O2tCQUFlLEFBQWYiLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYWpncy9EZXNrdG9wL1RGRy9kZXYva2lja3N0YXJ0In0=