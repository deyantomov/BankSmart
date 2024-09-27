import { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import useCreateAccount from "../../hooks/useCreateAccount";
import withNavigation from "../../layouts/withNavigation/withNavigation";
import { Select, Button } from "react-daisyui";
import { FiArrowLeft } from "react-icons/fi";

function CreateAccount() {
  const typeRef = useRef<HTMLSelectElement>(null);
  const currencyRef = useRef<HTMLSelectElement>(null);
  const { state } = useLocation();
  const { token } = useSelector((state: RootState) => state.userData);
  const createAccount = useCreateAccount();

  const handleCreateAccount = async () => {
    if (!(typeRef.current && currencyRef.current)) {
      alert("Type or currency missing");
      return;
    }

    const { value: type } = typeRef.current;
    const { value: currency } = currencyRef.current;

    if (!(type && currency)) {
      alert("Type or currency missing");
      return;
    }

    try {
      const { message } = await createAccount(token, type, currency);
      alert(message);
    } catch (err: any) {
      alert(err.message);
    }
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full h-full text-3xl">
      <div className="flex flex-col justify-center items-center gap-8 p-4">
      <Link to={state} className="absolute top-24 left-8 text-black text-xl sm:text-2xl">
        <FiArrowLeft />
      </Link>
        <p className="text-black">Select account type</p>
        <Select ref={typeRef} defaultValue="" className="p-4 w-32 text-xl bg-transparent">
          <option value="" disabled>--</option>
          <option value="checking" className="bg-white">
            Checking
          </option>
          <option value="savings" className="bg-white">
            Savings
          </option>
        </Select>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 bg-primary p-4">
        <p className="text-white">Select currency</p>
        <Select ref={currencyRef} defaultValue="" className="p-4 w-32 text-xl text-white bg-transparent">
          <option value="" disabled className="bg-gray-300">--</option>
          <option value="BGN" className="bg-primary">
            BGN
          </option>
          <option value="EUR" className="bg-primary">
            EUR
          </option>
          <option value="USD" className="bg-primary">
            USD
          </option>
        </Select>
      </div>
      <div className="absolute left-1/2 top-1/2 sm:top-3/4 transform -translate-x-1/2">
        <Button 
          className="btn btn-success mt-2 text-lg text-white"
          onClick={handleCreateAccount}  
        >
          Create account
        </Button>
      </div>
    </div>
  );
}

export default withNavigation(CreateAccount);
