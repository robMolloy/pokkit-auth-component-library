import { Button } from "@workspace/ui/components/button";
import { TextInput } from "@workspace/ui/custom/CustomInputs";
import { Label } from "@workspace/ui/components/label";
import { useState } from "react";
import {
  FormFeedbackMessages,
  useFormFeedbackMessages,
} from "@workspace/ui/custom/FormFeedbackMessages";
import { signinWithPassword } from "../_pokkit-auth/dbPokkitAuthUtils";
import { PocketBase } from "@/_pokkit-auth/pokkitAuthUtils";

export const SigninWithEmailAndPasswordForm = (p: {
  pb: PocketBase;
  onSignInSuccess?: (messages: string[]) => void;
  onSignInError?: (messages: string[]) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formFeedback = useFormFeedbackMessages();

  return (
    <div className="flex flex-col gap-4">
      {formFeedback.messages && formFeedback.status && (
        <FormFeedbackMessages
          messages={formFeedback.messages}
          status={formFeedback.status}
        />
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isLoading) return;
          setIsLoading(true);

          const resp = await signinWithPassword({
            pb: p.pb,
            data: { email, password },
          });

          const successFn = resp.success ? p.onSignInSuccess : p.onSignInError;
          successFn?.(resp.messages);

          const showMessageFn = resp.success
            ? formFeedback.showSuccess
            : formFeedback.showError;
          showMessageFn(resp.messages);

          setIsLoading(false);
        }}
        className="flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="signin-email-input">Email</Label>
          <TextInput
            id="signin-email-input"
            value={email}
            onInput={setEmail}
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <Label htmlFor="signin-password-input">Password</Label>
          <TextInput
            id="signin-password-input"
            value={password}
            onInput={setPassword}
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};
