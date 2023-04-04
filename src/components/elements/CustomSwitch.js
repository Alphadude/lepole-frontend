const SwitchAlt = ({ onChange, enabled, setEnabled }) => {
  return (
    <label className="inline-flex relative items-center cursor-pointer w-20">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        onChange={onChange}
        readOnly
      />

      <div
        className="w-full h-8 bg-dark-1 rounded-full 
          peer peer-focus:ring-green-300  peer-checked:after:translate-x-12  peer-checked:after:bg-white   peer-checked:bg-[#D9D9D9]
           after:content-[''] after:h-6 after:w-6 after:absolute after:top-1 after:shadow-5xl after:left-[4px] after:bg-white  
            after:rounded-full  after:transition-all "
      >
        <div
          className={`px-[2px] h-full  flex items-center text-sm ${
            enabled ? 'justify-start text-dark-1' : 'justify-end text-white'
          }`}
        >
          <span className="px-1">{enabled ? 'Dark' : 'Light'}</span>
        </div>
      </div>
    </label>
  );
};

export default SwitchAlt;
