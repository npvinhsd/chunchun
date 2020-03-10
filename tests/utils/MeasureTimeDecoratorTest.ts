import {expect} from 'chai';
import * as sinon from 'sinon';
import {SinonStub} from 'sinon';
import {measureExecTime} from "../../src/utils/decorators";

describe('Test Measure Time', () => {
    beforeEach(() => {
        sinon.stub(console, 'log');
    });

    it('Should call console.log once time', async () => {
        process.env.LOG_LEVEL = 'dev';

        class TestClass {
            @measureExecTime()
            async testTime() {
                return;
            }
        }

        await new TestClass().testTime();
        expect((console.log as SinonStub).called).to.be.true;
    });
});
