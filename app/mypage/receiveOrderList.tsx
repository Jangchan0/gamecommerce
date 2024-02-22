import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

enum OrderStatus {
    ORDER_COMPLETE = '주문 완료',
    WAITING_FOR_SHIPMENT = '발송 대기',
    SHIPMENT_STARTED = '발송 시작',
    ORDER_CANCELLED = '주문 취소',
}

const ReceiveOrderList = ({ uid }) => {
    const [receiveOrder, setReceiveOrder] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const orderCollectionRef = collection(db, 'Order');

            const q = query(orderCollectionRef, where('uploadUids', 'array-contains', uid));

            try {
                const querySnapshot = await getDocs(q);
                const matchingItems: any[] = [];

                // Process the documents
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    const orderItems = data.주문상품;

                    for (let item of orderItems) {
                        if (item.uploadUserUid === uid) {
                            matchingItems.push(item);
                        }
                        setReceiveOrder(matchingItems);
                    }
                });
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [uid]);

    const updateOrderStatus = async (orderDocId: string, productName: string, newStatus: OrderStatus) => {
        const orderDocRef = doc(db, 'Order', orderDocId);

        try {
            const orderDoc = await getDoc(orderDocRef);
            const orderData = orderDoc.data();
            const orderItems = orderData.주문상품;

            const updatedItems = orderItems.map((item) => {
                if (item.상품명 === productName) {
                    return {
                        ...item,
                        주문상태: newStatus,
                    };
                } else {
                    return item;
                }
            });

            await updateDoc(orderDocRef, { 주문상품: updatedItems });
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const isReceiveOrder = receiveOrder && receiveOrder.length > 0;

    return (
        <>
            {isReceiveOrder
                ? receiveOrder.map((item) => {
                      return (
                          <div key={item.상품명} className="border-black border-b-2 flex">
                              <div className="flex-col">
                                  <div>주문 상품명: {item.상품명}</div>
                                  <div>주문수량: {item.상품수량}</div>
                                  <div>주문상태: {item.주문상태}</div>
                              </div>
                              <button>상품상태 변경</button>
                          </div>
                      );
                  })
                : '들어온 주문이 없습니다!'}
            <div />
        </>
    );
};

export default ReceiveOrderList;
