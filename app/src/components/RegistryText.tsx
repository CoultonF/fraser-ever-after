import { useInviteState } from "./InviteState.tsx";
import { useApiData } from "./RsvpForm.tsx";

const getInvite = async (invite:string | null) => {
  if (!invite) {
    return null;
  }
  const res = await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/invite/${invite}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};


function RegistryText({invite}: any) {

  const {data, isSuccess, isLoading} = useApiData(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/invite/${useInviteState()}`)

  return (
      <div className="max-w-prose mx-auto bg-white p-5 px-10 mt-5 rounded-md drop-shadow-md">
        <p className="pb-2">{`Dear ${isSuccess && !isLoading ? data.at(0).first_name : invite?.first_name !== undefined ? invite?.first_name : 'Guests'} & Party`},</p>
        <p className="indent-8">
          Thank you for considering a gift to help us celebrate our wedding! We are so grateful for your love and
          support. If you would like to give a gift, we have a registry below. Our preference is for cash as we are
          saving for a house down payment, but we appreciate any gift you choose to give.
        </p>
        <br />
        <p>With love,</p>
        <p>Stephanie and Coulton</p>
      </div>
  );
}
 export {RegistryText}