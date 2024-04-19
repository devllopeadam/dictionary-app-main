/* eslint-disable react-hooks/exhaustive-deps */
import Header from "./components/Header";
import { Confused, NewWindow, Play, Search } from "./assets";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [error, setError] = useState(false);
  const [noDefinition, setNoDefinition] = useState(false);
  const [inputValue, setInputValue] = useState("good");
  const [data, setData] = useState();

  const [sound, setSound] = useState();
  const [phonetic, setPhonetic] = useState(null);
  const prono = new Audio(sound);

  const playSound = () => {
    if (sound) {
      prono.play();
    } else {
      setSound("without");
      setTimeout(() => {
        setSound(null);
      }, 1000);
    }
  };

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then((data) => data.json())
      .then((final) => {
        setData(final);
      });
  }, []);

  const handleInputValue = async (value) => {
    if (inputValue.trim() === null || inputValue.trim() === "") {
      setError(true);
    } else {
      setError(false);
      try {
        const data = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`
        );
        if (!data.ok) {
          throw Error("no definition found");
        }
        const jsonData = await data.json();
        setData(jsonData);
        setNoDefinition(false);
      } catch (error) {
        setNoDefinition(true);
      }
    }
  };

  const handleChangeData = (value) => {
    setInputValue(value);
    handleInputValue(value);
  };

  useEffect(() => {
    if (data && data[0].phonetics.length > 0) {
      const phoneticData = data[0].phonetics.find((e) => e.audio !== "");
      if (phoneticData) {
        setPhonetic(phoneticData);
        setSound(phoneticData.audio);
      } else {
        setPhonetic(data[0].phonetics[0]);
        setSound(null);
      }
    } else {
      setSound(null);
      setPhonetic("");
    }
  }, [data]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start py-8 md:py-14 bg-white dark:bg-black duration-300">
      <div className="lg:w-[740px] md:w-[90%] w-[93%] max-md:px-2 flex flex-col gap-10">
        <Header />
        <div
          className={`flex justify-between items-center gap-4 rounded-2xl px-4 md:px-5 bg-[#F4F4F4] dark:bg-[#1F1F1F] relative ${
            error
              ? "border-red focus-within:border-red"
              : "border-transparent focus-within:border-purple"
          } border duration-300`}>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            onKeyUp={(e) => e.key === "Enter" && handleInputValue(inputValue)}
            className="border-none bg-transparent outline-none h-full py-[15px] text-[20px] font-extrabold flex-1 w-[80%] text-info"
          />
          <Search
            className={"cursor-pointer min-w-[20px]"}
            onClick={() => handleInputValue(inputValue)}
          />
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[14px] text-red absolute -bottom-[30px] left-0 font-bold">
              {`Can't be empty`}
            </motion.div>
          )}
        </div>
        {!noDefinition ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="flex flex-col gap-10">
            <div className="flex justify-between items-center mt-1">
              <div className="flex flex-col gap-2 md:gap-3">
                <h1 className="font-extrabold text-[40px] md:text-[60px] text-gray-500 dark:text-white">
                  {data && data[0].word}
                </h1>
                <p className="text-purple text-xl font-medium">
                  {phonetic ? phonetic.text : ""}
                </p>
              </div>
              <div className="group flex items-center justify-center w-[50px] h-[50px] md:w-[80px] md:h-[80px] bg-purple/30 rounded-full hover:bg-purple cursor-pointer duration-300 relative">
                <Play
                  onClick={playSound}
                  className={
                    "md:w-6 md:h-6 h-5 w-5 text-purple group-hover:text-white duration-300"
                  }
                />
                {sound === "without" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="px-3 py-[6px] bg-gray-500 dark:bg-white text-white dark:text-black text-[12.5px] flex items-center justify-center rounded-md text-nowrap absolute w-[105px] -top-[40px] max-md:right-[-10px]">
                    Without Sound
                  </motion.div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {data &&
                data[0].meanings.map((meaning, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col">
                      <div className="flex flex-col mb-6">
                        <h2 className="flex gap-3 text-[23px] font-bold italic items-center text-info">
                          {meaning.partOfSpeech}
                          <span className="flex-1 h-[0.5px] w-full bg-gray-200 dark:bg-gray-500 duration-300"></span>
                        </h2>
                      </div>
                      <div className="flex flex-col gap-7">
                        <p className="text-gray-300 text-[20px]">Meaning</p>
                        <ul className="flex flex-col gap-4 list-disc marker:text-purple ml-10">
                          {meaning.definitions.map((definition) => {
                            return (
                              <div key={definition.definition}>
                                <li className="text-[18px] text-info">
                                  {definition.definition}
                                </li>
                                <blockquote className="text-gray-300 text-[18px] mt-1">
                                  {definition.example &&
                                    `“${definition.example}”`}
                                </blockquote>
                              </div>
                            );
                          })}
                        </ul>

                        {meaning.synonyms.length > 0 && (
                          <div className="flex gap-5 items-start h-min w-full">
                            <p className="text-gray-300 text-[20px]">
                              Synonyms
                            </p>
                            <ul className="flex gap-4 flex-wrap">
                              {meaning.synonyms.map((synonym) => {
                                return (
                                  <li
                                    className="text-[19px] text-purple font-bold cursor-pointer border-b border-transparent hover:border-purple"
                                    onClick={() => {
                                      handleChangeData(synonym);
                                    }}
                                    key={synonym}>
                                    {synonym}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex gap-5 border-t border-t-gray-200 dark:border-t-gray-500 pt-4">
              <p className="text-gray-300 text-[13px]">Source</p>
              <a
                href={data && data[0].sourceUrls[0]}
                className="text-gray-300 text-[13px] underline cursor-pointer flex items-center gap-2">
                {data && data[0].sourceUrls[0]}
                <img src={NewWindow} />
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center items-center flex-col gap-6 mt-16 text-center">
            <img src={Confused} />
            <p className="text-info text-xl font-bold">No definitions found</p>
            <p className="text-gray-300 font-medium text-[17px]">
              {`Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
