import { Button } from "@workspace/ui/components/button";
import { TextInput } from "@workspace/ui/custom/CustomInputs";
import { Label } from "@workspace/ui/components/label";
import { useState } from "react";
import {
  requestSigninWithOtp,
  signinWithOtp,
} from "../_pokkit-auth/dbPokkitAuthUtils";
import {
  FormFeedbackMessages,
  useFormFeedbackMessages,
} from "@workspace/ui/custom/FormFeedbackMessages";
import { PocketBase } from "@/_pokkit-auth/pokkitAuthUtils";

export const SignInWithOtpForm = (p: { pb: PocketBase }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState("");

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
        className="flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (isLoading) return;
          setIsLoading(true);

          const resp = await requestSigninWithOtp({ pb: p.pb, email });

          setOtpId(resp.success ? resp.data.otpId : "");
          if (resp.success) formFeedback.clear();
          if (!resp.success) formFeedback.showError(resp.messages);

          setIsLoading(false);
        }}
      >
        <div>
          <Label htmlFor="signinWithOtp-email-input">Email</Label>
          <TextInput
            id="signinWithOtp-email-input"
            value={email}
            onInput={setEmail}
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          Request {otpId && "new"} OTP
        </Button>
      </form>

      {otpId && (
        <form
          className="flex flex-col gap-4"
          onClick={async (e) => {
            e.preventDefault();
            if (isLoading) return;
            setIsLoading(true);

            const resp = await signinWithOtp({
              pb: p.pb,
              data: { otpId, otp },
            });

            const fn = resp.success
              ? formFeedback.showSuccess
              : formFeedback.showError;
            fn(resp.messages);

            setIsLoading(false);
          }}
        >
          <div>
            <Label htmlFor="signinWithOtp-otp-input">OTP</Label>
            <TextInput
              id="signinWithOtp-otp-input"
              value={otp}
              onInput={setOtp}
              onClick={(e) => e.stopPropagation()}
              name="otp"
              placeholder="Enter your OTP"
              disabled={isLoading || !otpId}
              required
              autoFocus
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !otpId}
          >
            Submit OTP
          </Button>
        </form>
      )}
    </div>
  );
};
