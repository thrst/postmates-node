'use strict';

var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('superagent');

var Postmates = require('../lib');

var customerId = 'customerId';
var apiKey = 'apiKey';
var postmates = new Postmates(customerId, apiKey);

describe('Postmates', function () {
  beforeEach(function() {
    sinon.spy(request, 'get');
    sinon.stub(request.Request.prototype, 'end').yields(null, {});
  });

  afterEach(function() {
    request.get.restore();
    request.Request.prototype.end.restore();
  });

  describe('Delivery zones', function () {
    it('should GET "delivery_zones"', function (done) {
      postmates.zones(function (err, zones) {
        expect(request.get).to.be.called;
        expect(request.get.firstCall.args[0]).to.match(/delivery_zones$/);
        done();
      });
    });
  });
});
