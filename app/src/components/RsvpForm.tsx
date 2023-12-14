import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form"
function formatPhoneNumber(phoneNumber:string) {
  // Remove any non-digit characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned number has 10 digits
  if (cleanedNumber.length === 10) {
    // Format the phone number as (XXX) XXX-XXXX
    const formattedNumber =
      '(' + cleanedNumber.substring(0, 3) + ') ' +
      cleanedNumber.substring(3, 6) + '-' +
      cleanedNumber.substring(6, 10);

    return formattedNumber;
  } else {
    // If the phone number doesn't have 10 digits, return the original input
    return phoneNumber;
  }
}
const InviteDetails = ({ inviteData }: any) => {
  return (
<div className="lg:col-start-3 lg:row-end-1">
      <div className="rounded-lg pb-4 bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">Invite Details</dt>
            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">{inviteData.first_name} {inviteData.last_name}</dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            {inviteData.accepted !== undefined && inviteData.accepted !== null && 
            <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Accepted
            </dd>
            }
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dd className="flex flex-row gap-2 text-sm leading-6 text-gray-700">
              <span>Contact:</span>
              <div className="flex flex-col">
              <span>{formatPhoneNumber(String(inviteData?.phone_number))}</span>
              <span>{inviteData?.email}</span>
              </div>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dd className="text-sm leading-6 text-gray-700">
              <span>Allowed Guests: </span>
              <span>{inviteData.guest_count}</span>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dd className="text-sm flex flex-col overflow-clip leading-6 text-black">
              <div className="flex flex-row justify-between">
                <span className="font-semibold">Invite Id</span>
                <button
                  type="button"
                  className="active:bg-slate-200 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={()=>navigator.clipboard.writeText(inviteData.invite_id)}
                >
                Copy Invite Id
                </button>
              </div>
              <span className="w-auto mx-0 whitespace-nowrap overflow-clip text-ellipsis" title={inviteData.invite_id}>{inviteData.invite_id}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>


  )
}
export const RsvpForm = ({ inviteData, guestData }: any) => {
  const createRsvp = async (createData: any) => {
  try{

    await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/rsvp/create`, {
      method: 'POST',
      body: JSON.stringify(createData),
    })
  } catch (e) {
    console.log(e)
  }
  }
  const updateRsvp = async (updateData: any) => {
    console.log(import.meta.env)
  const res = await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/rsvp/update`, {
    method: 'POST',
    body: JSON.stringify(updateData),
  })
  }
  const deleteRsvp = async (deleteData: any) => {
  await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/rsvp/delete`, {
    method: 'POST',
    body: JSON.stringify(deleteData),
  })
  }
  const {handleSubmit, control, register} = useForm({
    defaultValues: {
      invite: inviteData,
      rsvps: guestData
    }
  })
  const {fields, append, remove} = useFieldArray({
    control,
    name: "rsvps",
  });
  const onSubmit = async (data: any, e) => {
    e.preventDefault();
    const createRsvps = data.rsvps.filter((v)=> v?.rsvp_id === undefined);
    const existingIds = guestData.map(v => v.rsvp_id);
    const deleteRsvps = guestData.filter(v => !(data.rsvps.filter(v=>v?.rsvp_id !== undefined).map(v=>v.rsvp_id).includes(v?.rsvp_id)));
    const updateRsvps = data.rsvps.filter((v)=>existingIds.includes(v?.rsvp_id));
    console.log({data});
    console.log({guestData});
    console.log({existingIds});
    console.log({guestData});
    console.log({updateRsvps});
    console.log({deleteRsvps});
    const createData = {
      invite_id: inviteData.invite_id,
      attending: 'Yes',
      rsvps: createRsvps
    }
    const updateData = {
      invite_id: inviteData.invite_id,
      attending: 'Yes',
      rsvps: updateRsvps
    }
    const deleteData = deleteRsvps.map(v => v?.rsvp_id)
    console.log({deleteData})
    await createRsvp(createData)
    await updateRsvp(updateData)
    await deleteRsvp(deleteData)

  }
  useEffect(() => {
    if(fields.length === 0 || fields.findIndex(
      (field) => field.first_name === inviteData.first_name && field.last_name === inviteData.last_name
      ) === -1) {
      append({ first_name: inviteData.first_name, last_name: inviteData.last_name ,dietary_restrictions: ""});
    }
  }, [fields])
  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
       <div className="space-y-12 p-3">
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <InviteDetails inviteData={inviteData}/>
<button
              className="w-full flex justify-center disabled:bg-gray-400 items-center gap-x-2 rounded-md active:bg-green-700 bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <svg className="-ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true"
height="16" width="14" viewBox="0 0 448 512">
  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
  </svg>
                Save RSVP
              </button>
          </div>
          <div className="grid w-auto mx-0 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 h-fit sm:grid-cols-1 md:col-span-2">
            <h3 className="col-span-full h-fit text-3xl">RSVP</h3>
            <div className="col-span-full flex flex-col gap-4">
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <div className="flex flex-col gap-1">
                    <span>First Name</span>
                    <input className="max-w-fit text-black" {...register(`rsvps.${index}.first_name`)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                    <span>Last Name</span>
                    <input className="max-w-fit text-black" {...register(`rsvps.${index}.last_name`)}/>
                    </div>
                    <div className="flex flex-col gap-1">
                    <span>Dietary Restrictions</span>
                    <textarea className="max-w-sm min-h-[40px] text-black" {...register(`rsvps.${index}.dietary_restrictions`)}/>
                    </div>
                    <button type="button" onClick={()=> remove(index)}>Remove</button>
                  </div>
                )
              })}
              <button
              disabled={fields.length > inviteData.guest_count}
              onClick={() => {
                if (fields.length <= inviteData.guest_count) {
                  append({ first_name: "", last_name: "" ,dietary_restrictions: ""});
                }
              }}
              type="button"
              className="w-32 inline-flex disabled:bg-gray-400 items-center gap-x-2 rounded-md active:bg-green-700 bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <svg className="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Add Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}