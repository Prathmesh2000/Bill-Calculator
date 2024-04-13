import react, { useState } from 'react';
import styles from './styles.module.scss';

export default function MobileScreenComponent() {
    const [userType, setUserType] = useState('salesman');
    const [paymentMode, setPaymentMode] = useState('online');
    const [productList, setProductList] = useState(['apple', 'banana']);
    const [salesmanList, setSalesmanList] = useState(['a', 'b']);
    const units = ['Box', 'Grams', 'Kgs', 'Packs'];
    const [productSelectedList, setProductSelectedList] = useState([{
        productName: '',
        qty: '0',
        unit: '',
        price: ''
    }])
    const [salesmanName, setSalesmanName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [receivedAmount, setReceivedAmount] = useState('');

    function handleUserTypeChange(e) {
        let selectedValue = e.target.value;
        setUserType(selectedValue);
    }

    function handlePaymentModeChange(e) {
        let selectedValue = e.target.value;
        setPaymentMode(selectedValue);
    }

    function handleAddProduct() {
        setProductSelectedList((prev) => {
            return prev.concat({
                productName: '',
                qty: '0',
                unit: '',
                price: ''
            })
        })
    }

    function handleCustomerInputChange(e) {
        const inputValue = e.target.value;
        setCustomerName(inputValue);
    }

    function handleQtyInputChange(e) {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setQty(inputValue);
        }
    }

    function handleReceivedAmountInputChange(e) {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue)) {
            setReceivedAmount(inputValue);
        }
    }

    function handlePriceInputChange(e, index) {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            let tempArray = productSelectedList;
            tempArray[index].price = value;
            setProductSelectedList([...tempArray])
        }
    }

    function handleQtyInputChange(e, index) {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            let tempArray = productSelectedList;
            tempArray[index].qty = value;
            setProductSelectedList([...tempArray])
        }
    }

    function handleUnitSelect(event, index){
        let value = event?.target?.value;

        let tempArray = productSelectedList;
        tempArray[index].unit = value;
        setProductSelectedList([...tempArray])
    }

    function handleProductSelect(event, index){
        let value = event?.target?.value;

        let tempArray = productSelectedList;
        tempArray[index].productName = value;
        setProductSelectedList([...tempArray])
    }

    function removeProduct(e, i){
        let tempArray = productSelectedList;
        if(tempArray?.length>1) {
            tempArray = tempArray.slice(0, i).concat(tempArray.slice(i+1, tempArray?.length));
    
            setProductSelectedList([...tempArray])
        }
    }

    function handleSalesmanSelect(event) {
        let value = event?.target?.value;
        setSalesmanName(value)
    }

    console.log(productSelectedList, "tempArr")
    console.log(receivedAmount, "receivedAmountreceivedAmount")
    console.log(customerName, ":customerName")
    console.log(paymentMode, "paymentMode")
    console.log(salesmanName, "salesmanListsalesmanList")

    let totalAmount = 0;
    productSelectedList.map((e)=>{
        totalAmount+=(e.qty * e.price);
    })

    return (
        <>
            <div className={styles.heading}>Bill Calculator</div>
            <div className={styles.user_type_container}>
                <div>Type: </div>
                <div>
                    <input
                        type="radio"
                        value={'salesman'}
                        checked={userType == 'salesman'}
                        onChange={handleUserTypeChange}
                    />
                    <label>Salesman</label>
                    <input
                        type="radio"
                        value={'customer'}
                        checked={userType == 'customer'}
                        onChange={handleUserTypeChange}
                    />
                    <label>Customer</label>
                </div>
            </div >
            {
                userType == 'salesman' ?
                    <div className={styles.user_detail}>
                        <select
                            onClick={handleSalesmanSelect}
                            defaultValue={salesmanName}
                        >
                            <option
                                value=""
                                disabled
                                selected
                                hidden
                            >Salesman</option>
                            {
                                salesmanList.map((val, i) => (
                                    <option value={val}>{val}</option>
                                ))
                            }
                        </select>
                    </div>
                    :
                    <div className={styles.user_detail}>
                        <input
                            type="text"
                            value={customerName}
                            onChange={handleCustomerInputChange}
                            placeholder=" "
                        />
                        <label
                            className={customerName ? 'active' : ''}
                        >
                            Customer
                        </label>
                    </div>
            }
            <div className={styles.product_detail_list}>
                <div>Product List: </div>
                {
                    productSelectedList.map((val, i) => (
                        <div className={styles.product_detail}>
                            {productSelectedList?.length>1 &&<div>
                                <span>{`Product ${i+1}`}</span>
                                <button onClick={(e)=>{removeProduct(e, i)}}>Remove</button>
                            </div>}
                            <div className={styles.product_detail_wrap}>
                                <div className={styles.product_detail_name}>
                                    <select
                                    onClick={(e)=>{handleProductSelect(e, i)}}
                                    defaultValue={val.productName}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            hidden
                                        >Product Name</option>
                                        {
                                            productList.map((val, i) => (
                                                <option value={val}>{val}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={styles.product_detail_qty}>
                                    <input
                                        type="text"
                                        value={val.qty}
                                        onChange={(e)=>handleQtyInputChange(e, i)}
                                        placeholder=" "
                                    />
                                    <label
                                        className={val.qty ? 'active' : ''}
                                    >
                                        QTY
                                    </label>
                                </div>
                            </div>
                            <div className={`${styles.product_detail_wrap} ${styles.mt_20}`}>
                                <div className={styles.product_detail_unit}>
                                    <select
                                        onClick={(e)=>{handleUnitSelect(e, i)}}
                                        defaultValue={val.unit}
                                >
                                        <option
                                            value=""
                                            disabled
                                            hidden
                                        >Unit</option>
                                        {
                                            units.map((value) => (
                                                <option 
                                                    selected={value==val.unit}
                                                    value={value}>
                                                        {value}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className={styles.product_detail_price}>
                                    <input
                                        type="text"
                                        value={val.price}
                                        onChange={(e)=>handlePriceInputChange(e, i)}
                                        placeholder=" "
                                    />
                                    <label
                                        className={val.price ? 'active' : ''}
                                    >
                                        {'Price (Rs.)'}
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className={styles.add_product}>
                    <button onClick={handleAddProduct}>Add products +</button>
                </div>
                <div className={styles.payment_mode}>
                    <div>Payment Mode: </div>
                    <input
                        type="radio"
                        value={'online'}
                        checked={paymentMode == 'online'}
                        onChange={handlePaymentModeChange}
                    />
                    <label>Online</label>
                    <input
                        type="radio"
                        value={'cash'}
                        checked={paymentMode == 'cash'}
                        onChange={handlePaymentModeChange}
                    />
                    <label>Cash</label>
                </div>
                <div className={styles.received_mount_container}>
                    <input
                        type="text"
                        value={receivedAmount}
                        onChange={handleReceivedAmountInputChange}
                        placeholder=" "
                    />
                    <label
                        className={receivedAmount ? 'active' : ''}
                    >
                        Received Amount
                    </label>
                </div>
                <div>
                    <div>Total: </div>
                    <div>{`Rs. ${totalAmount}`}</div>
                </div>
            </div>
        </>
    )
};