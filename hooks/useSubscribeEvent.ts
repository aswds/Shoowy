import { useEffect } from "react";

type SubscriptionFunction = () => () => void;

const useEventSubscription = (
  subscriptionFunction: SubscriptionFunction,
  dependencies: any[]
) => {
  useEffect(() => {
    const unsubscribe = subscriptionFunction();
    return () => {
      unsubscribe();
    };
  }, dependencies);
};

export default useEventSubscription;
