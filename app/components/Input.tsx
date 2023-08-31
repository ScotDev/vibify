import { useState, useEffect } from "react";

const TagInput = ({
  title,
  onSelect,
  placeholder,
}: {
  title: string;
  onSelect: (value: string) => void;
  placeholder: string;
}) => {
  const [selectedVals, setSelectedVals] = useState([] as string[]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value !== "") {
        setSelectedVals([...selectedVals, value]);
        onSelect(value);
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full py-2">
      <label htmlFor="textInput" className="capitalize">
        {title}
      </label>
      <input
        type="text"
        name="textInput"
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e)}
        inputMode="text"
        autoComplete="off"
      />

      <div className="flex flex-wrap gap-2 pt-2">
        {selectedVals.length > 0 &&
          selectedVals.map((val) => <Tag key={val} title={val} />)}
      </div>
    </div>
  );
};

const Tag = ({ title }: { title: string }) => {
  return (
    <div className="w-fit h-fit px-4 py-2 text-sm rounded-full grid place-items-center bg-black">
      <p className="font-medium capitalize">{title}</p>
    </div>
  );
};

type SliderInputProps = {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  min: number;
  max: number;
  step?: number;
};

const SliderInput: React.FC<SliderInputProps> = ({
  title,
  onChange,
  value,
  min,
  max,
  step,
}) => {
  // const [grade, setGrade] = useState("Average");

  const grade =
    value < max / 3
      ? "Low"
      : value < max / 2
      ? "Normal"
      : value < max - max / 3
      ? "High"
      : "Very High";
  return (
    <div className="flex flex-col gap-4 w-96 py-2">
      <label htmlFor="slider">{title}</label>
      <input
        type="range"
        name="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        className="accent-orange-600 w-full"
        onChange={onChange}
      />
      <p>
        {value} ({grade})
      </p>
    </div>
  );
};

const SearchInput = ({
  title,
  endpoint,
  placeholder,
  handleResultSelect,
}: {
  title: string;
  endpoint: string;
  placeholder: string;
  handleResultSelect: (value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [selectedVals, setSelectedVals] = useState<string[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.trim());

    // if (!e.nativeEvent.data) {
    //   setResults([]);
    //   console.log("cleared");
    //   setIsLoading(false);
    // }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // const value = e.currentTarget.value.trim();
      // if (value !== "") {
      //   // setSelectedVals([...selectedVals, value]);
      //   // onSelect(value);
      //   e.currentTarget.value = "";
      // }
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // Call the API or perform other expensive operations here
      if (searchTerm.length < 1) return setResults([]);
      const res = await fetch(`${endpoint}?term=${searchTerm}`);
      const formattedRes = await res.json();
      if (formattedRes.result.length < 1)
        return setResults(["No results found"]);
      console.log("res", formattedRes.result[0]);
      setResults(formattedRes.result);
      console.log("Search term:", searchTerm);
      // setIsLoading(false);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [endpoint, searchTerm]);

  const handleSelect = (value: string) => {
    handleResultSelect(value);
    setSelectedVals([...selectedVals, value]);
    setResults([]);
  };

  return (
    <div className="flex flex-col w-full py-2">
      <label htmlFor="textInput" className="capitalize">
        {title}
      </label>
      <input
        className="mt-4"
        type="search"
        name="textInput"
        placeholder={placeholder}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={handleInputChange}
        inputMode="text"
        autoComplete="off"
      />
      {results.length > 0 && (
        <ul className="flex flex-col z-20 overflow-y-scroll bg-black border-solid border-t-0 border-2 border-neutral-700 static w-full">
          <h5 className="text-xl px-4 py-4">Results</h5>
          {results.length > 0 &&
            results.map((result) => (
              // <Tag key={result} title={result} />
              <li
                key={result}
                onClick={() => handleSelect(result)}
                className="flex cursor-pointer bg-black w-full px-4 py-2 hover:bg-neutral-600"
              >
                <p className="capitalize text-sm">{result}</p>
              </li>
            ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 py-4 absolute top-28">
        {selectedVals.length > 0 &&
          selectedVals.map((val) => <Tag key={val} title={val} />)}
      </div>
    </div>
  );
};

export { TagInput, SliderInput, Tag, SearchInput };
