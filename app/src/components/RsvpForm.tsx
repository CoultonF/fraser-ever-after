import { classNames } from '@/functions/classNames.ts';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext, useWatch } from 'react-hook-form';
import { ComboBox } from '@/components/ComboBox.tsx';
import toast, { Toaster } from 'react-hot-toast';

function useApiData<T>(
  url: string,
  initialData: T | null = null,
): {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  refetchData: () => void;
  refetchDataAsync: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await response.json();
      setData(jsonData);
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = () => {
    setIsSuccess(false);
    setIsLoading(true);
    fetchData();
  };

  const refetchDataAsync = async () => {
    setIsSuccess(false);
    setIsLoading(true);
    await fetchData();
  };

  return {
    data: data,
    isLoading: isLoading,
    isSuccess: isSuccess,
    refetchData: refetchData,
    refetchDataAsync: refetchDataAsync,
  };
}

function formatPhoneNumber(phoneNumber: string) {
  // Remove any non-digit characters from the phone number
  const cleanedNumber = phoneNumber.replace(/\D/g, '');

  // Check if the cleaned number has 10 digits
  if (cleanedNumber.length === 10) {
    // Format the phone number as (XXX) XXX-XXXX
    const formattedNumber =
      '(' + cleanedNumber.substring(0, 3) + ') ' + cleanedNumber.substring(3, 6) + '-' + cleanedNumber.substring(6, 10);

    return formattedNumber;
  } else {
    return phoneNumber;
  }
}
const InviteDetails = ({ inviteData }: any) => {
  const { control, register } = useFormContext();
  const invites = useWatch({ control, name: 'rsvps' });
  const remainingInvites = inviteData?.guest_count - invites.length + 1;
  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <div className="rounded-lg pb-4 bg-white ring-1 lg:ml-5 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">Invite Details</dt>
            <dd className="mt-1 text-base font-semibold pr-1 leading-6 text-gray-900 whitespace-pre-line">
              {(invites ?? [])
                .map((v, index) => {
                  if (index === invites.length - 1) {
                    return v?.first_name;
                  } else if (index === invites.length - 2) {
                    return v?.first_name + ' &\n';
                  } else {
                    return v?.first_name + ',\n';
                  }
                })
                .join('')}
            </dd>
            {remainingInvites > 0 && (
              <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">+ {remainingInvites} more</dd>
            )}
          </div>
          <div className="flex w-auto mx-0 gap-x-2 items-center px-6 pt-4">
            <label htmlFor="attending">Attending:</label>
            <select
              className="block w-32 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={undefined}
              {...register('invite.attending', { required: true })}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {/* {inviteData?.attending !== undefined && inviteData?.attending !== null && ( */}
            {/* <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Attending
            </dd> */}
            {/* )} */}
          </div>
        </dl>
      </div>
    </div>
  );
};
export const RsvpForm = ({ inviteData, guestData }: any) => {
  const {
    data: rsvpApiData,
    isSuccess: rsvpSuccess,
    refetchDataAsync: refetchAsyncRsvp,
  } = useApiData(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/rsvp/${inviteData.invite_id}`, guestData);
  const {
    data: inviteApiData,
    isSuccess: inviteSuccess,
    refetchDataAsync: refetchAsyncInvite,
  } = useApiData(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/invite/${inviteData.invite_id}`, inviteData);
  const notify = () =>
    toast.custom(t => (
      <div className="rounded-md bg-green-50 p-4 absolute">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">Successfully saved</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={() => toast.remove(t.id)}
                type="button"
                className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  const createRsvp = async (createData: any) => {
    try {
      await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/rsvp/create`, {
        method: 'POST',
        body: JSON.stringify(createData),
      });
    } catch (e) {}
  };
  const updateRsvp = async (updateData: any) => {
    await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/rsvp/update`, {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
  };
  const deleteRsvp = async (deleteData: any) => {
    await fetch(`${import.meta.env.PUBLIC_API_ENDPOINT}/api/rsvp/delete`, {
      method: 'POST',
      body: JSON.stringify(deleteData),
    });
  };
  const methods = useForm({
    defaultValues: {
      invite: inviteApiData,
      rsvps: rsvpApiData,
    },
    criteriaMode: 'all',
  });
  const {
    handleSubmit,
    control,
    register,
    formState: { isDirty, isSubmitSuccessful, submitCount },
    reset,
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rsvps',
  });
  const [saving, setSaving] = useState('Save');
  const onSubmit = async (data: any, e) => {
    e.preventDefault();
    setSaving('Saving...');
    const createRsvps = data.rsvps.filter(v => v?.rsvp_id === undefined);
    const existingIds = rsvpApiData.map(v => v.rsvp_id);
    const deleteRsvps = rsvpApiData.filter(
      v =>
        !data.rsvps
          .filter(v => v?.rsvp_id !== undefined)
          .map(v => v.rsvp_id)
          .includes(v?.rsvp_id),
    );
    const updateRsvps = data.rsvps
      .filter(v => existingIds.includes(v?.rsvp_id))
      .map(v => ({ ...v, main_dish: v?.main_dish ?? '' }));
    const createData = {
      invite_id: inviteData.invite_id,
      attending: 'Yes',
      rsvps: createRsvps,
    };
    const updateData = {
      invite_id: inviteData.invite_id,
      attending: data.invite.attending,
      rsvps: updateRsvps,
    };
    const deleteData = deleteRsvps.map(v => v?.rsvp_id);
    try {
      console.log({ createData, updateData, deleteData });
      await deleteRsvp(deleteData);
      await updateRsvp(updateData);
      await createRsvp(createData);
      setSaving('Saved');
      await refetchAsyncInvite();
      await refetchAsyncRsvp();
      notify();
    } catch (e) {
      // toast.error('ERROR: Unable to save.');
    }
  };
  useEffect(() => {
    if (
      fields.length === 0 ||
      fields.findIndex(
        field => field.first_name === inviteData.first_name && field.last_name === inviteData.last_name,
      ) === -1
    ) {
      append({
        first_name: inviteData.first_name,
        last_name: inviteData.last_name,
        dietary_restrictions: '',
        main_dish: '',
      });
    }
  }, [fields]);
  useEffect(() => {
    if (isSubmitSuccessful && inviteSuccess && rsvpSuccess) {
      reset({ invite: inviteApiData, rsvps: rsvpApiData });
    }
  }, [isSubmitSuccessful, rsvpSuccess, inviteSuccess]);

  useEffect(() => {
    if (isDirty) {
      setSaving('Save');
    }
  }, [isDirty]);

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        <div className="space-y-12 w-full">
          <div className="flex flex-col sm:flex-row gap-x-10 gap-y-4 max-w-[1500px] mx-auto">
            <div className="flex flex-col flex-1 gap-4 min-w-min">
              <InviteDetails inviteData={inviteData} />
            </div>
            <div className="flex flex-col flex-grow gap-x-6 gap-y-2 h-fit w-full md:max-w-xl xl:max-w-3xl sm:grid-cols-1 md:col-span-2">
              <h3 className="col-span-full h-fit text-xl mx-auto sm:ml-5">Your Guest List</h3>
              <div className="col-span-full flex flex-col gap-4 w-min-fit">
                {fields.map((field, index) => {
                  return (
                    <div key={index} className=" bg-white  rounded-lg ">
                      <div className="flex flex-col gap-2 px-4 py-5 sm:p-6">
                        <div className="flex flex-col gap-1 w-52">
                          <span>First Name</span>
                          <input
                            disabled={index === 0}
                            className={classNames(
                              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                              index === 0 && 'bg-gray-50 text-slate-700 border-gray-400',
                            )}
                            {...register(`rsvps.${index}.first_name`, { required: true, minLength: 1 })}
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-52">
                          <span>Last Name</span>
                          <input
                            disabled={index === 0}
                            className={classNames(
                              'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
                              index === 0 && 'bg-gray-50 text-slate-700 border-gray-400',
                            )}
                            {...register(`rsvps.${index}.last_name`, { required: true, minLength: 1 })}
                          />
                        </div>
                        <div className="flex flex-col gap-1 w-64">
                          <label htmlFor="Main Dish" className="">
                            Main Dish
                          </label>
                          <select
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register(`rsvps.${index}.main_dish`, { required: true })}
                          >
                            <option>Chicken Fingers</option>
                            <option>Wagyu Beef</option>
                            <option>Cabbage Rolls</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1 w-64">
                          <label htmlFor="Dietary Restrictions">Dietary Restrictions</label>
                          <ComboBox name={`rsvps.${index}.dietary_restrictions`} />
                        </div>
                      </div>
                      {index !== 0 && (
                        <div className="relative  inset-y-[15px]">
                          <div className="relative inset-1 flex justify-center">
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="inline-flex items-center gap-x-1.5 active:bg-gray-100 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="-ml-1 -mr-0.5 h-5 w-5 fill-slate-500"
                                height="16"
                                width="20"
                                viewBox="0 0 640 512"
                              >
                                <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM472 200H616c13.3 0 24 10.7 24 24s-10.7 24-24 24H472c-13.3 0-24-10.7-24-24s10.7-24 24-24z" />
                              </svg>
                              Remove Guest
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {fields.length <= inviteData?.guest_count && (
                  <button
                    disabled={fields.length > inviteData?.guest_count}
                    onClick={() => {
                      if (fields.length <= inviteData?.guest_count) {
                        append({ first_name: '', last_name: '', dietary_restrictions: '', main_dish: '' });
                      }
                    }}
                    type="button"
                    className="w-32 inline-flex disabled:bg-gray-400 items-center gap-x-2 rounded-md active:bg-green-700 bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    <svg className="-ml-0.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Add Guest
                  </button>
                )}
                {submitCount > 0 && (
                  <button
                    type="button"
                    className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  ></button>
                )}
              </div>
            </div>
            <div className="flex flex-1"></div>
          </div>
        </div>
        <div className="flex w-full h-20"></div>
        <div className="fixed flex p-1 sm:p-2 justify-center bottom-0 right-0 bg-white border-t border-slate-300 drop-shadow-md w-full">
          <div className="flex w-full md:max-w-xl xl:max-w-3xl mr-0 justify-end">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!isDirty}
              className="w-32 flex justify-center disabled:bg-gray-400 items-center gap-x-2 rounded-md active:bg-green-700 bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              {/* <svg
                className="-ml-0.5 h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg> */}
              {saving}
            </button>
          </div>
        </div>
        <Toaster />
      </FormProvider>
    </form>
  );
};
