import { AppDispatch } from "./../redux/store";
import { fetch_user } from "./../redux/actions/userActions";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      fetch_user,
    },
    dispatch
  );
};
