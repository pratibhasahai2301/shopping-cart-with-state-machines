const { Machine } = require('xstate');
const { createModel } = require('@xstate/test');

describe('feedback app', () => {
  const feedbackMachine = Machine({
    id: 'feedback',
    initial: 'question',
    states: {
      idle: {
        on: {
          productAdded: {
            target: 'idle',
            actions: ['onProductAdded'],
            meta: {
              test: async page => {
                await page.waitFor('[data-testid="add-product-button"]');
              }
            }
          },
          cartFilled: [
            {
              target: 'cart',
              cond: (event) => event ? event.cart.length : false,
              meta: {
                test: async page => {
                  await page.waitFor('[data-testid="next-button"]');
                }
              }
            },
            {target: 'idle'}
          ]
        },
      },
      cart: {
        type: 'final'
      },
    }
  });

  const testModel = createModel(feedbackMachine, {
    events: {
      productAdded: async page => {
        await page.click('[data-testid="add-product-button-1"]');
      },
      cartFilled: async page => {
        await page.click('[data-testid="next-button"]');
      }
    }
  });

  const testPlans = testModel.getSimplePathPlans();

  testPlans.forEach((plan, i) => {
    describe(plan.description, () => {
      plan.paths.forEach((path, i) => {
        it(
            path.description,
            async page => {
              await page.goto(`http://localhost:${process.env.PORT || '3000'}`);
              await path.test(page);
            },
            10000
        );
      });
    });
  });

  it('coverage', () => {
    testModel.testCoverage();
  });
});
