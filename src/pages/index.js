import { useEffect, useReducer } from "react";
import styles from "../styles/Home.module.css";
const reducer = (state, action) => {
  switch (action.type) {
    case "setText":
      return { ...state, text: action.payload };
    case "add":
      return {
        ...state,
        products: [
          ...state.products,
          { id: crypto.randomUUID(), name: state.text },
        ],
        text:""
      };
    case "remove":
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
function Home() {
  const [state, dispatch] = useReducer(reducer, { products: [], text: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.text) return;
    dispatch({ type: "add" });
  };
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Alışveriş Listesi</h2>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3 className="content-title">Alınacaklar</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={state.text}
              onChange={(e) =>
                dispatch({ type: "setText", payload: e.target.value })
              }
              placeholder="Yeni bir madde ekleyin"
            />
            <button>Add</button>
          </form>
        </div>
        <div className={styles.products}>
          {state.products.map((item) => (
            <div className={styles.item}>
              <p>{item.name}</p>
              <button
                onClick={() => dispatch({ type: "remove", payload: item.id })}
                className={styles.btn}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
