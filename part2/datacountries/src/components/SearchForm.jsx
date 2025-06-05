const SearchForm = ({ onSubmit, value, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="country">
        Search countries:
        <input
          type="text"
          name="country"
          id="country"
          value={value}
          onChange={onChange}
        />
      </label>
    </form>
  );
};

export default SearchForm;
