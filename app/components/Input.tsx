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
        className="rounded-md px-4 py-2 bg-neutral-700 text-neutral-300 h-full overflow-hidden"
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
    <div className="w-fit h-fit px-6 py-2 text-sm rounded-full grid place-items-center bg-neutral-200">
      <p className="text-neutral-900 font-medium capitalize">{title}</p>
    </div>
  );
};

type SliderInputProps = {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  min: number;
  max: number;
};

const SliderInput: React.FC<SliderInputProps> = ({
  title,
  onChange,
  value,
  min,
  max,
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

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // if (!e.nativeEvent.data) {
    //   setResults([]);
    //   console.log("cleared");
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // Call the API or perform other expensive operations here

      // const res = await searchLocation(searchTerm);
      // if (res.length < 1)
      //   return setResults([
      //     {
      //       name: "No results found",
      //       region: "",
      //       country: "",
      //       lat: "",
      //       lon: "",
      //     },
      //   ]);
      // console.log(res);
      // setResults(res);
      console.log("Search term:", searchTerm);
      // setIsLoading(false);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
};

export { TagInput, SliderInput, Tag };
