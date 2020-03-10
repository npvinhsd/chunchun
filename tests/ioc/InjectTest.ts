import {InjectableService} from "@app/ioc/decorators/InjectableService";
import {Inject} from "@app/ioc/decorators/Inject";
import {expect} from 'chai';

describe('Test Inject Service', () => {
    it('Should have Service A in class B', () => {
        @InjectableService(A.name)
        class A {
            public b: number = 1;
        }

        class B {
            @Inject(A.name)
            public a: A;
        }

        let b = new B();
        expect(b.a.b).to.be.equal(1);
    })
});
