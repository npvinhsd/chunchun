import {expect} from 'chai';
import {Inject, InjectableService} from '../../src/ioc/decorators';
import {Container} from '../../src/ioc';

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
    });

    it('Register object instance successfully', () => {
        class A {
            public b = 1;
        }

        Container.getInstance().registerInstance<A>(A.name, new A());
        let a = Container.getInstance().resolve<A>(A.name);
        expect(a.b).to.be.equal(1);
    });
});
