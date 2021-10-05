import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usuarioReducer from "./usuarioReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, usuarioReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
