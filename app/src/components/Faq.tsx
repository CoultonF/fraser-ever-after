import { Disclosure } from '@headlessui/react';
import {CommonCard} from '@/components/CommonCard.tsx';

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer: "I don't know, but the flag is a big plus.",
  },
  {
    question: 'How do you make holy water?',
    answer: 'You boil the hell out of it.',
  },
  {
    question: 'What do you call someone with no body and no nose?',
    answer: 'Nobody knows.',
  },
  {
    question: 'What do you call a boomerang that does not come back?',
    answer: 'A stick.',
  },
  // More questions...
];

export const Faq = () => {
  return (
    <CommonCard>
        <div className="w-fit max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map(faq => (
              <Disclosure as="div" key={faq.question} className="pt-6">
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
