import { memo } from "react";
import { useRouter } from "next/router";
import { Loader } from "../Loader/Loader";
import { useUser } from "lib/utils/hooks";

type AuthCheckerProps = {
  readonly children: React.ReactNode;
};

export const AuthChecker = memo<AuthCheckerProps>(({ children }) => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    if (typeof window !== "undefined") {
      router.replace("/login");
    }
    return <Loader />;
  }

  return <>{children}</>;
});

AuthChecker.displayName = "AuthChecker";
