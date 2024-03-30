import { Disclosure } from '@headlessui/react';
import { CommonCard } from '@/components/CommonCard.tsx';

const faqs = [
  {
    question: "What is the dress code?",
    answer: "Semi-formal or formal attire is required for all attendees.",
  },
  {
    question: "Is there a parking lot?",
    answer: "Yes, there is a parking lot available.",
  },
  {
    question: "When should I arrive?",
    answer: "Please aim to arrive to the venue for 2:30pm",
  },
  {
    question: "Can I take pictures or videos?",
    answer: "Feel free to take videos of the day, but please refrain from taking pictures during the ceremony.",
  },
  {
    question: "When is the last day to RSVP?",
    answer: "Please RSVP by June 15th, 2024.",
  },
  {
    question: "Can I bring a plus one?",
    answer: "Your RSVP will have an alloted number of guests associated with it. You won't be able to submit the RSVP with more guests than you are allowed.",}
];

export const Faq = () => {
  return (
    <CommonCard>
      <div className="w-full flex flex-col  max-w-prose divide-y divide-gray-900/10">
        <h2 className="w-full text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
        <dl className="mt-10 w-full space-y-6 divide-y divide-gray-900/10">
          {faqs.map(faq => (
            <Disclosure as="div" key={faq.question} className="pt-6 w-full">
              {({ open }) => (
                <>
                  <dt>
                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                      <span className="text-base font-semibold leading-7">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        {open ? (
                          <svg
                            className=" h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                          </svg>
                        ) : (
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                          </svg>
                        )}
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </div>
    </CommonCard>
  );
};
