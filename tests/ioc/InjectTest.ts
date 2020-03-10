import {expect} from 'chai';
import {Inject, InjectableService} from "../../src/ioc/decorators";

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
    });

    it('Singleton should work', () => {
        @InjectableService(A.name, true)
        class A {
            public b: number = 1;
        }

        class B {
            @Inject(A.name)
            public a: A;

            constructor() {
                this.a.b = 2;
            }
        }

        class C {
            @Inject(A.name)
            public a: A;
        }


        let b = new B();
        let c = new C();
        expect(c.a.b).to.be.equal(2);
    })
});
