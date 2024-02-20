import React from 'react';

const OrderList = (props) => {
    const item = props.orderList;
    console.log(item);

    const orderDate = new Date(item.주문일시);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const formattedOrderDate = new Intl.DateTimeFormat('ko-KR', options).format(orderDate);

    return (
        <>
            <main className="bg-white h-[80px] border-b-2 overflow-scroll">
                <div className="flex justify-between">
                    <p>{formattedOrderDate}</p>
                    <div>{item.주문상태}</div>
                </div>
            </main>
        </>
    );
};

export default OrderList;
