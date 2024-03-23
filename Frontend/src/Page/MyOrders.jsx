import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getMyOrders = async () => {
            try {
                const orderResponse = await fetch("http://localhost:5000/user/orders/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                const { orders } = await orderResponse.json();
                setOrders(orders);
            } catch (error) {
            }
        };
        getMyOrders();
    }, []);

    const columns = [
        {id:"Number",label:"S.No",width: "fit-content"},
        { id: "orderId", label: "Order Id" },
        {id:"ProductName",label:"Product Name"},
        { id: "orderStatus", label: "Order Status" },
        { id: "itemQuantity", label: "Item Qty" },
        { id: "Amount", label: "Amount" },

    ];


    const rows = orders.map((order, index) => ({
        Number: index + 1,
        orderId: order._id,
        ProductName: order.orderItems.map(item => item.name).join(', '),
        orderStatus: order.orderStatus,
        itemQuantity: order.orderItems.length,
        Amount: Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR'}).format(order.totalPrice),
    }));

    return (
        <div>
            <Paper sx={{ width: '100%',maxHeight:"100%", height:"90vh", overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="left"
                                        style={{ minWidth: 170 }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow hover key={row.orderId}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align="left">
                                            {row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default MyOrders;
