import {assign, Machine} from "xstate";

export const cartMachine = Machine({
        id: "shopping_cart",
        initial: "idle",
        context: {
            cart: [],
            address: {},
            shippingMethod: '',
            paymentMethod: '',
            data: {}
        },
        states: {
            idle: {
                on: {
                    productAdded: {
                        target: 'idle',
                        actions: ['onProductAdded']
                    },
                    productDeleted: {
                        target: 'idle',
                        actions: ['onProductDeleted']
                    },
                    cartFilled: [
                        {
                            target: 'cart',
                            cond: (event) => event ? event.cart.length : false
                        },
                        {target: 'idle'}
                    ]
                },
            },
            cart: {
                on: {
                    address: {
                        target: "addressed",
                        actions: ["onAddressAdded"]
                    },
                }
            },
            addressed: {
                on: {
                    select_shipping: {
                        target: "shipping_selected",
                        actions: ["onShippingSelected"]
                    },
                    skip_shipping: {
                        target: "shipping_skipped",
                        actions: ["onShippingSkipped"]
                    }
                }
            },
            shipping_selected: {
                on: {
                    select_payment: {
                        target: "payment_selected",
                        actions: ["onPaymentSelected"]
                    },
                    skip_payment: {
                        target: "payment_skipped",
                        actions: ["onPaymentSkipped"]
                    },
                    address: {
                        target: "addressed",
                        actions: ["onAddressAdded"]
                    }
                }
            },
            shipping_skipped: {
                on: {
                    select_payment: {
                        target: "payment_selected",
                        actions: ["onPaymentSelected"]
                    },
                    skip_payment: {
                        target: "payment_skipped",
                        actions: ["onPaymentSkipped"]
                    },
                    address: {
                        target: "addressed",
                        actions: ["onAddressAdded"]
                    }
                }
            },
            payment_selected: {
                on: {
                    complete: 'completed',
                    skip_shipping: {
                        target: "shipping_skipped",
                        actions: ["onShippingSkipped"]
                    },
                    address: {
                        target: "addressed",
                        actions: ["onAddressAdded"]
                    }
                }
            },
            payment_skipped: {
                on: {
                    complete: 'completed',
                    select_shipping: {
                        target: "shipping_selected",
                        actions: ["onShippingSelected"]
                    },
                    address: {
                        target: "addressed",
                        actions: ["onAddressAdded"]
                    }
                }
            },
            completed: {
                invoke: {
                    id: 'confirmData',
                    src: (context) => fetch('https://en720zuznyjj5.x.pipedream.net/', {
                        method: "POST",
                        mode: "cors",
                        body: JSON.stringify(context),
                    })
                        .then(data => data.json()),
                    onDone: {
                        target: 'resolved',
                        actions: assign({
                            data: (_, event) => event.data
                        }),
                    },
                    onError: 'rejected'
                },
            },
            resolved: {
                on: {
                    reset: {
                        target: 'idle',
                        actions: ['onReset'],
                    }
                }
            },
            rejected: {
                on: {
                    reset: {
                        target: 'idle',
                        actions: ['onReset'],
                    }
                }
            },
        }
    },
    {
        actions: {
            // action implementations
            onShippingSelected: (context, event) => {
                context.shippingMethod = event.shippingMethod;
            },
            onShippingSkipped: (context, event) => {
                context.shippingMethod = ''
            },
            onAddressAdded: (context, event) => {
                context.address = {...event.data};
            },
            onProductAdded: (context, event) => {
                if (context.cart.findIndex(entry => entry.id === event.data.id) === -1) {
                    context.cart = [...context.cart, event.data];
                }
            },
            onProductDeleted: (context, event) => {
                context.cart = context.cart.filter(entry => entry.id === event.id);
            },
            onPaymentSelected: (context, event) => {
                context.paymentMethod = event.paymentMethod;
            },
            onPaymentSkipped: (context, event) => {
                context.payment_skipped = '';
            },
            onReset: (context) => {
                context.cart = [];
                context.shippingMethod = '';
                context.address = {};
                context.paymentMethod = '';
                context.data = {};
            }
        }
    })
;
