import { signInAction } from "@/app/actions";
import { SignInFrom } from "@/components/FormComponents";
import GoogleSSO from "@/components/GoogleSSO";

export default async function Login(props: { searchParams: Promise<any> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="card max-w-sm w-full bg-base-100 m-4 p-4 prose">
      <SignInFrom signInAction={signInAction} />
      <div className=" divider" />
      <GoogleSSO />
    </div>
  );
}
