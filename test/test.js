"use strict";
var path = require('path');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var psequel = require(path.join(__dirname, '..', 'index'));
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
    'columns': ['id', 'name', 'value', "le'ls"]
};

describe('Queries', () => {
    describe('#select()', () => {
        it('should use star if no arguments provided', async () => {
            const fakeClient = createFakeClient();
            await psequel(fakeClient).Model(testModel).select();

            expect(fakeClient.query).to.have.been.calledOnce;
            expect(fakeClient.query).to.have.been.calledWith("SELECT * FROM test");
        });
        it('should select one column if provided a string as argument', async () => {
            const fakeClient = createFakeClient();
            await psequel(fakeClient).Model(testModel).select('id');

            expect(fakeClient.query).to.have.been.calledOnce;
            expect(fakeClient.query).to.have.been.calledWith("SELECT 'id' FROM test");
        });
        it('should select multiple column if provided an array as argument', async () => {
            const fakeClient = createFakeClient();
            await psequel(fakeClient).Model(testModel).select(['id', 'name', 'value']);

            expect(fakeClient.query).to.have.been.calledOnce;
            expect(fakeClient.query).to.have.been.calledWith("SELECT 'id', 'name', 'value' FROM test");
        });
        it('should properly escape column names containing single quotes', async () => {
            const fakeClient = createFakeClient();
            await psequel(fakeClient).Model(testModel).select("le'ls");

            expect(fakeClient.query).to.have.been.calledOnce;
            expect(fakeClient.query).to.have.been.calledWith("SELECT 'le''ls' FROM test");
        });
    });
    describe('#where()', () => {
        it('should add where clause if provided with one', async () => {
            const fakeClient = createFakeClient();
            const test = psequel(fakeClient).Model(testModel);
            await test.where(
                test.columns['name'].equalsValue('Jo')
            ).select();

            expect(fakeClient.query).to.have.been.calledOnce;
            expect(fakeClient.query).to.have.been.calledWith("SELECT * FROM test WHERE name = 'Jo'");
        });
    });  
});