import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { gql } from "@apollo/client/core";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useQuery } from "@apollo/client/react/hooks";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

export default function useMe() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}