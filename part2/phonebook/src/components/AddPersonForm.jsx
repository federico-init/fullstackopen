const AddPersonForm = ({
  onSubmit,
  valueName,
  valueNumber,
  onChangeName,
  onChangeNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input type="text" value={valueName} onChange={onChangeName} />
      </div>
      <div>
        number:
        <input type="text" value={valueNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
