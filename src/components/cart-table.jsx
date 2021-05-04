import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';

import ButtonWrapper from "./form-fields/button";

const CartTable = ({data, showDelete, onDelete}) => {
    const columns = [
        { id: 'name', label: 'Product Name', minWidth: '35%' },
        { id: 'price', label: 'Product Price', minWidth: '35%' },
        {
            id: 'requiresShipping',
            label: 'Requires Shipping',
            minWidth: showDelete ? '10%' : '30%',
        }];
    return (
        <div style={{flexDirection: 'column'}}>
            <Typography variant={'button'}> Shopping Cart</Typography>
            <TableContainer component={Paper} style={{marginTop: 14}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            {
                                showDelete && <TableCell
                                    key={'action'}
                                    align={"right"}
                                    style={{ minWidth: '20%' }}
                                >
                                    Action
                                </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id}>
                                                {typeof value === 'boolean' ? (value ? 'Yes': 'No') : value}
                                            </TableCell>
                                        );
                                    })}
                                    {
                                        showDelete && <TableCell key={'action'} align={'right'}>
                                            <ButtonWrapper
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => onDelete(row.id)}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Delete
                                            </ButtonWrapper>
                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        })}

                        {
                            !data.length && (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Typography>No products added to cart</Typography>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default CartTable;
