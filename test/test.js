"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var psequel = require('../index');
var expect = chai.expect;

chai.should();
chai.use(sinonChai);

function createFakeClient() {
    return {
        'query': sinon.fake.returns({'rows': []})
    };
}

const testModel = {
    'table': 'test',
    'columns': ['id', 'name', 'value']
};

describe('Queries', () => {
    describe('#select()', () => {
        it('should use star if no arguments provided', () => {
            const fakeClient = createFakeClient();
            psequel(fakeClient).Model(testModel).select();

            fakeClient.query.should.have.been.calledOnce;
            fakeClient.query.should.have.been.calledWith("SELECT * FROM test");
        });
        it('should select one column if provided a string as argument', () => {
            const fakeClient = createFakeClient();
            psequel(fakeClient).Model(testModel).select('id');

            fakeClient.query.should.have.been.calledOnce;
            fakeClient.query.should.have.been.calledWith("SELECT id FROM test");
        });
        it('should select multiple column if provided an array as argument', () => {
            const fakeClient = createFakeClient();
            psequel(fakeClient).Model(testModel).select(['id', 'name', 'value']);

            fakeClient.query.should.have.been.calledOnce;
            fakeClient.query.should.have.been.calledWith("SELECT id, name, value FROM test");
        });
    });
    describe('#where()', () => {
        it('should add where clause if provided with one', () => {
            const fakeClient = createFakeClient();
            psequel(fakeClient).Model(testModel).where({
                'column': 'name',
                'op': 'eq' ,
                'value': 'Jo'
            }).select();

            fakeClient.query.should.have.been.calledOnce;
            fakeClient.query.should.have.been.calledWith("SELECT * FROM test WHERE name = 'Jo'");
        });
    });  
});