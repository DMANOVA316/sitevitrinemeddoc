const SelectCommune:React.FC<SelectCommuneProps> = ({ communes, disabled }) => {
    return (
        <select
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!disabled}
        >
            <option value="">-- Sélectionner une commune --</option>
            {communes.map((commune) => (
                <option key={commune["@id"]} value={commune["@id"]}>
                    {commune.name}
                </option>
            ))}
        </select>
    );
};

export default SelectCommune;
