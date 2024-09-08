
import { useState } from "react";
import ToyForm from "../../Components/ToyFrom/ToyForm";
import { IToy } from "../../types/School";

interface MyComponentProps {
  title: string;
  toy: IToy;
  setToy: React.Dispatch<React.SetStateAction<IToy | undefined>>
}

const AddToy: React.FC<MyComponentProps> = () => {
  const [toy, setToy] = useState<IToy>();
  return (
    <ToyForm title="Add Toy" toy={toy} setToy={setToy} />
  )
};

export default AddToy;
