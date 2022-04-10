import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { EXECUTE_PAY } from "../../graphql/payment";
import { graphqlFetcher } from "../../queryClient";
import { checkedCartState } from "../../recoils/cart";
import WillPay from "../willPay";
import PaymentModal from "./modal";

type PaymentInfos = string[];

const Payment = () => {
    const navigate = useNavigate();
    const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
    const [modalShow, toggleModal] = useState(false);

    const { mutate: executePay } = useMutation((payInfos: PaymentInfos) => graphqlFetcher(EXECUTE_PAY, payInfos));

    const showModal = () => {
        toggleModal(true);
    };

    const proceed = () => {
        const payInfos = checkedCartData.map(({ id }) => id);

        executePay(payInfos);

        setCheckedCartData([]);
        alert("결제가 완료되었습니다.");
        navigate("/products", { replace: true });
    };

    const cancel = () => {
        toggleModal(false);
    };

    return (
        <div>
            <WillPay submitTitle='결제하기' handleSubmit={showModal} />
            <PaymentModal show={modalShow} proceed={proceed} cancel={cancel} />
        </div>
    );
};

export default Payment;
