
import { Input } from "@/components/ui/input";
import { FormDescription } from "@/components/ui/form";
import { Info } from "lucide-react";

interface GuestInputsProps {
  guestInputs: string[];
  setGuestInputs: (inputs: string[]) => void;
}

const GuestInputs = ({ guestInputs, setGuestInputs }: GuestInputsProps) => {
  if (guestInputs.length === 0) return null;

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-md">
      <h3 className="font-medium text-lg flex items-center gap-2">
        <Info size={18} /> Informations sur vos accompagnants
      </h3>
      {guestInputs.map((value, index) => (
        <div key={index} className="space-y-2">
          <label htmlFor={`guest-${index}`} className="block text-sm font-medium">
            Nom de l'accompagnant {index + 1}
          </label>
          <Input
            id={`guest-${index}`}
            placeholder={`Nom et prénom de l'accompagnant ${index + 1}`}
            onChange={(e) => {
              const newGuestNames = [...guestInputs];
              newGuestNames[index] = e.target.value;
              setGuestInputs(newGuestNames);
            }}
            value={guestInputs[index]}
          />
        </div>
      ))}
    </div>
  );
};

export default GuestInputs;
