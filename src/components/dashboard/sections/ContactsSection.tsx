import { EditSection } from "../EditSection";
import { useNavigate } from "react-router-dom";

export function ContactsSection() {
  const navigate = useNavigate();

  const numberLists = () => {
    navigate("/dashboard/contacts");
  };

  return (
    <EditSection
      title="Contacts"
      description="Gérez les disponibles pour les visiteurs et utilisateurs voulant plus d'informations."
      buttonText="Gérer les contacts"
      onEdit={() => numberLists()}
    />
  );
}
