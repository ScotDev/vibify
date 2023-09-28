import { useState, useEffect } from "react";

// const TagInput = ({
//   title,
//   onSelect,
//   placeholder,
// }: {
//   title: string;
//   onSelect: (value: string) => void;
//   placeholder: string;
// }) => {
//   const [selectedVals, setSelectedVals] = useState([] as string[]);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const value = e.currentTarget.value.trim();
//       if (value !== "") {
//         setSelectedVals([...selectedVals, value]);
//         onSelect(value);
//         e.currentTarget.value = "";
//       }
//     }
//   };
//   const handleTagClick = (title: string) => {
//     setSelectedVals(selectedVals.filter((val) => val !== title));
//   };

//   return (
//     <div className="flex flex-col gap-4 w-full py-2">
//       <label htmlFor="textInput" className="capitalize">
//         {title}
//       </label>
//       <input
//         type="text"
//         name="textInput"
//         placeholder={placeholder}
//         onKeyDown={(e) => handleKeyDown(e)}
//         inputMode="text"
//         autoComplete="off"
//       />

//       <div className="flex flex-wrap gap-2 pt-2">
//         {selectedVals.length > 0 &&
//           selectedVals.map((val) => (
//             <Tag key={val} title={val} onClick={() => handleTagClick(val)} />
//           ))}
//       </div>
//     </div>
//   );
// };

const Tag = ({ title, onClick }: { title: string; onClick: () => void }) => {
  return (
    <div
      // className="w-fit h-fit px-4 py-2 text-sm rounded-full grid place-items-center bg-black cursor-pointer"
      className="w-fith-fit px-4 py-2 text-sm rounded-full grid place-items-center bg-black cursor-pointer"
      onClick={onClick}
    >
      <p className="font-medium capitalize truncate w-full">{title}</p>
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
  hasGrade?: boolean;
};

const SliderInput: React.FC<SliderInputProps> = ({
  title,
  onChange,
  value,
  min,
  max,
  step,
  hasGrade,
}) => {
  // const [grade, setGrade] = useState("Average");

  const grade =
    value < max / 3
      ? "Low"
      : value < max / 2
      ? "Average"
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
        className="accent-fuchsia-600 w-full"
        onChange={onChange}
      />
      {hasGrade && (
        <p>
          {value} ({grade})
        </p>
      )}
    </div>
  );
};

const LocalSearchInput = ({
  title,
  endpoint,
  placeholder,
  preselected,
  handleResultSelect,
}: {
  title: string;
  endpoint: string;
  placeholder: string;
  preselected: string[];
  handleResultSelect: (value: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [selectedVals, setSelectedVals] = useState<string[]>(preselected);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

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

  const handleTagClick = (title: string) => {
    setSelectedVals(selectedVals.filter((val) => val !== title));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      // Call the API or perform other expensive operations here
      if (searchTerm.trim().length < 1) return setResults([]);
      const res = await fetch(`${endpoint}?term=${searchTerm.trim()}`);
      const formattedRes = await res.json();
      if (formattedRes.result.length < 1)
        return setResults(["No results found"]);
      setResults(formattedRes.result);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [endpoint, searchTerm]);

  const handleSelect = (value: string) => {
    if (!selectedVals.some((val) => val === value)) {
      handleResultSelect(value);
      setSelectedVals([...selectedVals, value]);
    }
    setSearchTerm("");
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
        value={searchTerm}
        inputMode="text"
        autoComplete="off"
      />
      {results.length > 0 && (
        <ul className="search-results">
          <h5 className="text-xl px-4 py-4">Results</h5>
          {results.length > 0 &&
            results.map((result) => (
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
      <div className="flex flex-wrap gap-2 py-4 absolute top-28 overflow-hidden">
        {selectedVals.length > 0 &&
          selectedVals.map((val) => (
            <Tag key={val} title={val} onClick={() => handleTagClick(val)} />
          ))}
      </div>
    </div>
  );
};

const SpotifySearchInput = ({
  title,
  endpoint,
  placeholder,
  handleResultSelect,
}: {
  title: string;
  endpoint: string;
  placeholder: string;
  handleResultSelect: (value: any) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedVals, setSelectedVals] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleTagClick = (id: any) => {
    setSelectedVals(selectedVals.filter((val) => val.id !== id));
    setSearchTerm("");
  };

  const emptyResults = [
    { name: "No results found", artists: [{ name: "" }], album: { name: "" } },
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length < 1) return setResults([]);
      const res = await fetch(`${endpoint}?term=${searchTerm.trim()}`);
      if (res.status !== 200) {
        return setResults(emptyResults);
      }
      const formattedRes = await res.json();
      if (formattedRes.tracks.length < 1) return setResults(emptyResults);
      setResults(formattedRes.tracks);
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [endpoint, searchTerm]);

  const handleSelect = (value: any) => {
    if (!selectedVals.some((val) => val.id === value.id)) {
      handleResultSelect(value);
      setSelectedVals([...selectedVals, value]);
    }
    setSearchTerm("");
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
        value={searchTerm}
        inputMode="text"
        autoComplete="off"
      />
      {results.length > 0 && (
        <ul className="search-results">
          <h5 className="text-xl px-4 py-4">Results</h5>
          {results.length > 0 &&
            results.map((result) => (
              // <Tag key={result} title={result} />
              <li
                key={result.id}
                onClick={() =>
                  handleSelect({ id: result.id, title: result.name })
                }
                className="flex flex-col gap-1 cursor-pointer bg-black w-full px-4 py-2 hover:bg-neutral-600"
              >
                <p className="capitalize font-medium truncate">{result.name}</p>
                <p className="capitalize text-sm text-neutral-400 truncate">
                  {result.artists[0].name}
                </p>
                <p className="capitalize text-sm text-neutral-400 truncate">
                  {result.album.name}
                </p>
              </li>
            ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 py-4 absolute top-28">
        {selectedVals.length > 0 &&
          selectedVals.map((val) => (
            <Tag
              key={val.id}
              title={val.title}
              onClick={() => handleTagClick(val.id)}
            />
          ))}
      </div>
    </div>
  );
};
export { SliderInput, Tag, LocalSearchInput, SpotifySearchInput };
