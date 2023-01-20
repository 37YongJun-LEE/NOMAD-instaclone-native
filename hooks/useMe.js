import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { gql } from "@apollo/client/core";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useQuery } from "@apollo/client/react/hooks";
import { PHOTO_FRAGMENT } from "../fragments";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      photos {
        ...PhotoFragment
      }
    }
  }
  ${PHOTO_FRAGMENT}
`;
////// 현재 파일 useMe를 변경했다.
////// 기존에 photos {...PhotoFragment} 가 없던것을 추가로 작성해주었다.
////// 10월 13일 기준 작성

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