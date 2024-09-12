import Error from "../../Components/ErrorHandler/Error";
import Loading from "../../Components/Loading/Loading";
import OrderHistoryTable from "../../Components/OrderHistoryTable";


const OrderHistory: React.FC = () => {
  console.log("OrderHistory rendered");

  return (
    <Error>
      <Loading>
      <div>
       <OrderHistoryTable/>
      </div>
      </Loading>
    </Error>
  );
};

export default OrderHistory;
