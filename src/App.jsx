import { useCallback, useState, useEffect, useRef  } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);

  const passwordRef = useRef(null)

  const cachedPassword = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMmnbvcxzlkjhgfdsapoiuytrewq";

    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += '~`!@#$%^&*()-+{}[]"?><';

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [setPassword, length, isNumberAllowed, isCharacterAllowed]);

  const copyToClipBoard = useCallback(() => {
    passwordRef?.current.select()
    passwordRef?.current.setSelectionRange(0, 8)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    cachedPassword()
  }, [length, isNumberAllowed, isCharacterAllowed, cachedPassword])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700 text-orange-500">
      <h1 className="text-center text-white my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyToClipBoard} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            value={length}
            type="range"
            min={8}
            max={16}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="numberInput"
            defaultChecked={isNumberAllowed}
            onChange={() => {
              setIsNumberAllowed((prevNum) => !prevNum);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="characterInput"
            defaultChecked={isCharacterAllowed}
            onChange={() => {
              setIsCharacterAllowed((prevCharacter) => !prevCharacter);
            }}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  );
};

export default App;
