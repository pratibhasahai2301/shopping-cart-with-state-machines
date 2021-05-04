import React from 'react';

import ProductAdd from "./add-product";
import ButtonWrapper from "./form-fields/button";
import CartTable from "./cart-table";

const ShoppingCart = ({current, send}) => {
    const rows = current.context.cart;

    const deleteData = (id) => {
        send('productDeleted', id);
    };

    const handleNext = () => {
        send('cartFilled');
    }

    return (
        <div style={{flexDirection: 'column'}}>
            <ProductAdd send={send}/>
            <CartTable data={rows} onDelete={deleteData} showDelete={true} />

            <div style={{justifyContent: 'flex-end'}}>
                <ButtonWrapper color={'secondary'}
                               variant="contained"
                               data-testid="next-button"
                               onClick={handleNext}
                               disabled={!rows.length}
                               style={{marginTop: 10, marginBottom: 18}}>
                    Next
                </ButtonWrapper>
            </div>
        </div>
    );
}

export default ShoppingCart;
