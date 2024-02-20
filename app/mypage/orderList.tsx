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
            <main className="bg-white h-[200px] border-b-2 ">
                <div className="flex justify-between">
                    <p>{formattedOrderDate}</p>
                    <div>{item.주문상태}</div>
                </div>
                <div className=" overflow-scroll flex justify-between">
                    <div>
                        {item.주소}
                        {item.주문상품.map((product, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="grid grid-cols-2">
                                        <p>상품명: {Object.keys(product)}</p>
                                        <p>주문수량: {Object.values(product)}</p>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div>
                        <button>주문취소</button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default OrderList;
