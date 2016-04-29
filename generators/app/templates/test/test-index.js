
var dist = require('../<%= projectName %>');
var assert  = require('assert');

describe('construct', function () {
    describe('case', function () {
        it('desc', function () {
            assert.deepEqual(dist.construct(1, 2), [1, 2]);
        });
    });
});