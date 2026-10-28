import { useDispatch, useSelector } from 'react-redux';

/**
 * Pre-typed style wrappers for useDispatch and useSelector
 */
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

