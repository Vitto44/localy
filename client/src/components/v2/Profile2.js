import React from 'react';
import { useDispatch } from 'react-redux';

export default function Profile2({ user }) {
  const user = useSelector((state) => state.user);
  const shops = useSelector((state) => state.shops);
  const dispatch = useDispatch();

  return <div></div>;
}
