'use strict';

describe('Service: TransactionService', function () {

  // load the service's module
  beforeEach(module('perfinsterApp'));

  // instantiate service
  var TransactionService;
  beforeEach(inject(function (_TransactionService_) {
    TransactionService = _TransactionService_;
  }));

  it('should do something', function () {
    expect(!!TransactionService).toBe(true);
  });

});
