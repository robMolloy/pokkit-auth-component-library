import { Button } from "@workspace/ui/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Link } from "@workspace/ui/custom/Link";
import { SimpleCard } from "@workspace/ui/custom/SimpleCard";
import { AuthMethodsList } from "pocketbase";

export const AuthNavigationForm = (p: {
  authMethodsList: AuthMethodsList;
  onNavigateToOtpSignInClick: () => void;
  onNavigateToOAuth2SignInClick: () => void;
  onNavigateToPasswordSignInClick: () => void;
  onNavigateToOAuth2SignUpClick: () => void;
  onNavigateToPasswordSignUpClick: () => void;
}) => {
  return (
    <SimpleCard
      title="Welcome"
      description="Sign in to your account or create a new one"
      footerChildren={
        <p className="text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      }
    >
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin" className="pt-2">
          <div className="flex flex-col gap-4">
            {p.authMethodsList.otp.enabled && (
              <Button
                className="w-full"
                onClick={() => p.onNavigateToOtpSignInClick()}
              >
                Sign in with OTP
              </Button>
            )}
            {p.authMethodsList.oauth2.enabled && (
              <Button
                className="w-full"
                onClick={() => p.onNavigateToOAuth2SignInClick()}
              >
                Sign in with oAuth2
              </Button>
            )}
            {p.authMethodsList.password.enabled && (
              <Button
                className="w-full"
                onClick={() => p.onNavigateToPasswordSignInClick()}
              >
                Sign in with email and password
              </Button>
            )}
            <Link
              className="text-sm text-muted-foreground"
              href="/auth/request-password-reset"
            >
              Forgot your password?
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="signup" className="pt-2">
          <div className="flex flex-col gap-4">
            {p.authMethodsList.oauth2.enabled && (
              <Button
                className="w-full"
                onClick={async () => p.onNavigateToOAuth2SignUpClick()}
              >
                Sign up with oAuth2
              </Button>
            )}
            {p.authMethodsList.password.enabled && (
              <Button
                className="w-full"
                onClick={() => p.onNavigateToPasswordSignUpClick()}
              >
                Sign up with email and password
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </SimpleCard>
  );
};
