import { EditPagesProvider } from "@/contexts/EditPagesContext";
import EditPageIndex from "./EditPageIndex";

export default function EditPages() {
  return (
    <EditPagesProvider>
      <EditPageIndex />
    </EditPagesProvider>
  );
}
