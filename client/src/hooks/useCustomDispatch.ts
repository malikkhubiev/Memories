import { setIsLoading } from "../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../fullStore/hooks";

// dispatch mutations with calling setIsLoading and handling
const useCustomDispatch = () => {
  const dispatch = useAppDispatch();

  const caller = (
    something: any,
    resolveCallback?: any,
    rejectCallback?: any,
  ) => {
    dispatch(setIsLoading(true));
    let dispatchResult = dispatch(something);
    if (dispatchResult.unwrap) dispatchResult = dispatchResult.unwrap();
    dispatchResult.then &&
      dispatchResult.then((result: any) => {
        resolveCallback && resolveCallback(result);
      });
    dispatchResult.catch &&
      dispatchResult.catch((e: ErrorEvent) => {
        rejectCallback && rejectCallback(e);
      });
    dispatch(setIsLoading(false));
  };

  return caller;
};

export default useCustomDispatch;
