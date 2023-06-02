import { SignIn } from "@clerk/nextjs";

export default function Signup() {
    return (
        <div className="mx-auto w-fit mt-6">
            <SignIn path="/sign-in" signUpUrl="/sign-up" redirectUrl="/" />
        </div>
    )
}