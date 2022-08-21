// css
import styles from "./Advices.module.css";
// hooks
import { useState, useEffect, useRef } from "react";

const Advices = () => {
  // Advice Data
  const [adviceData, setAdviceData] = useState("");

  const [uploadAdvice, setUploadAdvice] = useState(0);

  //  Advice URL
  const adviceURL = `https://api.adviceslip.com/advice`;

  const shouldGiveAdvice = useRef(true);

  // Advice Fetch
  useEffect(() => {
    if (uploadAdvice != 0) {
      const getAdvice = async () => {
        if (shouldGiveAdvice.current) {
          shouldGiveAdvice.current = false;
          const res = await fetch(adviceURL)
            .then((res) => res.json())
            .catch((err) => err);
          setAdviceData(res);
          shouldGiveAdvice.current = true;
        }
      };
      getAdvice();
    }
  }, [uploadAdvice]);

  return (
    <>
      {/* Advice Rendering */}
      <div id={styles.advice_wrapper}>
        <h2>Peça um conselho e sinta-se melhor!</h2>
        <p>{adviceData && adviceData.slip.advice}</p>
        <button
          onClick={() => {
            setUploadAdvice((prevState) => prevState + 1);
          }}
        >
          Preciso de um Conselho
        </button>
      </div>
    </>
  );
};

export default Advices;
