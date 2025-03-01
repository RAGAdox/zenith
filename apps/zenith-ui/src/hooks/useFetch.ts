import { useAuth } from "@clerk/clerk-react";
import * as _ from "lodash";
import { useEffect } from "react";
import { createWithEqualityFn } from "zustand/traditional";
import urls, { TypeOfUrls } from "../utils/api";

type ExecuteArgs = {
  requestData?: any;
  force?: boolean;
};
interface UseFetchOptions {
  requestData?: any;
  method: "GET" | "POST" | "PUT" | "DELETE";
  isProtectedApi?: boolean;
  executeOnMount?: boolean;
  revalidate?: number;
  localCache?: boolean;
  onSuccessCallback?: (data?: any) => void;
}

export type I_DATA = {
  isLoaded: boolean;
  isError: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  data: any;
  error: any;
  createdAt?: Date;
  lastUpdatedAt?: Date;
};

export type I_FETCH_DATA = {
  [key in TypeOfUrls]: I_DATA;
};

export const FETCH_DATA = createWithEqualityFn<I_FETCH_DATA>(() => {
  const initData: I_FETCH_DATA = {} as I_FETCH_DATA;
  Object.keys(urls).forEach((key) => {
    initData[key as TypeOfUrls] = {
      isLoaded: false,
      isFetching: false,
      isError: false,
      isSuccess: false,
      data: undefined,
      error: undefined,
      createdAt: undefined,
      lastUpdatedAt: undefined,
    };
  });

  return initData;
}, _.isEqual);

const start = (key: TypeOfUrls) =>
  FETCH_DATA.setState((state: I_FETCH_DATA): I_FETCH_DATA => {
    return {
      ...state,
      [key]: {
        ...state[key],
        isFetching: true,
        createdAt: state[key].createdAt || new Date(),
      },
    };
  });

const setData = (key: TypeOfUrls, data: any) =>
  FETCH_DATA.setState((state: I_FETCH_DATA): I_FETCH_DATA => {
    return {
      ...state,
      [key]: {
        ...state[key],
        isLoaded: true,
        isFetching: false,
        isSuccess: true,
        isError: false,
        data,
        error: undefined,
        lastUpdatedAt: new Date(),
      },
    };
  });

const setError = (key: TypeOfUrls, error: any) =>
  FETCH_DATA.setState((state: I_FETCH_DATA): I_FETCH_DATA => {
    return {
      ...state,
      [key]: {
        ...state[key],
        isLoaded: true,
        isSuccess: false,
        isError: true,
        isFetching: false,
        data: undefined,
        error,
        lastUpdatedAt: new Date(),
      },
    };
  });

const useFetch = (
  urlKey: TypeOfUrls,
  {
    requestData,
    method = "GET",
    isProtectedApi = true,
    executeOnMount = true,
    revalidate = 3600,
    localCache = true,
    onSuccessCallback = () => {},
  }: UseFetchOptions
): {
  execute: (value: ExecuteArgs) => Promise<void>;
  store: I_DATA;
} & I_DATA => {
  const url = urls[urlKey];
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const lastUpdatedAt = FETCH_DATA((state) => state[urlKey].lastUpdatedAt);

  const execute = async ({ requestData, force = false }: ExecuteArgs) => {
    const shouldRevalidate =
      (!lastUpdatedAt ||
        new Date().getTime() - lastUpdatedAt.getTime() > revalidate * 1000) &&
      localCache;
    const shouldExecute =
      !isProtectedApi || (isProtectedApi && isLoaded && isSignedIn);
    try {
      if ((shouldExecute && shouldRevalidate) || force) {
        start(urlKey);

        const response = await fetch(url, {
          body: JSON.stringify(requestData),
          method,
          headers: {
            ...(isProtectedApi && isSignedIn
              ? { Authorization: `Bearer ${await getToken()}` }
              : {}),
          },
        });
        if (!response.ok) {
          setError(urlKey, response.statusText || "Unknow Error Occured");
        }
        const data = await response.json();
        if (data.success) {
          setData(urlKey, data.result);
          onSuccessCallback(data.result);
        } else {
          setError(urlKey, data.error || "Unknown Error Occured");
        }
      } else if (!shouldExecute) {
        setError(
          urlKey,
          "You are not signed in or this api requires authentication"
        );
      }
    } catch (error: any) {
      setError(urlKey, error.message || "Something went wrong");
      return error;
    }
  };

  useEffect(() => {
    if (executeOnMount && isLoaded) {
      execute({ requestData });
    }
  }, [isLoaded]);

  return {
    execute,
    store: FETCH_DATA((state) => state[urlKey]),
    isLoaded: FETCH_DATA((state) => state[urlKey].isLoaded),
    isFetching: FETCH_DATA((state) => state[urlKey].isFetching),
    isSuccess: FETCH_DATA((state) => state[urlKey].isSuccess),
    isError: FETCH_DATA((state) => state[urlKey].isError),
    data: FETCH_DATA((state) => state[urlKey].data),
    error: FETCH_DATA((state) => state[urlKey].error),
  };
};

export default useFetch;
