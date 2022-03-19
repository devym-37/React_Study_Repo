import { createRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { CartType } from "../../graphql/cart";
import { checkedCartState } from "../../recoils/cart";
import CartItem from "./item";
import WillPay from "./willPay";

const CartList = ({ items }: { items: CartType[] }) => {
    const setCheckedCartData = useSetRecoilState(checkedCartState);
    const [formData, setFormData] = useState<FormData>();

    const formRef = useRef<HTMLFormElement>(null);
    const checkBoxRefs = items.map(() => createRef<HTMLInputElement>());

    const handleCheckBoxChanged = (e: SyntheticEvent) => {
        if (!formRef.current) return;
        const targetInput = e.target as HTMLInputElement;
        const data = new FormData(formRef.current);
        const selectedCount = data.getAll("select-item").length;

        if (targetInput.classList.contains("select-all")) {
            // select-all 선택시

            const allChecked = targetInput.checked;
            checkBoxRefs.forEach((inputElem) => {
                inputElem.current!.checked = allChecked;
            });
        } else {
            // 개별 아이템 선택시
            const allChecked = selectedCount === items.length;
            formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked = allChecked;
        }
        setFormData(data);
    };

    // useEffect(() => {
    //     const checkedItems = checkBoxRefs.reduce<CartType[]>((res, ref, i) => {
    //         if (ref.current!.checked) res.push(items[i]);
    //         return res;
    //     }, []);

    //     setCheckedCartData(checkedItems);
    // }, [items, formData]);

    return (
        <div>
            <form ref={formRef} onChange={handleCheckBoxChanged}>
                <label>
                    <input className='select-all' name='select-all' type='checkbox' />
                    전체선택
                </label>
                <ul className='cart'>
                    {items.map((item, i) => (
                        <CartItem {...item} key={item.id} ref={checkBoxRefs[i]} />
                    ))}
                </ul>
            </form>
            {/* <WillPay /> */}
        </div>
    );
};

export default CartList;
