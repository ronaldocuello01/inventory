// src/app/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productsReducer from "../features/products/productsSlice";
import usersReducer from "../features/users/usersSlice";
import rolesReducer from "../features/roles/rolesSlice";
import categoriesReducer from "../features/categories/categoriesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  users: usersReducer,
  roles: rolesReducer,
  categories: categoriesReducer,
});

export default rootReducer;
